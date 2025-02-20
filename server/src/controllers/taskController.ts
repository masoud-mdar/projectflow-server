import { Response } from "express";

import Task from "../models/Task";
import Project from "../models/Project";
import { CustomRequest } from "../interfaces/CustomRequest.interface";
import { createNotification } from "../utils/notification";
import { IProjectMember } from "../interfaces/Member.interface";

export const createTask = async (req: CustomRequest, res: Response) => {
    const { title, description, status, project } = req.body;
    try {
        const potentialExistingProject = await Project.findById(project).populate<{ members: IProjectMember[] }>("members.user");

        if (!potentialExistingProject) {
            res.status(404).json({ "error": "project not found" });
        }

        const task = new Task({
            title,
            description,
            status,
            project
        });

        await task.save();

        // IMPORTANT : Should debug this !
        
        // if (potentialExistingProject?.members) {
        //     for (const member of potentialExistingProject?.members) {
        //         createNotification(member.user._id, project, `new task created : ${title}`);
        //     }
        // }

        // sendNotification(project, `new task added : ${title}`);

        res.status(201).json({ "message": "task created successfully" });

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
};

export const getTasks = async (req: CustomRequest, res: Response) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId }).populate("assignedTo", "name email");
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
};

export const deleteTask = async (req: CustomRequest, res: Response) => {
    try {
        const task = Task.findById(req.params.id);
        if (!task) {
            res.status(404).json({ "error": "task not found" });
        }

        await Task.deleteOne({ id: req.params.id });

        res.status(200).json({ "message": "task deleted successfully" });

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });
    }
};