import { Request, Response } from "express";
import * as ApiResponse from "../models/ApiResponse.js";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
            User.create(req.body).then( users => {
                return ApiResponse.created(`insert data success`, null, res);
            }).catch(error => {
                console.error(error);
                return ApiResponse.error(`get data failed`, error, res);
            });
        }).catch(error => {
            console.error(error);
            return ApiResponse.error(`get data failed`, error, res);
        });
    }
}
export default new AuthController();