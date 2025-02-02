import express from "express";

import { registerUser, loginUser } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/profile", protect, (req, res) =>{
    // IMPORTANT : must complete this part !
    res.json({"message": "ok !"});
})

export default userRouter;