import { MouseEventHandler, ReactElement, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, UserPlus, Users, Settings, LogOut, Search, Phone, Video, MoreHorizontal, SmilePlus, Mic, Paperclip, Send, ImagePlus, Save } from 'lucide-react';

import AvatarFallback from '../components/AvatarFallback.tsx';
import ChangeThemeButton from '../components/ChangeThemeButton.tsx';
import Friend from '../components/Friend.tsx';
import Logo from '../components/Logo.tsx';
import Message from '../components/Message.tsx';
import ExportColor from '../GlobalVariables.js';

import useWindowDimensions from '../hooks/useWindowDimensions.js';

function Sidebar(
  { direction, backgroundColor, textColor, iconColor, iconSize, user, handleOpenSetting, handleLogOut, handleOpenPersonalInfo } :
  {
    direction: number,
    backgroundColor: string,
    textColor: string,
    iconColor: string,
    iconSize: number,
    user: any,
    handleOpenSetting: MouseEventHandler<HTMLButtonElement>,
    handleLogOut: MouseEventHandler<HTMLButtonElement>,
    handleOpenPersonalInfo: MouseEventHandler<HTMLButtonElement>
  }
) {
  return (
    <div
      className={`
        flex rounded-3xl m-1 p-5
      `}
      style={{
        background: backgroundColor, 
        color: textColor
      }}
    >
      <div
        className={`
          ${
            direction == 0 ?
              'flex-col items-center overflow-y-scroll' :
              'justify-center'
          }
          transition duration-[500]
          flex m-1 text-sm font-medium leading-6 select-none gap-5 
        `}
        style={{
          background: backgroundColor, 
          color: textColor
        }}
      >
      <Logo />

        <button title='Click to open all message'>
          <MessageCircle size={iconSize} color={iconColor} />
        </button>

        <ChangeThemeButton size={iconSize} />

        <button title='Click to open setting' onClick={handleOpenSetting}>
          <Settings size={iconSize} color={iconColor} />
        </button>

        <button title='Click to log out' onClick={handleLogOut}>
          <LogOut size={iconSize} color={iconColor}/>
        </button>

        <button onClick={handleOpenPersonalInfo}>
          <AvatarFallback name={user.firstName + " " + user.lastName} />
        </button>
      </div>
    </div>
  );
}

function Friends(
  { direction, backgroundColor, textColor, iconColor, iconSize, handleOpenChats } :
  {
    direction: number,
    backgroundColor: string,
    textColor: string,
    iconColor: string,
    iconSize: number,
    handleOpenChats: MouseEventHandler<HTMLButtonElement>
  } 
) {
  return (
    <div
      className={`
        transition duration-[500]
        rounded-3xl m-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5 overflow-scroll
      `}
      style={{
        background: backgroundColor, 
        color: textColor
      }}
    >

      {/* Header */}
      <div className={`flex gap-5 w-full items-center`}>
        <h1 className={`text-3xl`}>Chats</h1>

        <div className={`flex gap-5 ml-auto`}>
          {/* Add Friend */}
          <button className={`ml-auto`} title='Click to add friend'>
            <UserPlus size={iconSize} color={iconColor} />
          </button>

          {/* Create Group */}
          <button className={`ml-auto`} title='Click to create group'>
            <Users size={iconSize} color={iconColor} />
          </button>
        </div>
      </div>

      {/* Search Chats */}
      <div className={`
        ${direction == 0 ? '' : 'w-full'}
        flex gap-5
      `}>
        <div className={`
          ${direction == 0 ? '' : 'w-full'}
          flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5
        `}>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder='Search Message'
            // value={password}
            // onChange={handleChangePassword}
            required
            className={`
              transition duration-[500] 
              placeholder:text-gray-400
              w-full sm:text-sm select-none focus:outline-none
            `}
            style={{
              background: backgroundColor, 
              color: textColor
            }}
          />
        </div>

        <button>
          <Search size={iconSize} color={iconColor} />
        </button>
      </div>

      {/* Friends */}
      <div className={`
        flex-1 flex flex-col w-full gap-5 overflow-scroll
      `}>

        {/* Friend 1 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>

        {/* Friend 2 */}
        <button onClick={handleOpenChats}>
          <Friend name="Lmao Lmao" newMessage="" />
        </button>
      </div>
    </div>
  );
}

