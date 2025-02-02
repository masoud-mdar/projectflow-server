import { Server } from "socket.io";
import http from "http";

let io: Server;

export const initSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // IMPORTANT : To change this !
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`socket new connection : ${socket.id}`);

        socket.on("joinProject", (projectId) => {
            socket.join(projectId);

            console.log(`user joined project : ${projectId}`);
        });

        socket.on("disconnect", () => {
            console.log(`disconnecting : ${socket.id}`);
        });
    });

    return io
};

export const sendNotification = (userId: string, message: string) => {
    if (io) {
        io.to(userId).emit("notification", message);
    }
}