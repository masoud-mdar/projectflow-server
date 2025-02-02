import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

import User from "../models/User";
import Project from "../models/Project";
import { DecodedToken } from "../interfaces/DecodedToken.interface";
import { CustomRequest } from "../interfaces/CustomRequest.interface";
import { IProjectMember } from "../interfaces/Member.interface";

export const protect = async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401).json({ "error": "not authorized" });
        }
    } else {
        res.status(401).json({ "error": "not authorized" });
    }
};

// export const isProjectAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const { id } = req.params; // project id
//     try {
//         const project = await Project.findById(id);

//         if (!project) {
//             res.status(404).json({ "error": "project not found" });
//         }

//         const userRole = project?.members.find((member: IProjectMember) => member.user === req.user?._id)?.role;

//         if (!userRole || (userRole !== "admin" && userRole !== "owner")) {
//             res.status(403).json({ "error": "not authorized" });
//         }

//         next();

//     } catch (error) {
//         res.status(500).json({ "error": "internal server error" });
//     }
// };