import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as ApiResponse from "../models/ApiResponse.js";
dotenv.config();

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export default (req: Request, res: Response, next: NextFunction) => {
    const secretKey : any = process.env.JWT_SECRET;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return ApiResponse.unauthorized('Authentication failed', null, res);
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) return ApiResponse.unauthorized('Authentication failed', null, res);
        (req as CustomRequest).token = decoded.userId;
        next();
    });
}