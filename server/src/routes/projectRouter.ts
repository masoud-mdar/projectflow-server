import express from "express";

import { createProject, getAllProjects, deleteProject } from "../controllers/projectController";
import { protect } from "../middlewares/authMiddleware";

const projectRouter = express.Router();

projectRouter.get("/", protect, getAllProjects);
projectRouter.post("/", protect, createProject);
projectRouter.delete("/:id", protect, deleteProject);

export default projectRouter;