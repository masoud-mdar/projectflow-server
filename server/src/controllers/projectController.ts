import { Request, Response } from "express";

import Project from "../models/Project";
import { CustomRequest } from "../interfaces/CustomRequest.interface";

export const createProject = async (req: CustomRequest, res: Response) => {
    const { name, description } = req.body;

    try {
        const project = new Project({
            name,
            description,
            owner: req.user?._id,
            members: [req.user?._id]
        });

        await project.save();

        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
};

export const getAllProjects = async (req: CustomRequest, res: Response) => {

    try {
        const projects = Project.find({ owner: req.user?._id }).populate("members", "name email");
        res.status(200).json(projects);

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
};

export const deleteProject = async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    try {
        const project = await Project.findById({ id });

        if (!project) {
            res.status(404).json({ "error": "project not found" });
        }

        // if (project?.owner.toString() !== req.user?._id.toString()) {
        //     return res.status(403).json({ "error": "user not authorized" });
        // }

        await Project.deleteOne({ id });
        res.json({ "message": "project deleted" });

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
}