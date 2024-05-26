/*
  * Used by
  *   pages
  *     SignInPage.js
  *     ErrorPage.js
  *     PhoneNumberInputToForgotPasswordPage.js
  *     PhoneNumberInputToSignInPage.js
*/

import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react'

import { useTheme } from '../contexts/ThemeProvider';

export default function LoadingPage() {
  const [buttonColor, setButtonColor] = useState("white");
  const { theme } = useTheme();

  useEffect(() => {
    theme === "theme1" ? setButtonColor("white") : setButtonColor("black")
  });

  return (
    <div className={`
      bg-color-${theme} h-screen flex flex-col gap-10 items-center justify-center
    `}>
      <LoaderCircle className={`animate-spin`} size={100} color={buttonColor} />
      
      <p className={`text-color-${theme} text-2xl font-bold select-none`}>Loading...</p>
    </div>
  );
};