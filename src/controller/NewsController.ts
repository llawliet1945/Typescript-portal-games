import { success, created } from "./../models/ApiResponse";
import { Response } from "express";

export const getAllNews = (req: Request, res : Response) => {
    return success('get data success', req.body, res);
}

export const getNewsById = (req: Request, res : Response) : any => {
    return success('get data success', req.body, res);
}

export const addNewNews = (req: Request, res : Response): any => {
    return created('get data success', req.body, res);
}

export const updateNews = (req: Request, res : Response): any => {
    return success('update data success', req.body, res);
}

export const deleteNews = (req: Request, res : Response): any => {
    return success('delete data success', req.body, res);
}