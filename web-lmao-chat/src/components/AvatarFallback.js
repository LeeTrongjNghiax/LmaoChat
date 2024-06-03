import React from 'react'

import ExportColor from '../GlobalVariables';

export default function AvatarFallback({name, size}) {
  const {
    linkColor,
  } = ExportColor();

  const getNameInit = name => name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();

  return (
    <div
      className={`
        transition duration-[500] 
        text-white
        flex items-center justify-center 
      `}
      style={{
        background: `linear-gradient(90deg, transparent, ${linkColor})`, 
        width: size ? size : 40, 
        borderRadius: size ? (size / 2) : 20, 
        fontSize: size ? size / 2 : 20, 
        aspectRatio: 1 / 1, 
        // background: linkColor, 
        // color: textColor
      }}
    >
      {getNameInit(name ? name : "undefined")}
    </div>
  )
}