function Chats(
  { backgroundColor, textColor, iconColor, iconSize } :
  {
    backgroundColor: string,
    textColor: string,
    iconColor: string,
    iconSize: number
  }
) {
  return (
    <div
      className={`
        transition duration-[500]
        w-full rounded-3xl m-1 flex-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5
      `}
      style={{
        background: backgroundColor, 
        color: textColor
      }}
    >
      
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
            <Phone size={iconSize} color={iconColor} />
          </button>

          {/* Video */}
          <button title='Click to call video with current friend'>
            <Video size={iconSize} color={iconColor} />
          </button>
          
          {/* Video */}
          <button title='Click to see more information'>
            <MoreHorizontal size={iconSize} color={iconColor} />
          </button>
        </div>
      </div>

      {/* Chat History */}
      <div className={`w-full p-1.5 flex flex-col flex-1 gap-1.5 overflow-y-scroll`}>
        {/* Message 1 */}
        <Message name="Le Trong Nghia" dateSent="12/02/2002 9:00:00" content="Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey "/>

        {/* Message 2 */}
        <Message dir="ltr" name="Lmao Lmao" dateSent="12/02/2002 9:00:00" content="Hello"/>

        {/* Message 1 */}
        <Message name="Le Trong Nghia" dateSent="12/02/2002 9:00:00" content="Hey"/>

        {/* Message 2 */}
        <Message dir="ltr" name="Lmao Lmao" dateSent="12/02/2002 9:00:00" content="Hello"/>

        {/* Message 1 */}
        <Message name="Le Trong Nghia" dateSent="12/02/2002 9:00:00" content="Hey"/>

        {/* Message 2 */}
        <Message dir="ltr" name="Lmao Lmao" dateSent="12/02/2002 9:00:00" content="Hello"/>

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
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder='Write your message here'
            // value={password}
            // onChange={handleChangePassword}
            required
            className={`
              transition duration-[500] 
              placeholder:text-gray-400
              w-full sm:text-sm select-none focus:outline-none
            `}
            style={{
              background: backgroundColor, 
              color: textColor, 
              colorScheme: "dark"
            }}
          />
        </div>

        {/* Emoji */}
        <button title='Click to add emoji to your message'>
          <SmilePlus size={iconSize} color={iconColor} />
        </button>

        {/* Voice */}
        <button title='Click to send audio message'>
          <Mic size={iconSize} color={iconColor} />
        </button>

        {/* Send file */}
        <button title='Click to send file from your computer'>
          <Paperclip size={iconSize} color={iconColor} />
        </button>

        {/* Send */}
        <button title='Click to send your message'>
          <Send size={iconSize} color={iconColor} />
        </button>
      </div>
    </div>
  );
}

