import { Document } from "mongoose";

import { IUser } from "./User.interface";
import { IProject } from "./Project.interface";

export interface ITask extends Document {
    title: string;
    description: string;
    status: "To-Do" | "In Progress" | "Completed";
    project: IProject["_id"];
    assignedTo: IUser["_id"];
    createdAt: Date;
}