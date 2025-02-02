import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { getNotifications, markNotificationAsRead } from "../controllers/notificationController";

const notificationRouter = express.Router();

notificationRouter.get("/", protect, getNotifications);
notificationRouter.put("/:id", protect, markNotificationAsRead);

export default notificationRouter;