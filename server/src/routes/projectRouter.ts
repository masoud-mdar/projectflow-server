import express from "express";

import { createProject, getAllProjects, deleteProject, addMember, removeMember } from "../controllers/projectController";
import { isProjectAdmin, protect } from "../middlewares/authMiddleware";

const projectRouter = express.Router();

projectRouter.get("/", protect, getAllProjects);
projectRouter.post("/", protect, createProject);
projectRouter.post("/:id/members", protect, addMember);
projectRouter.delete("/:id", protect, deleteProject);
projectRouter.delete("/:id/members", protect, isProjectAdmin, removeMember);

export default projectRouter;