import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import User from "../models/User";
import { DecodedToken } from "../interfaces/DecodedToken.interface";
import { CustomRequest } from "../interfaces/CustomRequest.interface";

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
}