import { model } from "mongoose";

import { INotification } from "../interfaces/Notification.interface";
import { NotificationSchema } from "../schemas/notificationSchema";

const Notification = model<INotification>("Notification", NotificationSchema);

export default Notification;