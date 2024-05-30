/*
  * Used by
  *   pages
  *     PhoneNumberInputToForgotPasswordPage.js
  *     PhoneNumberInputToSignInPage.js
  *     SignInPage.js
*/

import React from 'react'

import { useTheme } from '../contexts/ThemeProvider';

export default function Logo() {
  const { theme } = useTheme();

  return (
    // <Chrome className={`mx-auto h-10 w-auto select-none`} color={color} />
    <img src={require("./LmaoChatLogo.png")} alt='logo' width={50}></img>
  )
}