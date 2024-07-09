import { BaseSyntheticEvent, memo, useEffect, useRef, useState } from "react";
import { Phone, Video, MoreHorizontal, SmilePlus, Mic, Paperclip, Send } from "lucide-react";

import { Message, AvatarFallback } from "./";
import { MessageServices } from "../../../services";
import ExportColor, { GlobalVariables } from "../../../GlobalVariables";

import { MESSAGE_INTERFACE, USER_INTERFACE } from "../interfaces";
import { SERVER_RESPONSE } from "../../../interfaces";

function Chats(
  { user, currentFriend } : {
    user: USER_INTERFACE, 
    currentFriend: USER_INTERFACE | null
  }
) {
  console.log("%cChats", "color: yellow; fontWeight: bold");

  const [textMessage, setTextMessage] = useState(``);
  const [messages, setMessages] = useState<MESSAGE_INTERFACE[]>([]);
  const socket = GlobalVariables.socket;
  const {
    backgroundColor,
    iconColor,
    textColor,
  } = ExportColor();
  const iconSize = 30;

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const handleChangeTextMessage = (e: BaseSyntheticEvent) => {
    setTextMessage(e.target.value);
  }

  const getMessages = async () => {
    if (currentFriend === null) return;

    socket.on(`Get message from room ${currentFriend!.roomId}`, () => {
      console.log("Get message");
    });

    const response: SERVER_RESPONSE = await MessageServices.getMessagesFromRoom(currentFriend!.roomId);
    console.log(`Get messages`);
    console.log(response.data.data);

    setMessages(response.data.data)
  }

  const handleSendMessage = async () => {
    console.log(`Handle send message`);

    const message: MESSAGE_INTERFACE = {
      roomId: currentFriend!.roomId, 
      userSend: user.phoneNumber, 
      content: textMessage, 
    } 

    socket.emit(`Send message`, message);
    setTextMessage(``);
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (currentFriend !== null) {
      console.log(`Get message from room ${currentFriend!.roomId}`);
      socket.on(`Get message from room ${currentFriend!.roomId}`, async () => {
        const response: SERVER_RESPONSE = await MessageServices.getMessagesFromRoom(currentFriend!.roomId);
        setMessages(response.data.data);
      });
    }

    return () => {
      setMessages([]);
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className={`
        transition duration-[500]
        rounded-3xl m-1 flex flex-1 flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5 overflow-y-scroll
      `}
      style={{
        background: backgroundColor, 
        color: textColor
      }}
    >
      {
        currentFriend !== null ? (
          <>
            {/* Header */}
            <div className={`flex gap-5 w-full items-center`}>
              <AvatarFallback />

              <div className={`flex flex-col`}>
                {/* Name */}
                <p className={`font-bold text-xl`}>{currentFriend?.firstName + ` ` + currentFriend?.lastName}</p>

                {/* New Message */}
                <p>{currentFriend.roomId}</p>
              </div>

              <div className={`flex gap-5 ml-auto`}>
                {/* Call */}
                <button title={`Click to call with current friend`}>
                  <Phone size={iconSize} color={iconColor} />
                </button>

                {/* Video */}
                <button title={`Click to call video with current friend`}>
                  <Video size={iconSize} color={iconColor} />
                </button>

                {/* More */}
                <button title={`Click to see more information`}>
                  <MoreHorizontal size={iconSize} color={iconColor} />
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className={`w-full p-1.5 flex flex-col flex-1 gap-1.5 overflow-y-scroll`}>
              {
                messages.map((e, i) => 
                  <Message key={i} dir={e.userSend === user.phoneNumber ? "rtl" : "ltr"} name={`${user.firstName} ${user.lastName}`} dateSent={e.dateCreate} content={e.content} />
                )
              }

              {/* <Message name={`Le Trong Nghia`} dateSent={`${new Date().toLocaleString()}`} content={`Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey`} />

              <Message dir={`ltr`} name={`Lmao Lmao`} dateSent={`${new Date().toLocaleString()}`} content={`Hello`} /> */}

              <div ref={messagesEndRef}></div>
            </div>

            {/* Chat input */}
            <div className={`w-full flex gap-5 items-center`}>

              {/* Text message input */}
              <div className={`flex flex-1 p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
                <input
                  name={`message`}
                  type={`text`}
                  autoComplete={``}
                  placeholder={`Write your message here`}
                  value={textMessage}
                  onChange={handleChangeTextMessage}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    w-full sm:text-sm select-none focus:outline-none
                  `}
                  style={{
                    background: backgroundColor, 
                    color: textColor, 
                    colorScheme: `dark`
                  }}
                />
              </div>

              {/* Emoji */}
              <button title={`Click to add emoji to your message`}>
                <SmilePlus size={iconSize} color={iconColor} />
              </button>

              {/* Voice */}
              <button title={`Click to send audio message`}>
                <Mic size={iconSize} color={iconColor} />
              </button>

              {/* Send file */}
              <button title={`Click to send file from your computer`}>
                <Paperclip size={iconSize} color={iconColor} />
              </button>

              {/* Send */}
              <button title={`Click to send your message`} onClick={handleSendMessage}>
                <Send size={iconSize} color={iconColor} />
              </button>
            </div>
          </>
        ) : (
          <div>Open up some conversation to start messaging</div>
        )
      }
    </div>
  );
}

export default memo(Chats);