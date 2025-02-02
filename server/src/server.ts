import http from "http";
import dotenv from "dotenv";

import { setupSwagger } from "./config/swagger";
import app from "./app";
import connectDB from "./config/db";
import logger from "./utils/logger";
import { initSocket } from "./utils/socket";

process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception Error: ${err.message}`);
    process.exit(1);
});

process.on("unhandledRejection", (reason) => {
    logger.error(`Unhandled Rejection Error: ${reason}`);
});

dotenv.config();

const PORT = process.env.PORT || 5000;

setupSwagger(app);

const server = http.createServer(app);

initSocket(server);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});