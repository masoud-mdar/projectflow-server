import { Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest.interface";
import Notification from "../models/Notification";


export const getNotifications = async (req: CustomRequest, res: Response) => {
    try {
        const notifications = await Notification.find({ user: req.user?._id }).sort({ createdAt: -1 });

        res.status(200).json(notifications);

    } catch (error) {
        res.status(500).json({ "error": "inernal server error" });
    }
};

export const markNotificationAsRead = async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    try {
        const notification = await Notification.findById(id);

        if (!notification) {
            res.status(404).json({ "error": "notification not found" });
        }

        if (notification?.user !== req.user?._id) {
            res.status(403).json({ "error": "unauthorized" });
        }

        if (notification) {
            notification.isRead = true;

            await notification.save();
        }

        res.status(200).json({ "message": "notification marked as read" });

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
}