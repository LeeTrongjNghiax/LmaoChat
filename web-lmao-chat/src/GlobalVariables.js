/*
  * Used by 
  *   index.js
  *   pages
  *     SocketContext.js
*/

import { io } from "socket.io-client";

const api_port = 3001;
const socket_port = 3000;

const api_host = " http://localhost:" + api_port
const socket = io.connect("http://localhost:" + socket_port);

const GlobalVariables = {api_host, socket}

export default GlobalVariables;