import { Router } from "express";
import IRouter from './RouteInterface';
import MailController from "../controller/MailController.js";

class MailTemplateRoutes implements IRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    public routes(): void {
        this.router.get('/', MailController.getListMailController);
        this.router.post('/', MailController.create);
        this.router.delete('/delete/:mailTemplateCode', MailController.delete);
    }
}
export default new MailTemplateRoutes().router;