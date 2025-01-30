import { model } from "mongoose";

import UserSchema from "../Schemas/User.schema";
import { IUser } from "../interfaces/User.interface";

const User = model<IUser>("User", UserSchema);

export default User;