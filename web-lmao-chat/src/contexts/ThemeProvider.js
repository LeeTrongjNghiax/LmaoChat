/*
  * Used by 
  *   index.js
  *   components
  *     ChangeThemeButton.js
  *     Logo.js
  *     Navbar.js
  *   pages
  *     ErrorPage.js
  *     PhoneNumberInputToForgotPasswordPage.js
  *     PhoneNumberInputToSignInPage.js
  *     SignInPage.js
*/

import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("theme1");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "theme1";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = newTheme => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);