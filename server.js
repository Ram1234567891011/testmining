const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
 // path: "/socket"
});

// Default route para makitang buhay ang server
app.get("/", (req, res) => {
  res.send("✅ Mining WebSocket server is running!");
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  // test job send
  socket.emit("job", {
    identifier: "job",
    job_id: "test-job",
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

// Render gives us PORT (process.env.PORT)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
