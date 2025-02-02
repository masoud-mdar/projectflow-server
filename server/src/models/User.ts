import { model } from "mongoose";

import { IUser } from "../interfaces/User.interface";
import UserSchema from "../schemas/userSchema";

const User = model<IUser>("User", UserSchema);

export default User;