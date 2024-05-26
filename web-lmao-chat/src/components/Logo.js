/*
  * Used by
  *   pages
  *     PhoneNumberInputToForgotPasswordPage.js
  *     PhoneNumberInputToSignInPage.js
  *     SignInPage.js
*/

import React from 'react'
import { Chrome } from 'lucide-react';

import { useTheme } from '../contexts/ThemeProvider';
import tailwind from "../tailwind.config.js"

export default function Logo() {
  const { theme } = useTheme();

  const color = tailwind.theme.extend.backgroundColor[`color-primary-${theme}`]

  return (
    <Chrome className={`mx-auto h-10 w-auto select-none`} color={color} />
  )
}