import http from "http";
import { Server } from "socket.io";

import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";
import { initSocket } from "./utils/socket";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initSocket(server);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});