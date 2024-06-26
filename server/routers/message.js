const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const { MESSAGE_CONTROLLER } = require("../controllers/index");

ROUTER.get("/:content", MESSAGE_CONTROLLER.getMessage);
ROUTER.post("/getMessagesFromRoom", MESSAGE_CONTROLLER.getMessagesFromRoom);
ROUTER.post("/", MESSAGE_CONTROLLER.addMessage);

module.exports = ROUTER;