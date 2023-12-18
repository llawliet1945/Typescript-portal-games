import { Request, Response } from "express";
import * as ApiResponse from "../models/ApiResponse.js";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {UserOtp} from "../models/UserOtp.js";
import {MailTempalte} from "../models/MailTempaltes.js";
import { sendingMail } from "../config/MailService.js";
import winston from "winston";
import * as console from "console";

dotenv.config();
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({})
    ]
});

class AuthController {
    signin = (req: Request, res: Response) => {
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
    async signup (req: Request, res: Response) {
        if(req.body.userPass != req.body.userConfirmPass) return ApiResponse.badRequest(`Password and confirmation password not match`, null, res);
        const checkUser = await User.findOne({ where: { userUsername: req.body.userUsername, userStatus: 0 } });
        if(checkUser) return ApiResponse.badRequest(`username is already exists`, null, res);
        const pass : string = await bcrypt.hash(req.body.userPass, 20);
        const newUser = await User.create({
            userUsername: req.body.userUsername,
            userPass: pass,
            userEmail: req.body.userEmail,
            userRoleId: req.body.userRoleId,
            userStatus: 2
        });
        const mailTemplate = await MailTempalte.findOne({where : { mailTemplateCode: `otp-activation-account`}});
        if (!mailTemplate) return ApiResponse.notFound("Template email not found", null, res);
        const otp = await generateOtp(newUser.userId);
        const body = mailTemplate.mailTemplateMessage;
        await sendingMail({
            from: process.env.EMAIL_SENDER,
            to: newUser.userEmail,
            subject: mailTemplate.mailTemplateSubject,
            text: body?.toString().replaceAll("$otp", otp)
        });
        return ApiResponse.created(`create user success, please check your email for activation your account`, null, res);
    }

    activationUser = (req: Request, res: Response) => {
        UserOtp.findOne({ where: { userOtpCode: req.params.otp } }).then(otp => {
            if (!otp) return ApiResponse.notFound("Otp not found!", null, res);
            User.findOne({ where: { userId: otp.createdBy, userStatus: 2 } }).then(user => {
                if (!user) return ApiResponse.notFound("User not found", null, res);
                if (otp.userOtpExpiredDate !== undefined && otp.userOtpExpiredDate < new Date()) {
                    return otp.update({ userOtpStatus: 1, updatedBy: user.userId, updatedDate: new Date()}).then(disactive => 
                        User.update({ userStatus: 1, updatedBy: user.userId, updatedDate: new Date()}, { where: { userId: user.userId } })).then(() => ApiResponse.badRequest("Otp was expired", null, res)).catch(error => ApiResponse.error(`update data failed`, error, res));
                }
                return otp.update({ userOtpStatus: 2, updatedBy: user.userId, updatedDate: new Date()}).then(disactive => 
                    User.update({ userStatus: 0, updatedBy: user.userId, updatedDate: new Date()}, { where: { userId: user.userId } })).then(() => ApiResponse.success("Success activation user", null, res))
                .catch(error => ApiResponse.error(`update data failed`, error, res));
            }).catch(error => ApiResponse.error("Error finding user", error, res));
        }).catch(error => ApiResponse.error("Error finding OTP", error, res));
    }
}

const generateOtp = async (userId: number) : Promise<string>  => {
    let otp = Math.floor(100000 + Math.random() * 900000);
    let now : Date = new Date();
    await UserOtp.create( {
        userOtpCode: otp.toString(),
        userOtpExpiredDate: new Date(now.getTime() + (5 * 60000)),
        createdBy: userId
    });
    return otp.toString();
}

export default new AuthController();