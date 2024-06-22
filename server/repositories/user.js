const { USER } = require("../modals/index");
const bcrypt = require("bcrypt");

const getUser = async ({ phoneNumber }) => {
  try {
    const FOUND_USER = await USER.findOne({ phoneNumber }).exec();
    return FOUND_USER;
  } catch (error) {
    console.error("User Repository: Error get user: " + error);
    throw new Error("User Repository: Error get user: " + error);
  }
}

const getUsers = async () => {
  try {
    const USERS = await USER.find().exec();
    return USERS;
  } catch (error) {
    console.error("User Repository: Error get users: " + error);
    throw new Error("User Repository: Error get users: " + error);
  }
}

const addUser = async ({ phoneNumber, firstName, lastName, password }) => {
  try {
    const FOUND_USER = await USER.findOne({ phoneNumber }).exec();

    if (!!FOUND_USER)
      return undefined;
    
    const SALT = await bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    const HASH = await bcrypt.hashSync(password, SALT);

    const NEW_USER = await USER.create({
      firstName,
      lastName,
      phoneNumber,
      email: "",
      password: HASH,
      avatarUrl: "",
      friends: [],
      requestSends: [],
      requestGets: []
    });

    return NEW_USER;
  } catch (error) {
    console.error("User Repository: Error add user: " + error);
    throw new Error("User Repository: Error add user: " + error);
  }
}

const login = async ({ phoneNumber, password }) => {
  try {
    const FOUND_USER = await USER.findOne( { phoneNumber }).exec();

    if (!FOUND_USER)
      return FOUND_USER;
    
    const RESULT = await bcrypt.compare(password, FOUND_USER.password);

    if (RESULT)
      return FOUND_USER;
    
    return null;
  } catch (error) {
    console.error("User Repository: Error login user: " + error);
    throw new Error("User Repository: Error login user: " + error);
  }
}

const updateUser = async ({ phoneNumber, password, email, avatarUrl }) => {
  try {
    let HASH_PASSWORD;

    const filter = { phoneNumber };
    const update = {};

    if (password) {
      HASH_PASSWORD = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );
      update.password = HASH_PASSWORD;
    }

    if (email)
      update.email = email;

    if (avatarUrl)
      update.avatarUrl = avatarUrl;

    const UPDATED_USER = await USER.findOneAndUpdate(
      filter, update, { new: true }
    );

    return UPDATED_USER;
  } catch (error) {
    console.error("User Repository: Error update user: " + error);
    throw new Error("User Repository: Error update user: " + error);
  }
}

const addFriendRequest = async ({ phoneNumberSend, phoneNumberGet }) => {
  try {
    const USER_ADD_FRIEND_REQUEST = await USER.findOne( { phoneNumber: phoneNumberSend }).exec();
    const USER_RECEIVE_FRIEND_REQUEST = await USER.findOne( { phoneNumber: phoneNumberGet }).exec();

    if (!USER_ADD_FRIEND_REQUEST)
      return undefined;

    if (!USER_RECEIVE_FRIEND_REQUEST)
      return null;

    USER_ADD_FRIEND_REQUEST.requestSends.push(phoneNumberGet);
    USER_ADD_FRIEND_REQUEST.save();

    USER_RECEIVE_FRIEND_REQUEST.requestGets.push(phoneNumberSend)
    USER_RECEIVE_FRIEND_REQUEST.save();

    return USER_RECEIVE_FRIEND_REQUEST;
  } catch (error) {
    console.error("User Repository: Error update user: " + error);
    throw new Error("User Repository: Error update user: " + error);
  }
}

module.exports = {
  getUser, 
  getUsers, 
  addUser, 
  login, 
  updateUser, 
  addFriendRequest
}