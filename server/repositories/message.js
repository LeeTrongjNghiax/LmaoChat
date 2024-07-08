const { MESSAGE } = require("../modals/index");

const getMessage = async ({ content }) => {
  try {
    const FOUND_MESSAGE = await MESSAGE.findOne({ content }).exec();
    return FOUND_MESSAGE;
  } catch (error) {
    console.error("Message Repository: Error get message: " + error);
    throw new Error("Message Repository: Error get message: " + error);
  }
}

const getMessagesFromRoom = async ({ roomId }) => {
  try {
    const FOUND_MESSAGES = await MESSAGE.find({ 
      roomId: roomId
     }).exec();
    return FOUND_MESSAGES;
  } catch (error) {
    console.error("Message Repository: Error get messages: " + error);
    throw new Error("Message Repository: Error get messages: " + error);
  }
}

const addMessage = async ({ roomId, userSend, content }) => {
  try {
    const NEW_MESSAGE = await MESSAGE.create({
      roomId, 
      userSend, 
      content, 
      status: "ACTIVE", 
      reacts: [], 
    });

    return NEW_MESSAGE;
  } catch (error) {
    console.error("Message Repository: Error add message: " + error);
    throw new Error("Message Repository: Error add message: " + error);
  }
}

module.exports = {
  getMessage,
  getMessagesFromRoom, 
  addMessage,
}