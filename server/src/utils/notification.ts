import Notification from "../models/Notification"
import { sendNotification } from "./socket";


export const createNotification = async (userId: string, projectId: string, message: string) => {
    try {
        const notification = new Notification({
            user: userId,
            project: projectId,
            message
        });

        await notification.save();

        sendNotification(userId, message);

    } catch (error) {
        console.error("error while creating notification : ", error);
    }
}