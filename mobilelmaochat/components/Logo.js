/*
  * Used by
  *   pages
  *     PhoneNumberInputToForgotPasswordPage.js
  *     PhoneNumberInputToSignInPage.js
  *     SignInPage.js
*/

import React from 'react'

import { Image } from 'react-native';

export default function Logo() {

  return (
    <Image
      source={require("./LmaoChatLogo.png")}
      alt='logo'
      style={{
        width: 50, 
        height: 50
      }}
    >
        
    </Image>
  )
}