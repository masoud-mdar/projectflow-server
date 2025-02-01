import { Response } from "express";

import Project from "../models/Project";
import { CustomRequest } from "../interfaces/CustomRequest.interface";
import { IProject } from "../interfaces/Project.interface";
import { IProjectMember } from "../interfaces/Member.interface";
import User from "../models/User";

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
};

export const addMember = async (req: CustomRequest, res: Response) => {
    const { userId, role } = req.body;
    const { id } = req.params; // project id

    try {
        const project = await Project.findById(id);

        if (!project) {
            res.status(404).json({ "error": "project not found" });
        }

        const requestingUser = project?.members.find((member: IProjectMember) => member.user === req.user?._id);

        if (!requestingUser || (requestingUser.role !== "owner" && requestingUser.role !== "admin")) {
            res.status(403).json({ "error": "unauthorized user" });
        }

        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ "error": "user not found" });
        }

        if (project?.members.some((member: IProjectMember) => member.user === userId)) {
            res.status(400).json({ "error": "user is already a project member" });
        }

        project?.members.push({ user: userId, role });

        await project?.save();

        res.status(201).json({ "message": "user added successfully" });

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
};

export const removeMember = async (req: CustomRequest, res: Response) => {
    const { userId } = req.body;
    const { id } = req.params; // project id

    try {
        const project = await Project.findById(id);

        if (!project) {
            res.status(404).json({ "error": "project not found" });
        }

        const requestingUser = project?.members.find((member: IProjectMember) => member.user === req.user?._id);

        if (!requestingUser || requestingUser.role !== "owner") {
            res.status(403).json({ "error": "unauthorized user" });
        }

        if (!project?.members.some((member: IProjectMember) => member.user === userId)) {
            res.status(400).json({ "error": "user is not a project member" });
        }

        if (project) {
            project.members = project?.members.filter((member: IProjectMember) => member.user !== userId);

            await project?.save();

            res.status(200).json({ "message": "user removed successfully from the project", project });
        }

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
};