const express = require("express")
require("dotenv").config();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const port = process.env.PORT;
const clientPort = process.env.CLIENT_PORT;
const app = express();
const server = createServer(app);
const connect = require("./database/index");
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: [
      `http://localhost:${clientPort}`, 
      `https://ghb5nz4p-${clientPort}.asse.devtunnels.ms`
    ],
    methods: ["GET", "POST"]
  }
});
const cors = require("cors");
const { USER_ROUTER } = require("./routers/index");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", USER_ROUTER);

app.get("/", (req, res) => {
  res.send("<h1>Lmao</h1>")
})

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