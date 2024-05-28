const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const { USER_CONTROLLER } = require("../controllers/index");

ROUTER.post("/", USER_CONTROLLER.getUser);
ROUTER.get("/", USER_CONTROLLER.getUsers);
ROUTER.post("/add", USER_CONTROLLER.addUser);
ROUTER.post("/login", USER_CONTROLLER.login);

module.exports = ROUTER;