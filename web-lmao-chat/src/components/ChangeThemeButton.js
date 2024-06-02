/*
  * Used by
  *   components
  *     Navbar.js
*/

import React from 'react';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../contexts/ThemeProvider';

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
    <div>
      <button
        className={`bg-${theme}`}
        onClick={changeTheme}
      >
        {
          theme === "theme1" ?
            <Sun size={size ? size : 30} /> :
            <Moon size={size ? size : 30} />
        }
      </button>
    </div>
  )
}