function PersonalInfor(
  { backgroundColor, textColor, iconColor, iconSize, user } :
  {
    backgroundColor: string,
    textColor: string,
    iconColor: string,
    iconSize: number,
    user: any
  }

) {
  return (
    <div
      className={`
        transition duration-[500]
        w-full rounded-3xl m-1 flex-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5
      `}
      style={{
        background: backgroundColor, 
        color: textColor
      }}
    >

      {/* Header */}
      <div className={`flex flex-col gap-5 w-full`}>
        
        {/* Title */}
        <h1 className={`text-3xl`}>Personal Information</h1>

        <div className={`flex gap-32`}>

          {/* First Column */}
          <div className={`flex flex-col items-center justify-between`}>

            <div className={`flex flex-col items-center gap-5`}>
              <AvatarFallback name={user.firstName + " " + user.lastName} size={100} />

              <button className={`flex gap-1.5`}>
                <ImagePlus size={iconSize} color={iconColor} />
                
                <p>Change Avatar</p>
              </button>
            </div>

            <button className={`flex gap-1.5 bg-green-700 p-1.5 rounded-lg`}>
              <Save size={iconSize} color={iconColor} />

              <p>Save all changes</p>
            </button>
          </div>
                
          {/* Second Column */}
          <div className={`flex-1 flex flex-col gap-5`}>

            {/* First Name */}
            <div className={`flex items-center`}>
              <p className={`w-36`}>First name</p>
                    
              <div className={`flex-1 flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder=''
                  // value={}
                  // onChange={}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    w-full sm:text-sm select-none focus:outline-none
                  `}
                  style={{
                    background: backgroundColor, 
                    color: textColor, 
                    colorScheme: "dark"
                  }}
                />
              </div>
            </div>
                  
            {/* Last Name */}
            <div className={`flex items-center`}>
              <p className={`w-36`}>Last name</p>
                    
              <div className={`flex-1 flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder=''
                  // value={}
                  // onChange={}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    w-full sm:text-sm select-none focus:outline-none
                  `}
                  style={{
                    background: backgroundColor, 
                    color: textColor, 
                    colorScheme: "dark"
                  }}
                />
              </div>
            </div>
                  
            {/* Phone Number */}
            <div className={`flex items-center`}>
              <p className={`w-36`}>Phone Number</p>
                    
              <div className={`flex-1 flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder=''
                  // value={}
                  // onChange={}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    w-full sm:text-sm select-none focus:outline-none
                  `}
                  style={{
                    background: backgroundColor, 
                    color: textColor, 
                    colorScheme: "dark"
                  }}
                />
              </div>
            </div>
                  
            {/* Email */}
            <div className={`flex items-center`}>
              <p className={`w-36`}>Email</p>
                    
              <div className={`flex-1 flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder=''
                  // value={}
                  // onChange={}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    w-full sm:text-sm select-none focus:outline-none
                  `}
                  style={{
                    background: backgroundColor, 
                    color: textColor, 
                    colorScheme: "dark"
                  }}
                />
              </div>
            </div>
                  
            {/* Address */}
            <div className={`flex items-center`}>
              <p className={`w-36`}>Address</p>
                    
              <div className={`flex-1 flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder=''
                  // value={}
                  // onChange={}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    w-full sm:text-sm select-none focus:outline-none
                  `}
                  style={{
                    background: backgroundColor, 
                    color: textColor, 
                    colorScheme: "dark"
                  }}
                />
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default function MainPage(): ReactElement {
  const [currentTab, setCurrentTab] = useState("CHATS");
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state ? state.user ? state.user : {} : {};
  const iconSize = 30;
  const { width, height }: {
    width: number, 
    height: number
  } = useWindowDimensions();
  let direction: number;

  const {
    backgroundColor,
    chatBackgroundColor, 
    iconColor,
    textColor,
  } = ExportColor();

  const handleOpenChats = () => {
    setCurrentTab("CHATS");
  }

  const handleOpenSetting = () => {
    setCurrentTab("SETTING");
  }

  const handleOpenPersonalInfo = () => {
    setCurrentTab("PERSONAL_INFO");
  }

  const handleLogOut = () => {
    if (window.confirm("Are you sure you want to log out?"))
      navigate("/", { state: { user: null} });
  }

  if (width >= height)
    direction = 0;
  else
    direction = 1;

  return (
    <div
      className={`
        ${
          direction == 0 ?
            '' : 'flex-col-reverse'
        }
        transition duration-[500] 
        flex min-h-screen justify-center
        h-screen
      `}
      style={{
        background: chatBackgroundColor
      }}
    >

      <Sidebar
        direction={direction}
        backgroundColor={backgroundColor}
        textColor={textColor}
        iconColor={iconColor}
        iconSize={iconSize}
        user={user}
        handleLogOut={handleLogOut}
        handleOpenSetting={handleOpenSetting} handleOpenPersonalInfo={handleOpenPersonalInfo}
      />

      <Friends
        direction={direction}
        backgroundColor={backgroundColor}
        textColor={textColor}
        iconColor={iconColor}
        iconSize={iconSize}
        handleOpenChats={handleOpenChats}
      />

      {
        direction == 0 ?
          currentTab === "CHATS" ?
            <Chats
              backgroundColor={backgroundColor}
              textColor={textColor}
              iconColor={iconColor}
              iconSize={iconSize}
            /> :
            <PersonalInfor
              backgroundColor={backgroundColor}
              textColor={textColor}
              iconColor={iconColor}
              iconSize={iconSize}
              user={user}
            />
          : <></>
      }

    </div>
  )
}
