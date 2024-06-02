import axios from "axios";
import { GlobalVariables } from "../GlobalVariables";

const getUser = async (phoneNumber) => {
  try {
    const response = await axios.get(
      GlobalVariables.api_host + "/api/users/" + phoneNumber, 
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error get user");
      throw new Error("Error get user");
    }
  } catch (error) {
    console.error("User Service: Get user error: ", error);
    throw new Error(error);
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
    throw new Error(error);
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
      return response.data;
    } else {
      console.error("Error add user");
      throw new Error("Error add user");
    }
  } catch (error) {
    console.error("User Service: Add user error: ", error);
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
      return response.data;
    } else {
      console.error("Error update user");
      throw new Error("Error update user");
    }
  } catch (error) {
    console.error("User Service: Update user error: ", error);
    throw new Error(error);
  }
};

export default {
  getUser, 
  getUsers, 
  addUser, 
  login, 
  updateUser
}