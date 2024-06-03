/*
  * Used by
  *   pages
  *     ErrorPage.js
  *     PhoneNumberInputToForgotPasswordPage.js
  *     PhoneNumberInputToSignInPage.js
  *     SignInPage.js
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { useTheme } from '../contexts/ThemeProvider';
import ChangeThemeButton from './ChangeThemeButton';
import ExportColor from '../GlobalVariables';

export default function Navbar({ size }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const {
    iconColor,
  } = ExportColor();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className={`
      transition duration-[500]
      w-full bg-color-${theme} p-3 lg:p-3 flex gap-3
    `}>
      <button>
        <ArrowLeft onClick={goBack} color={iconColor} size={size ? size : 30} className={`
          cursor-pointer
        `} />
      </button>

      <ChangeThemeButton themeToChange="theme1" />
    </div>
  )
}
