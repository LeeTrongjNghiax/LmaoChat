const { MESSAGE_REPOSITORY } = require("../repositories");

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_ACCEPTED = 202;
const STATUS_NO_CONTENT = 204;
const STATUS_CONFLICT = 409;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const sendJsonResponse = (res, status, message, data) => 
  res.status( status ).json({
    message: message,
    data: data
  });

const getMessage = async (req, res) => {
  try {
    const content = req.params.content;
      
    const FOUND_MESSAGE = await MESSAGE_REPOSITORY.getMessage(content);

    let status = STATUS_OK;
    let message = "Get message sucessfully!";

    if (!FOUND_MESSAGE) {
      status = STATUS_NO_CONTENT;
      message = "Get message empty!";
    }

    sendJsonResponse(res, status, message, FOUND_MESSAGE);
  } catch (error) {
    console.error("Message Controller: Error get message: " + error);

    sendJsonResponse(res, STATUS_INTERNAL_SERVER_ERROR, error, undefined);
  }
}

const getMessagesFromRoom = async (req, res) => {
  try {
    const {roomId} = req.body;

    const FOUND_MESSAGES = await MESSAGE_REPOSITORY.getMessagesFromRoom({ roomId });

    let status = STATUS_OK;
    let message = "Get messages sucessfully!";

    if (!FOUND_MESSAGES) {
      status = STATUS_NO_CONTENT;
      message = "Get messages empty!";
    }

    sendJsonResponse(res, status, message, FOUND_MESSAGES);
  } catch (error) {
    console.error("Message Controller: Error get messages: " + error);

    sendJsonResponse(res, STATUS_INTERNAL_SERVER_ERROR, error, undefined);
  }
}

const addMessage = async (req, res) => {  
  const { roomId, userSend, content } = req.body;

  try {
    const FOUND_MESSAGE = await MESSAGE_REPOSITORY.addMessage({roomId, userSend, content});

    let status = STATUS_OK;
    let message = "Add message sucessfully!";

    if (!FOUND_MESSAGE) {
      status = STATUS_NO_CONTENT;
      message = "Add message empty!";
    }

    sendJsonResponse(res, status, message, FOUND_MESSAGE);
  } catch (error) {
    console.error("Message Controller: Error add message: " + error);

    sendJsonResponse(res, STATUS_INTERNAL_SERVER_ERROR, error, undefined);
  }
}

module.exports = {
  getMessage,
  getMessagesFromRoom, 
  addMessage,
}