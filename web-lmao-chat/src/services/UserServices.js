import axios from "axios";
import GlobalVariables from "../GlobalVariables";

const getUsers = async () => {
  try {
    const response = await axios.get(
      GlobalVariables.api_host + "/api/users"
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error get users");
      throw new Error("Error get users");
    }
  } catch (error) {
    console.error("User Service: Get users error: ", error);
    throw new Error(error);
  }
};

const login = async (phoneNumber, password) => {
  try {
    const data = {
      phoneNumber, password
    }

    const response = await axios.post(
      GlobalVariables.api_host + "/api/users/login", 
      data
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error login user");
      throw new Error("Error login user");
    }
  } catch (error) {
    console.error("User Service: Login user error: ", error);
    throw new Error(error);
  }
};

export default {
  getUsers, 
  login, 
}