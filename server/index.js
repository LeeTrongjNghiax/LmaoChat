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
const { USER_ROUTER, MESSAGE_ROUTER } = require("./routers/index");
const { USER_REPOSITORY, MESSAGE_REPOSITORY } = require("./repositories");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", USER_ROUTER);
app.use("/api/messages", MESSAGE_ROUTER);

app.get("/", (req, res) => {
  res.send("<h1>Lmao</h1>")
});

let users = [];

io.on("connection", socket => {
  console.log(`Socket: ${socket.id} connected`);

  socket.on("User Join", async ( phoneNumber ) => {
    console.log(`Socket: ${phoneNumber} had login`);

    const USER = await USER_REPOSITORY.getUser({ phoneNumber });
    users.push(USER);

    socket.emit(`Server: ${phoneNumber} get updated`);

    socket.on(`${phoneNumber} get updated`, async phoneNumbers => {
      console.log(`Socket: ${phoneNumber} get updated`);

      for (let i = 0; i < phoneNumbers.length; i++)
        io.emit(`Server: ${phoneNumbers[i]} get updated`);
    });
  });

  socket.on(`Send message`, ({roomId, userSend, content}) => {
    console.log(`Socket: send message`);
    io.emit(`Get message from ${roomId}`, {roomId, userSend, content});
  });

  socket.on("User Leave", async (phoneNumber) => {
    const REMOVED_INDEX = users.map(user => user.phoneNumber).indexOf(phoneNumber);
    ~REMOVED_INDEX && users.splice(REMOVED_INDEX, 1);

    console.log(`Socket: ${phoneNumber} had leave`);
  });

  socket.on("disconnect", () => {
    console.log(`Socket: ${socket.id} disconnected`);
  });
});

server.listen(port, async () => {
  await connect();
  console.log(`Server: server running on port ${port}`);
});