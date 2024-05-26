const { USER } = require("../modals/index");

const login = async ({ phoneNumber, password }) => {
  try {
    const FOUND_USER = await USER.findOne({ phoneNumber, password }).exec();
    return FOUND_USER;
  } catch (error) {
    console.log("User Repository: Error login user: " + error);
    throw new Error();
  }
}

module.exports = {
  login
}