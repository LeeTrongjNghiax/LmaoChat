import React from 'react'
import AvatarFallback from './AvatarFallback'

export default function Message({dir, name, dateSent, content}) {
  return (
    <div className={`flex flex-col gap-2`} dir={dir ? dir : "rtl"}>

      <div className={`flex gap-5 items-center`}>
        <AvatarFallback name={name ? name : "undefined"} />

        <div className={`flex flex-col`}>
          <p className={`font-bold`}>{name ? name : "undefined"}</p>
          <p className={`italic`}>{dateSent ? dateSent : "unknown time"}</p>
        </div>
      </div>

      <div className={`w-fit p-1.5 rounded-lg bg-blue-900 text-white`}>
        {content ? content : "undefined"}
      </div>
    </div>
  )
}
