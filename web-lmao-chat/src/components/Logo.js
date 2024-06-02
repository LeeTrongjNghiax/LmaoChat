/*
  * Used by
  *   pages
  *     PhoneNumberInputToForgotPasswordPage.js
  *     PhoneNumberInputToSignInPage.js
  *     SignInPage.js
*/

import React from 'react'

import { useTheme } from '../contexts/ThemeProvider';
import tailwind from "../tailwind.config.js"

export default function Logo() {
  const { theme } = useTheme();

  const color = tailwind.theme.extend.backgroundColor[`color-primary-${theme}`]

  return (
    <img src={require("./LmaoChatLogo.png")} alt='logo' width={50}></img>
  )
}