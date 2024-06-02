import React from 'react'
import { MessageCircle } from 'lucide-react';

import { useTheme } from '../contexts/ThemeProvider';
import Logo from '../components/Logo';
import ChangeThemeButton from '../components/ChangeThemeButton';
import AvatarFallback from '../components/AvatarFallback';

export default function MainPage() {
  const { theme } = useTheme();
  const borderColor = theme === "theme1" ? "gray-900" : "blue-800";

  return (
    <div className={`
      transition duration-[500] 
      bg-blue-950
      flex min-h-screen justify-center
    `}>
      
      {/* Sidebar */}
      <div className={`
        transition duration-[500]
        bg-color-${theme}
        text-color-${theme}
        rounded-3xl m-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5
      `}>
        <Logo />

        <button>
          <MessageCircle size={40} />
        </button>

        <ChangeThemeButton size={40} />

        <AvatarFallback name={"Le Trong Nghia"} />
      </div>

      {/* Friends */}
      <div className={`
        transition duration-[500]
        bg-color-${theme}
        text-color-${theme}
        rounded-3xl m-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5
      `}>
        Friends
      </div>

      {/* Chats */}
      <div className={`
        transition duration-[500]
        bg-color-${theme}
        text-color-${theme}
        rounded-3xl m-1 flex-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5
      `}>
        Chats
      </div>

    </div>
  )
}
