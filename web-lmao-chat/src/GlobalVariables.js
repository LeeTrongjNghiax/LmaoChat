import { io } from "socket.io-client";

import tailwind from "./tailwind.config.js";
import { useTheme } from './contexts/ThemeProvider';

const api_port = 3000;

// const api_host = "https://jawfish-good-strongly.ngrok-free.app";
const api_host = "http://localhost:" + api_port;
// const api_host = `https://ghb5nz4p-${api_port}.asse.devtunnels.ms`;

const socket = io(api_host);

export default function ExportColor() {
  const { theme } = useTheme();
  
  return {
    backgroundColor: tailwind.theme.extend.backgroundColor[`color-primary-${theme}`], 
    borderColor: tailwind.theme.extend.borderColor[`color-primary-${theme}`], 
    buttonColor: tailwind.theme.extend.buttonColor[`color-primary-${theme}`], 
    chatBackgroundColor: tailwind.theme.extend.chatBackgroundColor[`color-primary-${theme}`], 
    iconColor: tailwind.theme.extend.iconColor[`color-primary-${theme}`], 
    linkColor: tailwind.theme.extend.linkColor[`color-primary-${theme}`], 
    textColor: tailwind.theme.extend.textColor[`color-primary-${theme}`], 
  }
}

export const GlobalVariables = {api_host, socket}