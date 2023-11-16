import { Request, Response } from "express";
import * as ApiResponse from "../models/ApiResponse.js";
import { User } from "../models/User.js";

class UserController {
    index (req: Request, res: Response): any {
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
export default new UserController();