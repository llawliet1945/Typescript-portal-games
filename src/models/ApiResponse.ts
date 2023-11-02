import { Response } from "express";
class ResponseEntity {
  constructor(public status: number, public data: any, public message: string) {}

  toJSON(): object {
    return {
      status: this.status,
      data: this.data,
      message: this.message,
    };
  }
}

export const success = (message: string, data: any, res: Response) : any => {
  const response = new ResponseEntity(200, data, message);
  return res.status(response.status).json(response);
}

export const created = (message: string, data: any, res: Response) : any => {
  const response = new ResponseEntity(201, data, message);
  return res.status(response.status).json(response);
}

export const badRequest = (message: string, data: any, res: Response) : any => {
  const response = new ResponseEntity(400, null, message);
  return res.status(response.status).json(response);
}

export const notFound = (message: string, data: any, res: Response) : any => {
  const response = new ResponseEntity(404, null, message);
  return res.status(response.status).json(response);
}

export const unauthorized = (message: string, data: any, res: Response) : any => {
  const response = new ResponseEntity(401, null, message);
  return res.status(response.status).json(response);
}

export const unauthenticated = (message: string, data: any, res: Response) : any => {
  const response = new ResponseEntity(403, null, message);
  return res.status(response.status).json(response);
}

export const error = (message: string, data: any, res: Response) : any => {
  const response = new ResponseEntity(500, null, message);
  return res.status(response.status).json(response);
}