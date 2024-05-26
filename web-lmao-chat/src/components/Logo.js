import React from 'react'
import { useTheme } from '../contexts/ThemeProvider';

export default function Logo() {
  const { theme } = useTheme();
  
  // console.log(theme);

  return (
    <img
      className={`mx-auto h-10 w-auto select-none`}
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    />
  )
}