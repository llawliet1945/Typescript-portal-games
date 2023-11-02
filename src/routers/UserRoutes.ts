import { Router, Request, Response } from "express";
import IRouter from './RouteInterface';
import UserController from "../controller/UserController.js";
import { success } from './../models/ApiResponse.js';

class UserRoutes implements IRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    public routes(): void {
        this.router.get('/', UserController.index);
        
        this.router.post('/', UserController.findByUuid);
    }
}
export default new UserRoutes().router;