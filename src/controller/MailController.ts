import {Request, Response} from "express";
import * as ApiResponse from "../models/ApiResponse.js";
import {MailTempalte} from "../models/MailTempaltes.js";
import {CustomRequest, userAdmin} from "../middleware/JwtAuthentication.js";
import * as console from "console";

class MailController {
    getListMailController(req: Request, res: Response) {
        MailTempalte.findAll({ where: { mailTemplateStatus: 0 } }).then(listMail => {
            const userRole = (req as CustomRequest).userRole;
            if (!userAdmin(res, userRole)) return ApiResponse.unauthenticated("Forbidden, User don't have access", null, res);
            return ApiResponse.success("get data success", listMail.map((mailTemplate) => ({
                mailTemplateUuid: mailTemplate.mailTemplateUuid,
                mailTemplateCode: mailTemplate.mailTemplateCode,
                mailTemplateSubject: mailTemplate.mailTemplateSubject,
                mailTemplateMessage: mailTemplate.mailTemplateMessage,
                createdBy: mailTemplate.createdBy,
                createdDate: mailTemplate.createdDate,
            })), res);
        }).catch(error => {
            console.error(error);
            // @ts-ignore
            return ApiResponse.error("An error occurred while fetching data", res);
        });
    }



    create(req: Request, res: Response) {
        MailTempalte.findOne( {where: {mailTemplateCode : req.body.mailTemplateCode} }).then(mailTemplate => {
            if (mailTemplate) return ApiResponse.badRequest("mail template is already exists", null, res);
            MailTempalte.create( {
                mailTemplateCode: req.body.mailTemplateCode,
                mailTemplateSubject: req.body.mailTemplateSubject,
                mailTemplateMessage: req.body.mailTemplateMessage,
                createdBy: (req as CustomRequest).userId
            }).then( mail => {
                return ApiResponse.created(`insert data success`, null, res);
            }).catch(error => {
                console.error(error);
                return ApiResponse.error(`get data failed`, error, res);
            });
        })
    }

    delete(req: Request, res: Response) {
        MailTempalte.findOne( {where: {mailTemplateCode : req.body.mailTemplateCode} }).then(mailTemplate => {
            if (!mailTemplate) return ApiResponse.notFound("mail template not found", null, res);
            MailTempalte.update({ mailTemplateStatus: 1 }, { where: { userUuid: req.params.mailTemplateCode } }).then( updated => {
                return updated ? ApiResponse.success(`delete data success`, null, res) : ApiResponse.error(`delete data failed`, null, res);
            }).catch( error => { return ApiResponse.error(`delete data failed`, error, res); });
        }).catch( error => { return ApiResponse.error(`delete data failed`, error, res); });
    }


}
export default new MailController();