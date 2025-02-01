import { Document } from "mongoose";
import { IUser } from "./User.interface";
import { IProjectMember } from "./Member.interface";

export interface IProject extends Document {
    name: string;
    description: string;
    owner: IUser["_id"];
    members: IProjectMember[];
    createdAt: Date
}