import { Response } from "express";

export default interface httpInterface {
  res: Response;
  statusCode: number;
  message: string;
  data: any;
}

export interface IDecodedToken {
  userId: string;
}
