import { FRIEND_INTERFACE } from "./";

interface USER_INTERFACE {
  roomId?: string, 
  phoneNumber: string, 
  firstName: string, 
  lastName: string, 
  requestSends: string[], 
  requestGets: string[], 
  friends: FRIEND_INTERFACE[], 
}

export default USER_INTERFACE;