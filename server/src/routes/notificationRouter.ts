import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { getNotifications, markNotificationAsRead } from "../controllers/notificationController";
import { isProjectMember } from "../middlewares/permissionsMiddleware";

const notificationRouter = express.Router();

notificationRouter.get("/", protect, isProjectMember, getNotifications);
notificationRouter.put("/:id", protect, markNotificationAsRead);

export default notificationRouter;