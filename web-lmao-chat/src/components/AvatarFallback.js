import React from 'react'

import ExportColor from '../GlobalVariables';

export default function AvatarFallback({name}) {
  const {
    linkColor,
  } = ExportColor();

  const getNameInit = name => name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();

  return (
    <div
      className={`
        transition duration-[500] 
        text-white
        size-10 flex items-center justify-center rounded-full
      `}
      style={{
        background: `linear-gradient(90deg, transparent, ${linkColor})`, 
        // background: linkColor, 
        // color: textColor
      }}
    >
      {getNameInit(name ? name : "undefined")}
    </div>
  )
}
