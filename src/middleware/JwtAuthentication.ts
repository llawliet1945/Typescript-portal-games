import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as ApiResponse from "../models/ApiResponse.js";
import * as console from "console";
dotenv.config();

export interface CustomRequest extends Request {
    userId: string | JwtPayload;
    userRoleId: string | JwtPayload;
    userRole: string | JwtPayload;
}

export default (req: Request, res: Response, next: NextFunction) => {
    const secretKey : any = process.env.JWT_SECRET;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return ApiResponse.unauthorized('Authentication failed', null, res);
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) return ApiResponse.unauthorized('Authentication failed', null, res);
        (req as CustomRequest).userId = decoded.userId;
        (req as CustomRequest).userRoleId = decoded.userRoleId;
        (req as CustomRequest).userRole = decoded.userRoleId == '1' ? 'admin' : decoded.userRoleId == '2' ? 'author' : 'user';
        next();
    });
}

export enum UserRole {
    Admin = 'admin',
    Author = 'author',
    User = 'User'
}

export const userAdmin = (res: Response, userRole: string | JwtPayload) : boolean => {
    return userRole == UserRole.Admin;
}

export const userAuthor = (res: Response, userRole : string) : any => {
    if(userRole != UserRole.Author) {
        return ApiResponse.unauthenticated(`Forbidden, User don't have access`, null, res);
    }
}

export const userUser = (res: Response, userRole : string) : any => {
    if(userRole != UserRole.User) {
        return ApiResponse.unauthenticated(`Forbidden, User don't have access`, null, res);
    }
}