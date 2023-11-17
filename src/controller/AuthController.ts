import { Request, Response } from "express";
import * as ApiResponse from "../models/ApiResponse.js";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {UserOtp} from "../models/UserOtp.js";
import {MailTempalte} from "../models/MailTempaltes.js";
import { sendingMail } from "../config/MailService.js";

dotenv.config();

class AuthController {
    signin (req: Request, res: Response) {
        const secret: any = process.env.JWT_SECRET;
        User.findOne({ where: { userUsername: req.body.userUsername, userStatus: 0 } }).then( dataUser => {
            console.log(dataUser);
            if(!dataUser) return ApiResponse.notFound(`user not found`, null, res);
            bcrypt.compare(req.body.userPass, dataUser.userPass).then(match => {
                console.log(match);
                return match ? ApiResponse.success(`get data success`, jwt.sign({ userId: dataUser.userId }, secret, { expiresIn: '24h' }), res) : ApiResponse.unauthorized(`inavlid password`, null, res);
            }).catch(error => {
                console.error(error);
                return ApiResponse.error(`login failed`, error, res);
            });
        }).catch(error => {
            console.error(error);
            return ApiResponse.error(`login failed`, error, res);
        });
    }
    signup(req: Request, res: Response): any {
        if(req.body.userPass != req.body.userConfirmPass) return ApiResponse.badRequest(`Password and confirmation password not match`, null, res);
        User.findOne({ where: { userUsername: req.body.userUsername, userStatus: 0 } }).then( data => {
            if(data) return ApiResponse.badRequest(`username is already exists`, null, res);
        })
        bcrypt.hash(req.body.userPass, 20).then(pass => {
            req.body.userPass = pass;
            User.create({
                userUsername: req.body.userUsername,
                userPass: req.body.userPass,
                userEmail: req.body.userEmail,
                userRoleId: req.body.userRoleId,
                userStatus: 1
            }).then( users => {
                MailTempalte.findOne({where : { mailTemplateCode: `otp-activation-account`}}).then( async send => {
                    if (!send) return ApiResponse.notFound("Template email not found", null, res);
                    const otp: string = await generateOtp(users.userId);
                    console.log(otp);
                    // @ts-ignore
                    const body = send.mailTemplateMessage?.replaceAll("$otp", otp);
                    sendingMail({
                        from: process.env.EMAIL_SENDER,
                        to: users.userEmail,
                        subject: send.mailTemplateSubject,
                        text: body
                    }).then(() => {
                        return ApiResponse.created(`create user success, please check your email for activation your account`, null, res);
                    }).catch((error: any) => {
                        console.error(error);
                        return ApiResponse.error(`error receive email`, error, res);
                    });
                }).catch(error => {
                    console.error(error);
                    return ApiResponse.error(`error send email`, error, res);
                });
            }).catch(error => {
                console.error(error);
                return ApiResponse.error(`error insert new user`, error, res);
            });
        }).catch(error => {
            console.error(error);
            return ApiResponse.error(`get data failed`, error, res);
        });
    }

    activationUser(req:Request, res: Response) {
        UserOtp.findOne( { where : { usetOtpCode : req.params.otp } }).then( otp => {
            if (!otp) return ApiResponse.notFound("Otp not found!", null, res);
            // @ts-ignore
            if (otp.userOtpExpiredDate < new Date()) return ApiResponse.badRequest("otp was expired", null, res);
            otp.update({userOtpStatus: 1}).then( disactive => {
                User.update({ userStatus: 0 }, { where: { userId: otp.createdBy } }).then( updated => {
                    return ApiResponse.success("success activation user", null, res);
                }).catch( error => { return ApiResponse.error(`delete data failed`, error, res); });
            })
        });
    }
}

// @ts-ignore
const generateOtp = async (userId: number) : string  => {
    var otp : string = getOtp().toString();
    const userOtp = await UserOtp.findOne({ where : { userOtpCode : otp, userOtpStatus: 0}});
    otp = userOtp ? getOtp().toString() : otp;
    var now : Date = new Date();
    await UserOtp.create( {
        userOtpCode: otp.toString(),
        userOtpExpiredDate: new Date(now.getTime() + (5 * 60000)),
        createdBy: userId
    });
    return otp;
}

const getOtp = () : number  => {
    return Math.floor(100000 + Math.random() * 900000);
}
export default new AuthController();