import express from "express";

import { registerUser, loginUser } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/profile", protect, (req, res) =>{
    // res.json(req);
})

export default userRouter;