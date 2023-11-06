import { Router } from "express";
import IRouter from './RouteInterface';
import UserController from "../controller/UserController.js";

class UserRoutes implements IRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    public routes(): void {
        this.router.get('/', UserController.index);
        this.router.get('/detail/:userUuid', UserController.findByUuid);
        this.router.post('/register', UserController.insert);
        this.router.put('/update/:userUuid', UserController.update);
        this.router.delete('/delete/:userUuid', UserController.delete);
    }
}
export default new UserRoutes().router;