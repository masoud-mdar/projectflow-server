import { model } from "mongoose";

import { IProject } from "../interfaces/Project.interface";
import ProjectSchema from "../schemas/projectSchema";

const Project = model<IProject>("Project", ProjectSchema);

export default Project;