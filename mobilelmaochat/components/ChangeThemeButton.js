/*
  * Used by
  *   components
  *     Navbar.js
*/

import React from 'react';
import { Moon, Sun } from 'lucide-react-native';

import { useTheme } from '../contexts/ThemeProvider';
import { Pressable, View } from 'react-native';

export default function ChangeThemeButton({size}) {
  const { toggleTheme, theme } = useTheme();

  const changeTheme = () => {
    switch (theme) {
      case "theme1":
        toggleTheme("theme2");
        break;
      case "theme2":
        toggleTheme("theme1");
        break;
      default:
        toggleTheme("theme1");
    }
  }
  
  return (
    <View>
      <Pressable
        title='Change Theme'
        className={`bg-color-red`}
        onPress={changeTheme}
      >
        {
          theme === "theme1" ?
            <Sun color="white" size={size ? size : 30} /> :
            <Moon color="black" size={size ? size : 30} />
        }
      </Pressable>
    </View>
  )
}
