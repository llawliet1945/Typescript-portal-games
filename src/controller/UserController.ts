import { Request, Response } from "express";
import IController from "./ControllerInterface.js";
import * as ApiResponse from "../models/ApiResponse.js";
import { User } from "../models/User.js";
import { error } from "console";
import bcrypt from 'bcrypt';
import { CustomRequest } from "src/middleware/JwtAuthentication.js";

class UserController implements IController {
    index (req: Request, res: Response): any {
        console.log((req as CustomRequest).token);
        User.findAll({ where: { userStatus: 0 } }).then( listDataUsers => {
            return ApiResponse.success(`get data success`, listDataUsers.map((user) => ({
                userUuid: user.userUuid,
                userUsername: user.userUsername,
                createdBy: user.createdBy,
                createdDate: user.createdDate,
            })), res);
        }).catch(error => {
            return ApiResponse.error(`get data failed`, error, res);
        });
    }
    findByUuid(req: Request, res: Response): any {
        User.findOne({ where: { userUuid: req.params.userUuid, userStatus: 0 } }).then( dataUser => {
            if(!dataUser) return ApiResponse.notFound(`user not found`, null, res);
            const userDTO: UserDto = {
                userUuid: dataUser.userUuid,
                userUsername: dataUser.userUsername,
                createdBy: dataUser.createdBy,
                createdDate: dataUser.createdDate,
            };
            return ApiResponse.success(`get data success`, userDTO, res);
        }).catch(error => {
            return ApiResponse.error(`get data failed`, error, res);
        });
    }
    insert(req: Request, res: Response): any {
        if(req.body.userPass != req.body.userConfirmPass) return ApiResponse.badRequest(`Password and confirmation password not match`, error, res);
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
    update(req: Request, res: Response): any {
        User.findOne({ where: { userUuid: req.params.userUuid, userStatus: 0 } }).then( dataUser => {
            if(!dataUser) return ApiResponse.notFound(`user not found`, null, res);
            User.update({userUsername: req.body.userUsername, updatedBy: dataUser.userId, updatedDate: new Date()}, { where: { userUuid: req.params.userUuid } }).then( updated => {
                return updated ? ApiResponse.success(`update data success`, null, res) : ApiResponse.error(`update data failed`, null, res);
            }).catch( error => { return ApiResponse.error(`update data failed`, error, res); });
        }).catch( error => { return ApiResponse.error(`update data failed`, error, res); });
    }
    delete(req: Request, res: Response): any {
        User.findOne({ where: { userUuid: req.params.userUuid, userStatus: 0 } }).then( dataUser => {
            if(!dataUser) return ApiResponse.notFound(`user not found`, null, res);
            User.update({ userStatus: 1 }, { where: { userUuid: req.params.userUuid } }).then( updated => {
                return updated ? ApiResponse.success(`delete data success`, null, res) : ApiResponse.error(`delete data failed`, null, res);
            }).catch( error => { return ApiResponse.error(`delete data failed`, error, res); });
        }).catch( error => { return ApiResponse.error(`delete data failed`, error, res); });
    }
}
export const getUserId = (username: string) => {
    User.findOne({ where: { userUsername: username, userStatus: 0 } }).then( dataUser => {
        return dataUser ? dataUser.userId : null;
    }).catch( error => {
        console.error(error);
        return null;
    });
}
export default new UserController();