import mongoose, { Schema } from "mongoose";
import { IProject } from "../interfaces/Project.interface";

const ProjectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
        },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    {
        timestamps: true
    }
);

export default ProjectSchema;