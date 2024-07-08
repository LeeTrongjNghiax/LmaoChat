import { ReactElement } from "react";

import { AvatarFallback } from "./";

export default function Friend(
  { name, newMessage } : { name: string, newMessage: string }
): ReactElement {
  return (
    <div className={`flex gap-5 justify-start items-center`}>
      {/* Avatar */}
      <AvatarFallback name={name ? name : `undefined`} />

      <div className={`flex flex-col items-start`}>
        {/* Name */}
        <p className={`font-bold`}>{name ? name : "undefined"}</p>

        {/* New Message */}
        <p>{newMessage ? newMessage : ``}</p>
      </div>
    </div>
  )
}
