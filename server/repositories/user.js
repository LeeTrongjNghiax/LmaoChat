const { USER } = require("../modals/index");
const bcrypt = require("bcrypt");

const addUser = async ({ phoneNumber, firstName, lastName, password }) => {
  try {
    const FOUND_USER = await USER.findOne({ phoneNumber }).exec();

    if ( !!FOUND_USER ) {
      throw new Error(`User Repository: Error add user: User with number ${phoneNumber} exists`);
    }

    const HASH_PASSWORD = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const NEW_USER = await USER.create({
      firstName,
      lastName,
      phoneNumber, 
      email: "", 
      password: HASH_PASSWORD,
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
    const FOUND_USER = await USER.findOne({ phoneNumber, password }).exec();
    return FOUND_USER;
  } catch (error) {
    console.error("User Repository: Error login user: " + error);
    throw new Error("User Repository: Error login user: " + error);
  }
}

module.exports = {
  addUser, 
  login
}