import axios from "axios";
import { GlobalVariables } from "../GlobalVariables";

const status = GlobalVariables.status;
const api_host = GlobalVariables.api_host;
const domain = `messages`;

const sendErrorMessage = (message: string) => {
  return {
    status: status.INTERNAL_SERVER_ERROR,
    message: `Server Error: ${message}`
  }
}

const getError = (error: unknown) => {
  if (typeof error === `string`)
    return error.toUpperCase();
  else if (error instanceof Error)
    return error.message;
}

const getMessage = async (content: string) => {
  try {
    const response = await axios.get(
      `${api_host}/api/${domain}/${content}`, 
    );

    return {
      status: response.status, 
      data: response.data
    }
  } catch (error) {
    const result: string = getError(error)!;

    console.error(`Message Service: Get message error: ${result}`);

    return sendErrorMessage(result);
  }
};

const getMessagesFromRoom = async (roomId?: string) => {
  try {
    const response = await axios.post(
      `${api_host}/api/${domain}/getMessagesFromRoom`, {
        roomId
      }
    );

    return {
      status: response.status, 
      data: response.data
    }
  } catch (error) {
    const result: string = getError(error)!;

    console.error(`Message Service: Get messages error: ${result}`);

    return sendErrorMessage(result);
  }
};

const addMessage = async (
  roomId: string, userSend: string, content: string
) => {
  try {
    const data = {
      roomId,
      userSend,
      content,
    }

    const response = await axios.post(
      `${api_host}/api/${domain}`, 
      data
    );

    return {
      status: response.status, 
      data: response.data
    }
  } catch (error) {
    const result: string = getError(error)!;

    console.error(`Message Service: Add message error: ${result}`);

    return sendErrorMessage(result);
  }
};

const MessageServices = {
  getMessage, 
  getMessagesFromRoom, 
  addMessage, 
}

export default MessageServices;