import { NextFunction, Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest.interface";
import Project from "../models/Project";


export const isProjectMember = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);

        if (!project) {
            res.status(404).json({ "error": "project not found" });
        }

        const isMember = project?.members.some((member) => member.user === req.user?._id);

        if (!isMember) {
            res.status(403).json({ "error": "unauthorized" });
        }

        next();

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
};

export const isProjectAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);

        if (!project) {
            res.status(404).json({ "error": "project not found" });
        }

        const userRole = project?.members.find((member) => member.user === req.user?._id)?.role;

        if (!userRole || (userRole !== "admin" && userRole !== "owner")) {
            res.status(403).json({ "error": "unauthorized" });
        }

        next();

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
};

export const isProjectOwner = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);

        if (!project) {
            res.status(404).json({ "error": "project not found" });
        }

        if (project?.owner !== req.user?._id) {
            res.status(403).json({ "error": "unauthorized" });
        }

        next();

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
};