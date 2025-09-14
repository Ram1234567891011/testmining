// server.js
/*
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

// Gumawa ng WebSocket server sa path `/socket`
const wss = new WebSocket.Server({ server, path: "/socket" });

// Default route para makita kung buhay ang server
app.get("/", (req, res) => {
  res.send("✅ Mining WebSocket server is running!");
});

// Kapag may client na kumonek
wss.on("connection", (ws) => {
  console.log("✅ Client connected");

  // Send test job sa client
  ws.send(
    JSON.stringify({
      identifier: "job",
      job_id: "test-job",
      blob: "0000abcd",
      target: "ffff0",
    })
  );

  // Kung may message galing sa client
  ws.on("message", (message) => {
    console.log("📩 Got message:", message.toString());
  });

  // Kapag na-disconnect
  ws.on("close", () => {
    console.log("❌ Disconnected");
  });
});

// Render will assign PORT automatically
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
*/

const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ noServer: true });

// Default route
app.get("/", (req, res) => {
  res.send("✅ Mining WebSocket server is running!");
});

// Handle upgrade requests (important sa Render)
server.on("upgrade", (req, socket, head) => {
  if (req.url === "/socket") {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});

// Client connection
wss.on("connection", (ws) => {
  console.log("✅ Client connected");

  ws.send(
    JSON.stringify({
      identifier: "job",
      job_id: "test-job",
      blob: "0000abcd",
      target: "ffff0",
    })
  );

  ws.on("message", (msg) => {
    console.log("📩 Got message:", msg.toString());
  });

  ws.on("close", () => {
    console.log("❌ Disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
