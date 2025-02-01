import { IUser } from "./User.interface";

export interface IProjectMember {
    user: IUser["_id"];
    role: "owner" | "admin" | "member";
};