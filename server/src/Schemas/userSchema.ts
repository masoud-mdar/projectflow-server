import bcrypt from "bcryptjs";

import { Schema } from "mongoose";
import { IUser } from "../interfaces/User.interface";

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Adding a middleware to hash the password before save
UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    console.log(salt, " ****************")
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default UserSchema;
