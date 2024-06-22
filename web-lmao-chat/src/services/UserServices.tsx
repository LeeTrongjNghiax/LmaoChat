import axios from "axios";
import { GlobalVariables } from "../GlobalVariables";

const status = GlobalVariables.status;
const api_host = GlobalVariables.api_host;

const sendErrorMessage = (message: string) => {
  return {
    status: status.INTERNAL_SERVER_ERROR,
    message: `Server Error: ${message}`
  }
}

const getError = (error: unknown) => {
  if (typeof error === `string`)
    return error.toUpperCase();
  else if (error instanceof Error)
    return error.message;
}

const getUser = async (phoneNumber: string) => {
  try {
    const response = await axios.get(
      `${api_host}/api/users/${phoneNumber}`, 
    );

    return {
      status: response.status, 
      data: response.data
    }
  } catch (error) {
    const result: string = getError(error)!;

    console.error(`User Service: Get user error: ${result}`);

    return sendErrorMessage(result);
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get(
      `${api_host} /api/users`
    );

    return {
      status: response.status, 
      data: response.data
    }
  } catch (error) {
    const result: string = getError(error)!;

    console.error(`User Service: Get users error: ${result}`);

    return sendErrorMessage(result);
  }
};

const addUser = async (
  phoneNumber: string, firstName: string, lastName: string, password: string
) => {
  try {
    const data = {
      phoneNumber,
      firstName,
      lastName,
      password
    }

    const response = await axios.post(
      `${api_host}/api/users`, 
      data
    );

    return {
      status: response.status, 
      data: response.data
    }
  } catch (error) {
    const result: string = getError(error)!;

    console.error(`User Service: Add user error: ${result}`);

    return sendErrorMessage(result);
  }
};

const login = async (phoneNumber: string, password: string) => {
  try {
    const data = {
      phoneNumber, password
    }

    const response = await axios.post(
      `${api_host}/api/users/login`, 
      data
    );

    return {
      status: response.status, 
      data: response.data
    }
  } catch (error) {
    const result: string = getError(error)!;

    console.error(`User Service: Login user error: ${result}`);

    return sendErrorMessage(result);
  }
};

const updateUser = async (
  phoneNumber: string, password: string, email: string | null, avatarUrl: string | null
) => {
  try {
    const data = {
      password, email, avatarUrl
    }

    const response = await axios.put(
      `${api_host}/api/users/${phoneNumber}`, 
      data
    );
    
    return {
      status: response.status, 
      data: response.data
    }
  } catch (error) {
    const result: string = getError(error)!;

    console.error(`User Service: Update user error: ${result}`);

    return sendErrorMessage(result);
  }
};

const addFriendRequest = async (phoneNumberSend: string, phoneNumberGet: string) => {
  try {
    const response = await axios.get(
      `${api_host}/api/users/addFriendRequest/${phoneNumberSend}/${phoneNumberGet}`
    );

    return {
      status: response.status, 
      data: response.data
    }
  } catch (error) {
    const result: string = getError(error)!;

    console.error(`User Service: Add friend request error: ${result}`);

    return sendErrorMessage(result);
  }
};
const UserServices = {
  getUser, 
  getUsers, 
  addUser, 
  login, 
  updateUser, 
  addFriendRequest
}

export default UserServices;