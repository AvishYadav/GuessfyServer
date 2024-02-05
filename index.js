import { Server } from "socket.io";
import { createServer } from "http";
import { Socket } from "dgram";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("welcome", "welcome to channel");

  socket.on("msg", (data) => {
    console.log("msg from client", data);
  });

  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("recieve-message", message);
    } else {
      socket.to(room).emit("recieve-message", message);
    }
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`joined-room ${room}`);
    socket.to(room).emit("player-joined", "Someone Joined");
  });

  socket.on("selected-char", (selectedChar, room) => {
    socket.to(room).emit("char-select", selectedChar);
  });

  socket.on("toggle-start", (room) => {
    socket.to(room).emit("start-true");
  });
});

httpServer.listen(3001, () => {
  console.log("listening on port 3001");
});
