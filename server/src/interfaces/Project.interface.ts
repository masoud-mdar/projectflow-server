import { Document } from "mongoose";
import { IUser } from "./User.interface";

export interface IProject extends Document {
    name: string;
    description: string;
    owner: IUser["_id"];
    members: IUser["_id"][];
    createdAt: Date
}