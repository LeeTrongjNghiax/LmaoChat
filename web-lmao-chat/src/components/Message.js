import React, { useState } from 'react'
import { MoreVertical, SmilePlus, MessageSquareReply, MessageSquareShare, MessageSquareOff, MessageSquareX } from 'lucide-react';

import AvatarFallback from './AvatarFallback'
import ExportColor from '../GlobalVariables';

export default function Message({dir, name, dateSent, content}) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    backgroundColor,
    borderColor,
    buttonColor,
    chatBackgroundColor, 
    iconColor,
    linkColor,
    textColor,
  } = ExportColor();

  const handleOpenMoreOption = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`flex flex-col gap-2`} dir={dir ? dir : "rtl"}>

      <div className={`flex gap-5 items-center`}>
        <AvatarFallback name={name ? name : "undefined"} />

        <div className={`flex flex-col`}>
          <p className={`font-bold`}>{name ? name : "undefined"}</p>
          <p className={`italic`}>{dateSent ? dateSent : "unknown time"}</p>
        </div>
      </div>

      <div className={`flex gap-5 items-center`}>
        <div
          className={`
            transition duration-[500] 
            w-fit p-1.5 rounded-lg
          `}
          style={{
            background: chatBackgroundColor, 
            color: textColor
          }}
        >
          {content ? content : "undefined"}
        </div>

        <div className={`flex relative`}>
          <button onClick={handleOpenMoreOption} title='More options for message'>
            <MoreVertical size={20} />
          </button>
          
          <div
            id='moreOption'
            className={`
              ${isOpen ? "flex" : "hidden"}
              top-5 absolute flex-col gap-1.5 p-1.5 rounded-xl
            `}
            style={{
              background: chatBackgroundColor, 
              color: textColor
            }}  
          >
            <div className={`flex gap-1.5 items-center`}>
              <button title='Click to add emoji to message'>
                <SmilePlus />
              </button>
              <p>Emoji</p>
            </div>
            
            <div className={`flex gap-1.5 items-center`}>
              <button title='Click to reply message'>
                <MessageSquareReply />
              </button>
              <p>Reply</p>
            </div>

            <div className={`flex gap-1.5 items-center`}>
              <button title='Click to share message'>
                <MessageSquareShare />
              </button>
              <p>Share</p>
            </div>

            <div className={`flex gap-1.5 items-center`}>
              <button title='Click to remove message'>
                <MessageSquareOff />
              </button>
              <p>Remove</p>
            </div>

            <div className={`flex gap-1.5 items-center`}>
              <button title='Click to delete message'>
                <MessageSquareX />
              </button>
              <p>Delete</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
