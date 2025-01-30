import { Request } from "express";
import { IUser } from "./User.interface";

export interface CustomRequest extends Request {
  user?: IUser;
}