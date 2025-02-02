import express from "express";

import { createTask, getTasks, deleteTask } from "../controllers/taskController";
import { protect } from "../middlewares/authMiddleware";
import { isProjectAdmin, isProjectMember } from "../middlewares/permissionsMiddleware";

const taskRouter = express.Router();

taskRouter.get("/:projectId", protect, isProjectMember, getTasks);
taskRouter.post("/", protect, isProjectAdmin, createTask);
taskRouter.delete("/;id", protect, isProjectAdmin, deleteTask);

export default taskRouter;