const { USER_REPOSITORY } = require("../repositories/index");

const addUser = async (req, res) => {
  const { phoneNumber, firstName, lastName, password } = req.body;

  try {
    const FOUND_USER = await USER_REPOSITORY.addUser({ phoneNumber, firstName, lastName, password });
    
    if (FOUND_USER)
      res.status(200).json({
        message: "Add user sucessfully!",
        data: FOUND_USER
      });
    else
      res.status(200).json({
        message: "Add user failed!",
        data: FOUND_USER
      });

  } catch (error) {
    console.log("User Controller: Error login user: " + error);
    throw new Error("User Controller: Error login user: " + error);
  }
}

const login = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const FOUND_USER = await USER_REPOSITORY.login({ phoneNumber, password });
    
    if (FOUND_USER)
      res.status(200).json({
        message: "Login sucessfully!",
        data: FOUND_USER
      });
    else
      res.status(200).json({
        message: "Login failed!",
        data: FOUND_USER
      });

  } catch (error) {
    console.log("User Controller: Error login user: " + error);
    throw new Error("User Controller: Error login user: " + error);
  }
}

module.exports = {
  addUser, 
  login
}