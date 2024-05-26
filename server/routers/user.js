const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const { USER_CONTROLLER } = require("../controllers/index");

ROUTER.post("/login", USER_CONTROLLER.login);

module.exports = ROUTER;