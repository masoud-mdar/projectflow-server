import { Document } from "mongoose";
import { IUser } from "./User.interface";
import { IProject } from "./Project.interface";

export interface INotification extends Document {
    user: IUser["_id"]; // the notification's recipient
    project: IProject["_id"];
    message: string;
    isRead: boolean;
    createdAt: Date;
};