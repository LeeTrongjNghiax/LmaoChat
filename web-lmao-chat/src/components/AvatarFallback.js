import React from 'react'

import { useTheme } from '../contexts/ThemeProvider';

export default function AvatarFallback({name}) {
  const { theme } = useTheme();

  const getNameInit = name => name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();

  return (
    <div className={`
      bg-blue-900
      text-white
      size-10 flex items-center justify-center rounded-full
    `}>
      {getNameInit(name ? name : "undefined")}
    </div>
  )
}
