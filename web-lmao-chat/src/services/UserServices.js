import axios from "axios";
import { GlobalVariables } from "../GlobalVariables";

const sendErrorMessage = message => {
  return {
    status: "ERRORED",
    message: "Server Error: " + message
  }
}

const getUser = async (phoneNumber) => {
  try {
    const response = await axios.get(
      GlobalVariables.api_host + "/api/users/" + phoneNumber, 
    );
    if (response.status === 200) {
      return {
        status: "SUCCESS", 
        data: response.data
      }
    } else {
      console.error("Error get user");
      
      return {
        status: "FAILED", 
        data: response.data
      }
    }
  } catch (error) {
    console.error("User Service: Get user error: ", error);
    
    return sendErrorMessage(error.message);
  }
};

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
    
    return sendErrorMessage(error.message);
  }
};

const addUser = async (phoneNumber, firstName, lastName, password) => {
  try {
    const data = {
      phoneNumber, 
      firstName, 
      lastName,
      password
    }

    const response = await axios.post(
      GlobalVariables.api_host + "/api/users", 
      data
    );

    if (response.status === 200) {
      return {
        status: "SUCCESS", 
        data: response.data
      }
    } else {
      console.error("Error add user");
      
      return {
        status: "FAILED", 
        message: response.data
      }
    }
  } catch (error) {
    console.error("User Service: Add user error: ", error);
    
    return sendErrorMessage(error.message);
  }
};

const login = async (phoneNumber, password) => {
  try {
    const data = {
      phoneNumber, password
    }

    console.log(GlobalVariables.api_host + "/api/users/login");

    const response = await axios.post(
      GlobalVariables.api_host + "/api/users/login", 
      data
    );
    
    if (response.status === 200) {
      return {
        status: "SUCCESS", 
        data: response.data
      }
    } else {
      console.error("Error login user");

      return {
        status: "FAILED", 
        message: response.data
      }
    }
  } catch (error) {
    console.error("User Service: Login user error: ", error);

    return sendErrorMessage(error.message);
  }
};

const updateUser = async (phoneNumber, password, email, avatarUrl) => {
  try {
    const data = {
      password, email, avatarUrl
    }

    const response = await axios.put(
      GlobalVariables.api_host + "/api/users/" + phoneNumber, 
      data
    );
    
    if (response.status === 200) {
      return {
        status: "SUCCESS", 
        data: response.data
      }
    } else {
      console.error("Error update user");
      
      return {
        status: "FAILED", 
        message: response.data
      }
    }
  } catch (error) {
    console.error("User Service: Update user error: ", error);
    
    return sendErrorMessage(error.message);
  }
};

const UserServices = {
  getUser, 
  getUsers, 
  addUser, 
  login, 
  updateUser
}

export default UserServices;