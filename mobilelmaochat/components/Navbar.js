/*
  * Used by
  *   pages
  *     ErrorPage.js
  *     PhoneNumberInputToForgotPasswordPage.js
  *     PhoneNumberInputToSignInPage.js
  *     SignInPage.js
*/

import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react-native';

import { useTheme } from '../contexts/ThemeProvider';
import ChangeThemeButton from './ChangeThemeButton';
import { Pressable, View } from 'react-native';
import tailwind from '../tailwind.config';

export default function Navbar({ size }) {
  const [buttonColor, setButtonColor] = useState("white");
  const { theme } = useTheme();

  const bgColor = tailwind.theme.extend.backgroundColor[`color-${theme}`];

  useEffect(() => {
    theme === "theme1" ? setButtonColor("white") : setButtonColor("black")
  });

  const goBack = () => {
    // navigate(-1);
  }

  return (
    <View
      className={`
        transition duration-[500]
        w-screen p-3 flex gap-3 flex-row
      `}
      style={{
        backgroundColor: bgColor
      }}
    >
      <Pressable title='Go Back'>
        <ArrowLeft onPress={goBack} color={buttonColor} size={size ? size : 30} className={`
          cursor-pointer
        `} />
      </Pressable>

      <ChangeThemeButton themeToChange="theme1" />
    </View>
  )
}
