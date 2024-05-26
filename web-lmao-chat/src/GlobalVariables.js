/*
  * Used by 
  *   index.js
  *   pages
  *     SocketContext.js
*/

import { io } from "socket.io-client";

const port = 3000;

const api_host = " http://localhost:" + port
const socket = io.connect("http://localhost:" + port);

const GlobalVariables = {api_host, socket}

export default GlobalVariables;