import mongoose from "mongoose";
import { IUser } from "./User.interface";

export interface IProjectMember {
    // user: mongoose.Types.ObjectId | IUser;
    user: IUser["_id"];
    role: "owner" | "admin" | "member";
};