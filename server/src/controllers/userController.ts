import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        const doesUserExist = await User.findOne({ email });

        if (doesUserExist) {
            res.status(400).json({ "error": "User already exists" });

            return
        }

        const user = await User.create({ name, email, password });

        user ? res.status(201).json({
            _id: user.id,
            name,
            email,
            token: generateToken(user.id)
        }) : res.status(400).json({ "error": "invalidate data" });

        return

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });

        return 
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    console.log(email, " ... ", password)

    try {
        const user = await User.findOne({ email });

        console.log(user)
        console.log(await user?.matchPassword(password))

        if (user && await user.matchPassword(password)) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email,
                token: generateToken(user.id)
            });

            return
        }

        res.status(401).json({ "error": "bad credentials" });

        return

    } catch (error) {
        res.status(500).json({ "error": "internal server error" });

        return
    }
};