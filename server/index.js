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
const { USER_REPOSITORY } = require("./repositories");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", USER_ROUTER);

app.get("/", (req, res) => {
  res.send("<h1>Lmao</h1>")
});

let users = [];

io.on("connection", socket => {
  console.log("Socket: A user connected");

  socket.on("User Join", async ({ data }) => {
    console.log(`Socket: ${data} had login`);

    const USER = await USER_REPOSITORY.getUser({ phoneNumber: data });
    users.push(USER);
  });

  socket.on("User Leave", async ({ data }) => {
    const REMOVED_INDEX = users.map(user => user.phoneNumber).indexOf(data);
    ~REMOVED_INDEX && users.splice(REMOVED_INDEX, 1);

    console.log(`Socket: ${data} had leave`);
  });

  socket.on("disconnect", () => {
    console.log("Socket: A user disconnected");
  });
});

server.listen(port, async () => {
  await connect();
  console.log("Server: server running on port " + port);
});