import React from 'react'
import { useTheme } from '../contexts/ThemeProvider';
import tailwind from "../tailwind.config.js"

export default function Logo() {
  const { theme } = useTheme();

  const color = tailwind.theme.extend.backgroundColor[`color-primary-${theme}`]

  return (
    <img
      className={`mx-auto h-10 w-auto select-none`}
      src={`https://tailwindui.com/img/logos/mark.svg?color=${color}&shade=800`}
      alt="Your Company"
    />
  )
}