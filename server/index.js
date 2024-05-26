const express = require("express")
require("dotenv").config();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const port = process.env.PORT;
const app = express();
const server = createServer(app);
const connect = require("./database/index");
const io = new Server(server, {
  connectionStateRecovery: {},
});
const cors = require("cors");
const { USER_ROUTER } = require("./routers/index");

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", USER_ROUTER);

io.on("connection", socket => {
  console.log("Socket: A user connected");

  socket.on("disconnect", () => {
    console.log("Socket: A user disconnected");
  });
});

server.listen(port, async () => {
  await connect();
  console.log("Server: server running on port " + port);
});