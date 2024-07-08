interface MESSAGE_INTERFACE {
  roomId?: string, 
  userSend: string, 
  // messageId: string, 
  content: string, 
  dateCreate?: string
}

export default MESSAGE_INTERFACE;