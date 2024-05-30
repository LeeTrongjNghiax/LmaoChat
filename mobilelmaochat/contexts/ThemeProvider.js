/*
  * Used by 
  *   index.js
  *   components
  *     ChangeThemeButton.js
  *     Logo.js
  *     Navbar.js
  *   pages
  *     ErrorPage.js
  *     LoadingPage.js
  *     PhoneNumberInputToForgotPasswordPage.js
  *     PhoneNumberInputToSignInPage.js
  *     SignInPage.js
*/

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("theme1");

  useEffect(() => {
    async function getTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('theme') || "theme1";
        setTheme(savedTheme);
      } catch (error) {
        console.log("Error getting theme: " + error);
      }
    }
    getTheme();
  }, []);

  const toggleTheme = async newTheme => {
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.log("Error saving theme: " + error);
    }
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);