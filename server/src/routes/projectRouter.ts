import express from "express";

import { createProject, getAllProjects, deleteProject, addMember, removeMember } from "../controllers/projectController";
import { protect } from "../middlewares/authMiddleware";
import { isProjectOwner, isProjectAdmin, isProjectMember } from "../middlewares/permissionsMiddleware";

const projectRouter = express.Router();

projectRouter.get("/", protect, isProjectMember, getAllProjects);
projectRouter.post("/", protect, createProject);
projectRouter.post("/:id/members", protect, isProjectAdmin, addMember);
projectRouter.delete("/:id", protect, isProjectOwner, deleteProject);
projectRouter.delete("/:id/members", protect, isProjectAdmin, removeMember);

export default projectRouter;