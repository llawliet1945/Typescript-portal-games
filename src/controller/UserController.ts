import { Request, Response } from "express";
import IController from "./ControllerInterface.js";
import * as ApiResponse from "../models/ApiResponse.js";

class UserController implements IController {
    index(req: Request, res: Response): any {
        const data: any = {
            username : 'myusufalpian',
            firstname: 'Muhammad Yusuf',
            lastname: 'Alpian'
        }
        ApiResponse.error(`error fetch data`, data, res);
    }
    findAll(req: Request, res: Response): any {
        throw new Error("Method not implemented.");
    }
    findByUuid(req: Request, res: Response): any {
        const data: any = {
            username : 'myusufalpian',
            firstname: 'Muhammad Yusuf',
            lastname: 'Alpian'
        }
        ApiResponse.success(`get all data success`, data, res);
    }
    insert(req: Request, res: Response): any {
        throw new Error("Method not implemented.");
    }
    update(req: Request, res: Response): any {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): any {
        throw new Error("Method not implemented.");
    }
    
}

export default new UserController();