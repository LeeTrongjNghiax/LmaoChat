import React, { useState } from 'react'
import { MoreVertical, MessageSquareReply, MessageSquareShare, MessageSquareOff, MessageSquareX } from 'lucide-react';

import AvatarFallback from './AvatarFallback'

export default function Message({dir, name, dateSent, content}) {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className={`w-fit p-1.5 rounded-lg bg-blue-900 text-white`}>
          {content ? content : "undefined"}
        </div>

        <button title='More options for message' className={`relative`}>
          <MoreVertical size={20} onClick={handleOpenMoreOption} />

          <div id='moreOption' className={`
            ${isOpen ? "flex" : "hidden"}
            absolute flex-col gap-1.5 bg-blue-950 p-1.5 rounded-xl
          `}>
            <div className={`flex gap-1.5 items-center`}>
              <MessageSquareReply />
              <p>Reply</p>
            </div>

            <div className={`flex gap-1.5 items-center`}>
              <MessageSquareShare />
              <p>Share</p>
            </div>

            <div className={`flex gap-1.5 items-center`}>
              <MessageSquareOff />
              <p>Remove</p>
            </div>

            <div className={`flex gap-1.5 items-center`}>
              <MessageSquareX />
              <p>Delete</p>
            </div>

          </div>
        </button>
      </div>
    </div>
  )
}
