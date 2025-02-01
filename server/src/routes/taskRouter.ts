import express from "express";

import { createTask, getTasks, deleteTask } from "../controllers/taskController";
import { protect } from "../middlewares/authMiddleware";

const taskRouter = express.Router();

taskRouter.get("/:projectId", protect, getTasks);
taskRouter.post("/", protect, createTask);
taskRouter.delete("/;id", protect, deleteTask);

export default taskRouter;