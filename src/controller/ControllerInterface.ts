import { Response, Request } from "express";

interface IController {
    index(req: Request, res: Response): Response;
    findByUuid(req: Request, res: Response): Response;
    insert(req: Request, res: Response): Response;
    update(req: Request, res: Response): Response;
    delete(req: Request, res: Response): Response;
}

export default IController;