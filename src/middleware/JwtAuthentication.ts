import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as ApiResponse from "../models/ApiResponse.js";
dotenv.config();

export default (req: Request, res: Response, next: any) => {
    const secretKey : any = process.env.APP_PORT;
    const token = req.header('Authorization');
    if (!token) return ApiResponse.unauthorized('Authentication failed', null, res);
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) return ApiResponse.unauthorized('Authentication failed', null, res);
        console.log(decoded);
        next();
    });
}