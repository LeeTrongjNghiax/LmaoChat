import { useTheme } from '../contexts/ThemeProvider';
import ChangeThemeButton from './ChangeThemeButton';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Navbar({ size }) {
  const [buttonColor, setButtonColor] = useState("white");
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    theme === "theme1" ? setButtonColor("white") : setButtonColor("black")
  });

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className={`
      transition duration-[500]
      w-full bg-color-${theme} p-3 lg:p-3 flex gap-3
    `}>
      <ArrowLeft onClick={goBack} color={buttonColor} size={size ? size : 30} className={`
        cursor-pointer
      `} />

      <ChangeThemeButton themeToChange="theme1" />
    </div>
  )
}
