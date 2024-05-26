const { USER_REPOSITORY } = require("../repositories/index");

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
    throw new Error();
  }
}

module.exports = {
  login
}