import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import userRouter from "./routes/userRouter";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("Hello you !");
});

export default app;