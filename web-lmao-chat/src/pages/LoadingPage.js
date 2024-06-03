/*
  * Used by
  *   pages
  *     SignInPage.js
  *     ErrorPage.js
  *     PhoneNumberInputToForgotPasswordPage.js
  *     PhoneNumberInputToSignInPage.js
*/

import React from 'react';
import { LoaderCircle } from 'lucide-react'

import ExportColor from '../GlobalVariables';

export default function LoadingPage() {
  const {
    backgroundColor, 
    iconColor, 
    textColor, 
  } = ExportColor();

  return (
    <div
      className={`
        h-screen flex flex-col gap-10 items-center justify-center
      `}
      style={{
        background: backgroundColor
      }}
    >
      <LoaderCircle className={`animate-spin`} size={100} color={iconColor} />
      
      <p
        className={`
          text-2xl font-bold select-none
        `}
        style={{
          color: textColor
        }}
      >Loading...</p>
    </div>
  );
};