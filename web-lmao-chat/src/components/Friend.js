import React from 'react'
import AvatarFallback from './AvatarFallback'

export default function Friend({name, newMessage}) {
  return (
    <div className={`flex gap-5 justify-start items-center`}>
      {/* Avatar */}
      <AvatarFallback name={name ? name : "undefined"} />

      <div className={`flex flex-col items-start`}>
        {/* Name */}
        <p className={`font-bold`}>{name ? name : "undefined"}</p>

        {/* New Message */}
        <p>{newMessage ? newMessage : ""}</p>
      </div>
    </div>
  )
}
