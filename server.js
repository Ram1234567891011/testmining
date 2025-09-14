const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
  path: "/socket"
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.emit("job", {
    identifier: "job",
    job_id: "test-job",
    // fake data lang
    blob: "0000abcd",
    target: "ffff0"
  });

  socket.on("message", (msg) => {
    console.log("📩 Got message:", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Listening on ws://localhost:3000/socket");
});
