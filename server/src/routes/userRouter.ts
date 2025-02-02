import express from "express";

import { registerUser, loginUser } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/profile", protect, (req, res) => {
    // IMPORTANT : must complete this part !
    res.json({ "message": "ok !" });
});

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: users management API
*/

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Error, existing user
*/

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connecting a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connection successful with a token
 *       401:
 *         description: Bad credentials
*/

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get the logged in user's information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned
 *       401:
 *         description: Unauthorized
*/

export default userRouter;