import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();

const io =new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

io.on('connection', (socket) => {
    socket.emit("welcome", "welcome to channel");

    socket.on("msg", (data) => {
        console.log("msg from client", data);
    });
});

httpServer.listen(3001, () => {
    console.log("listening on port 3001");
});