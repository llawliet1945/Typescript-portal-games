import { Router, Request, Response } from "express";
import IRouter from './RouteInterface';
import AuthController from "../controller/AuthController.js";

class AuthRoutes implements IRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    public routes(): void {
        this.router.post('/signin', AuthController.signin);
    }
}
export default new AuthRoutes().router;