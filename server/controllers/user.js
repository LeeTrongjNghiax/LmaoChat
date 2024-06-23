const { USER_REPOSITORY } = require("../repositories/index");

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

const getUser = async (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  try {
    const FOUND_USER = await USER_REPOSITORY.getUser({ phoneNumber });

    let status = STATUS_OK;
    let message = "Get user sucessfully!";

    if (!FOUND_USER) {
      status = STATUS_NO_CONTENT;
      message = "Get user empty!";
    }

    sendJsonResponse(res, status, message, FOUND_USER);
  } catch (error) {
    console.error("User Controller: Error get user: " + error);

    sendJsonResponse(res, STATUS_INTERNAL_SERVER_ERROR, error, undefined);
  }
}

const getUsers = async (req, res) => {
  try {
    const USERS = await USER_REPOSITORY.getUsers();

    let status = STATUS_OK;
    let message = "Get users sucessfully!";

    if (!USERS) {
      status = STATUS_NO_CONTENT;
      message = "Get users empty!";
    }

    sendJsonResponse(res, status, message, USERS);
  } catch (error) {
    console.error("User Controller: Error get users: " + error);

    sendJsonResponse(res, STATUS_INTERNAL_SERVER_ERROR, error, undefined);
  }
}

const addUser = async (req, res) => {
  const { phoneNumber, firstName, lastName, password } = req.body;

  try {
    const FOUND_USER = await USER_REPOSITORY.addUser({ phoneNumber, firstName, lastName, password }); 

    let status = STATUS_CREATED;
    let message = "Add user sucessfully!";

    if (FOUND_USER === null) {
      status = STATUS_ACCEPTED;
      message = "Add user failed!";
    }

    if (FOUND_USER === undefined) {
      status = STATUS_CONFLICT;
      message = "Add user failed!: Existing user with number " + phoneNumber;
    }

    sendJsonResponse(res, status, message, FOUND_USER);
  } catch (error) {
    console.error("User Controller: Error login user: " + error);

    sendJsonResponse(res, STATUS_INTERNAL_SERVER_ERROR, error, undefined);
  }
}

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const FOUND_USER = await USER_REPOSITORY.login({ phoneNumber, password });

    let status = STATUS_OK;
    let message = "Login user sucessfully!";

    if (!FOUND_USER) {
      status = STATUS_NO_CONTENT;
      message = "Login user failed!";
    }

    sendJsonResponse(res, status, message, FOUND_USER);
  } catch (error) {
    console.error("User Controller: Error login user: " + error);

    sendJsonResponse(res, STATUS_INTERNAL_SERVER_ERROR, error, undefined);
  }
}

const updateUser = async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  const { password, email, avatarUrl } = req.body;

  try {
    const UPDATED_USER = await USER_REPOSITORY.updateUser({ phoneNumber, password, email, avatarUrl });
  
    let status = STATUS_OK;
    let message = "Update user sucessfully!";

    if (!UPDATED_USER) {
      status = STATUS_OK;
      message = "Update user failed!";
    }

    sendJsonResponse(res, status, message, UPDATED_USER);
  } catch (error) {
    console.error("User Controller: Error update user: " + error);

    sendJsonResponse(res, STATUS_INTERNAL_SERVER_ERROR, error, undefined);
  }
}

const addFriendRequest = async (req, res) => {
  const phoneNumberSend = req.params.phoneNumberSend;
  const phoneNumberGet = req.params.phoneNumberGet;

  try {
    const RESULT = await USER_REPOSITORY.addFriendRequest({ phoneNumberSend, phoneNumberGet });
  
    let status = STATUS_OK;
    let message = "Send friend request sucessfully!";

    if (RESULT === undefined) {
      status = STATUS_NO_CONTENT;
      message = "User send friend request or user get friend request does not exist";
    }

    if (RESULT === null) {
      status = STATUS_CONFLICT;
      message = "User receive friend request already had friend request from user send friend request";
    }

    sendJsonResponse(res, status, message, RESULT);
  } catch (error) {
    console.error("User Controller: Error add friend request: " + error);

    sendJsonResponse(res, STATUS_INTERNAL_SERVER_ERROR, error, undefined);
  }
}

const removeFriendRequest = async (req, res) => {
  const phoneNumberSend = req.params.phoneNumberSend;
  const phoneNumberGet = req.params.phoneNumberGet;

  try {
    const RESULT = await USER_REPOSITORY.removeFriendRequest({ phoneNumberSend, phoneNumberGet });
  
    let status = STATUS_OK;
    let message = "Remove friend request sucessfully!";

    if (RESULT === undefined) {
      status = STATUS_NO_CONTENT;
      message = "User send friend request or user get friend request does not exist";
    }

    if (RESULT === null) {
      status = STATUS_CONFLICT;
      message = "User receive friend request do not have friend request from user send friend request";
    }

    sendJsonResponse(res, status, message, RESULT);
  } catch (error) {
    console.error("User Controller: Error remove friend request: " + error);

    sendJsonResponse(res, STATUS_INTERNAL_SERVER_ERROR, error, undefined);
  }
}

module.exports = {
  getUser, 
  getUsers, 
  addUser, 
  login, 
  updateUser, 
  addFriendRequest, 
  removeFriendRequest
}