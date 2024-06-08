import { PropsWithChildren, ReactElement, useState } from "react";
import { MoreVertical, SmilePlus, MessageSquareReply, MessageSquareShare, MessageSquareOff, MessageSquareX } from "lucide-react";

import AvatarFallback from "./AvatarFallback.tsx";
import ExportColor from "../GlobalVariables";

interface Props extends PropsWithChildren<any>{
  dir?: string, 
  name: string, 
  dateSent: string, 
  content: string
}

export default function Message({ dir, name, dateSent, content } : Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const {
    chatBackgroundColor, 
    textColor,
  } = ExportColor();

  const handleOpenMoreOption = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`flex flex-col gap-2`} dir={dir ? dir : "rtl"}>

      <div className={`flex gap-5 items-center`}>
        <AvatarFallback name={name ? name : `undefined`} />

        <div className={`flex flex-col`}>
          <p className={`font-bold`}>{name ? name : "undefined"}</p>
          <p className={`italic`} dir={"ltr"}>{dateSent ? dateSent : "unknown time"}</p>
        </div>
      </div>

      <div className={`flex gap-5 items-center`}>
        <div
          className={`
            transition duration-[500] 
            w-fit p-1.5 rounded-lg max-w-xl
          `}
          style={{
            background: chatBackgroundColor, 
            color: textColor
          }}
        >
          {content ? content : `undefined`}
        </div>

        <div className={`flex relative`}>
          <button
            onClick={handleOpenMoreOption}
            title={`More options for message`}
          >
            <MoreVertical size={20} />
          </button>
          
          <div
            id='moreOption'
            className={`
              ${isOpen ? `flex` : `hidden`}
              top-7 absolute flex-col gap-1.5 p-1.5 rounded-xl
            `}
            style={{
              background: chatBackgroundColor, 
              color: textColor
            }}  
          >
            <button
              className={`flex gap-1.5 items-center`}
              title={`Click to add emoji to message`}
            >
              <SmilePlus />
              <p>Emoji</p>
            </button>
            
            <button
              className={`flex gap-1.5 items-center`}
              title={`Click to reply message`}
            >
              <MessageSquareReply />
              <p>Reply</p>
            </button>

            <button
              className={`flex gap-1.5 items-center`}
              title={`Click to share message`}
            >
              <MessageSquareShare />
              <p>Share</p>
            </button>

            <button
              className={`flex gap-1.5 items-center`}
              title={`Click to remove message`}
            >
              <MessageSquareOff />
              <p>Remove</p>
            </button>

            <button
              className={`flex gap-1.5 items-center`}
              title={`Click to delete message`}
            >
              <MessageSquareX />
              <p>Delete</p>
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
