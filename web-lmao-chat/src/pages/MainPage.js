import React from 'react'
import { MessageCircle, UserPlus, Users, Search, Phone, Video, MoreHorizontal, Mic, Laugh, Paperclip, Send } from 'lucide-react';

import { useTheme } from '../contexts/ThemeProvider';
import Logo from '../components/Logo';
import ChangeThemeButton from '../components/ChangeThemeButton';
import AvatarFallback from '../components/AvatarFallback';
import Friend from '../components/Friend';
import Message from '../components/Message';

export default function MainPage() {
  const { theme } = useTheme();
  const borderColor = theme === "theme1" ? "gray-900" : "blue-800";
  const iconSize = 30;

  return (
    <div className={`
      transition duration-[500] 
      bg-blue-950
      flex min-h-screen justify-center
      h-screen
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
          <MessageCircle size={iconSize} />
        </button>

        <ChangeThemeButton size={iconSize} />

        <AvatarFallback name={"Le Trong Nghia"} />
      </div>

      {/* Friends */}
      <div className={`
        transition duration-[500]
        bg-color-${theme}
        text-color-${theme}
        rounded-3xl m-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5
      `}>

        {/* Header */}
        <div className={`flex gap-5 w-full`}>
          <h1 className={`text-3xl`}>Chats</h1>

          <div className={`flex gap-5 ml-auto`}>
            {/* Add Friend */}
            <button className={`ml-auto`} title='Click to add friend'>
              <UserPlus size={iconSize}/>
            </button>

            {/* Create Group */}
            <button className={`ml-auto`} title='Click to create group'>
              <Users size={iconSize} />
            </button>
          </div>
        </div>

        {/* Search Chats */}
        <div className={`flex gap-5`}>
          <div className={`flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder='Search Message'
              // value={password}
              // onChange={handleChangePassword}
              required
              className={`
                transition duration-[500] 
                text-color-${theme}
                bg-color-${theme}
                ${theme ? 'placeholder:text-gray-400' : 'placeholder:text-white'} 
                w-full shadow-sm sm:text-sm select-none focus:outline-none
              `}
            />
          </div>

          <button>
            <Search size={iconSize} />
          </button>
        </div>

        {/* Friends */}
        <div className={`
          flex flex-col w-full gap-5
        `}>

          {/* Friend 1 */}
          <Friend name="Lmao Lmao" newMessage="" />

          {/* Friend 2 */}
          <Friend name="Lmao Lmao 2" newMessage="Hey" />
        </div>
      </div>

      {/* Chats */}
      <div className={`
        transition duration-[500]
        bg-color-${theme}
        text-color-${theme}
        w-full rounded-3xl m-1 flex-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5
      `}>
        
        {/* Header */}
        <div className={`flex gap-5 w-full items-center`}>
          <AvatarFallback />

          <div className={`flex flex-col`}>
            {/* Name */}
            <p className={`font-bold text-xl`}>Lmao Lmao</p>

            {/* New Message */}
            <p>Hey</p>
          </div>

          <div className={`flex gap-5 ml-auto`}>
            {/* Call */}
            <button title='Click to call with current friend'>
              <Phone size={iconSize} />
            </button>

            {/* Video */}
            <button title='Click to call video with current friend'>
              <Video size={iconSize} />
            </button>
            
            {/* Video */}
            <button title='Click to see more information'>
              <MoreHorizontal size={iconSize} />
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div className={`w-full p-1.5 flex flex-col flex-1 gap-1.5 overflow-y-scroll`}>
          {/* Message 1 */}
          <Message name="Le Trong Nghia" dateSent="12/02/2002 9:00:00" content="Hey"/>

          {/* Message 2 */}
          <Message dir="ltr" name="Lmao Lmao" dateSent="12/02/2002 9:00:00" content="Hello"/>

        </div>

        {/* Chat input */}
        <div className={`w-full flex gap-5 items-center`}>

          {/* Search Chats */}
          <div className={`flex flex-1 p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder='Write your message here'
              // value={password}
              // onChange={handleChangePassword}
              required
              className={`
                transition duration-[500] 
                text-color-${theme}
                bg-color-${theme}
                ${theme ? 'placeholder:text-gray-400' : 'placeholder:text-white'} 
                w-full shadow-sm sm:text-sm select-none focus:outline-none
              `}
            />
          </div>

          {/* Emoji */}
          <button title='Click to send audio message'>
            <Mic size={iconSize} />
          </button>

          {/* Emoji */}
          <button title='Click to add emoji to your message'>
            <Laugh size={iconSize}/>
          </button>

          {/* Send file */}
          <button title='Click to send file from your computer'>
            <Paperclip size={iconSize} />
          </button>

          {/* Send */}
          <button title='Click to send your message'>
            <Send size={iconSize} />
          </button>
        </div>
      </div>

    </div>
  )
}
