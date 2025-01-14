import { Router } from "express";
import IRouter from './RouteInterface.js';
import AuthController from "../controller/AuthController.js";

class AuthRoutes implements IRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    public routes () {
        this.router.post('/signin', AuthController.signin);
        this.router.post('/signup', AuthController.signup);
        this.router.get('/activation/:otp', AuthController.activationUser);
    }
}
export default new AuthRoutes().router;