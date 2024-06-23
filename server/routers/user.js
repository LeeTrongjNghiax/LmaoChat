const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const { USER_CONTROLLER } = require("../controllers/index");

ROUTER.get("/:phoneNumber", USER_CONTROLLER.getUser);
ROUTER.get("/", USER_CONTROLLER.getUsers);
ROUTER.post("/", USER_CONTROLLER.addUser);
ROUTER.post("/login", USER_CONTROLLER.login);
ROUTER.put("/:phoneNumber", USER_CONTROLLER.updateUser);
ROUTER.get("/addFriendRequest/:phoneNumberSend/:phoneNumberGet", USER_CONTROLLER.addFriendRequest);
ROUTER.get("/removeFriendRequest/:phoneNumberSend/:phoneNumberGet", USER_CONTROLLER.removeFriendRequest);
ROUTER.get("/acceptFriend/:phoneNumberSend/:phoneNumberGet", USER_CONTROLLER.acceptFriend);

module.exports = ROUTER;