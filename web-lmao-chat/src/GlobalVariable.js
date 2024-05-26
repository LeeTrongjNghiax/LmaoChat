import { io } from "socket.io-client";

const port = 3000;

const api_host = " http://localhost:" + port
const socket = io.connect("http://localhost:" + port);

const GlobalVariable = {api_host, socket}

export default GlobalVariable;