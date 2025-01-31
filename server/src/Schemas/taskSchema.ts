import mongoose, { Schema } from "mongoose";
import { ITask } from "../interfaces/Task.interface";

const TaskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ["To-Do", "In Progress", "Completed"],
            default: "To-Do"
        },
        project: {
            type: mongoose.Schema.ObjectId, ref: "Project", required: true
        },
        assignedTo: {
            type: mongoose.Schema.ObjectId, ref: "User"
        }
    },
    { timestamps: true }
);

export default TaskSchema;