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
import ChangeThemeButton from './ChangeThemeButton.tsx';
import ExportColor from '../GlobalVariables';

export default function Navbar( 
  {size} : {size: number}
) {
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
      <button onClick={goBack}>
        <ArrowLeft color={iconColor} size={size ? size : 30} />
      </button>

      <ChangeThemeButton />
    </div>
  )
}