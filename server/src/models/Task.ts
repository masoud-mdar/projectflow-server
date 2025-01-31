import { model } from "mongoose";

import { ITask } from "../interfaces/Task.interface";
import TaskSchema from "../schemas/taskSchema";

const Task = model<ITask>("Task", TaskSchema);

export default Task;