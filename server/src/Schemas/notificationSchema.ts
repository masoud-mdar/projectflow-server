import mongoose, { Schema } from "mongoose";
import { INotification } from "../interfaces/Notification.interface";

export const NotificationSchema = new Schema<INotification>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
        },
        project: {
            type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true
        },
        message: {
            type: String, required: true
        },
        isRead: {
            type: Boolean, default: false
        }
    },
    { timestamps: true }
);