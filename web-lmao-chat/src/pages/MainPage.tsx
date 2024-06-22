import { BaseSyntheticEvent, ChangeEventHandler, MouseEventHandler, ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageCircle, UserPlus, Users, Settings, LogOut, Search, Phone, Video, MoreHorizontal, SmilePlus, Mic, Paperclip, Send, ImagePlus, Save, X } from "lucide-react";

import AvatarFallback from "../components/AvatarFallback.tsx";
import ChangeThemeButton from "../components/ChangeThemeButton.tsx";
import Friend from "../components/Friend.tsx";
import Logo from "../components/Logo.tsx";
import Message from "../components/Message.tsx";
import useWindowDimensions from "../hooks/useWindowDimensions.js";
import GlobalStyles from "../GlobalStyles.js";
import ExportColor, { GlobalVariables } from "../GlobalVariables.js";
import UserServices from "../services/UserServices.tsx";
import SERVER_RESPONSE from "../interfaces/ServerResponse.tsx";

function Sidebar(
  { direction, backgroundColor, textColor, iconColor, iconSize, user, handleOpenFriends, handleOpenSetting, handleLogOut, handleOpenPersonalInfo } :
  {
    direction: number,
    backgroundColor: string,
    textColor: string,
    iconColor: string,
    iconSize: number,
    user: any,
    handleOpenFriends: MouseEventHandler<HTMLButtonElement>, 
    handleOpenSetting: MouseEventHandler<HTMLButtonElement>,
    handleLogOut: MouseEventHandler<HTMLButtonElement>,
    handleOpenPersonalInfo: MouseEventHandler<HTMLButtonElement>
  }
) {
  return (
    <div
      className={`
        transition duration-[500]
        flex rounded-3xl m-1 p-5 justify-around
      `}
      style={{
        background: backgroundColor, 
        color: textColor
      }}
    >
      <div
        className={`
          ${
            direction === 0 ?
              `flex-col items-center overflow-scroll` :
              `justify-between`
          }
          transition duration-[500]
          flex m-1 text-sm font-medium leading-6 select-none gap-5 w-full
        `}
        style={{
          background: backgroundColor, 
          color: textColor
        }}
      >
      <Logo />

        <button title={`Click to open all message`} onClick={handleOpenFriends}>
          <MessageCircle size={iconSize} color={iconColor} />
        </button>

        <ChangeThemeButton size={iconSize} />

        <button title={`Click to open setting`} onClick={handleOpenSetting}>
          <Settings size={iconSize} color={iconColor} />
        </button>

        <button title={`Click to log out`} onClick={handleLogOut}>
          <LogOut size={iconSize} color={iconColor}/>
        </button>

        <button title={`Click to open personal info`} onClick={handleOpenPersonalInfo}>
          <AvatarFallback name={`${user.firstName} ${user.lastName}`} />
        </button>
      </div>
    </div>
  );
}

function Friends(
  { direction, backgroundColor, textColor, iconColor, iconSize, currentSmallTab, searchFriendPhoneNumber, searchFriend, handleChangeSearchFriendPhoneNumber, handleSearchFriendPhoneNumber, handleAddFriend, handleOpenChats } :
  {
    direction: number,
    backgroundColor: string,
    textColor: string,
    iconColor: string,
    iconSize: number,
    currentSmallTab: string, 
    searchFriendPhoneNumber: string, 
    searchFriend: any, 
    handleChangeSearchFriendPhoneNumber: ChangeEventHandler<HTMLInputElement>, 
    handleSearchFriendPhoneNumber: () => any, 
    handleAddFriend: MouseEventHandler<HTMLButtonElement>, 
    handleOpenChats: MouseEventHandler<HTMLButtonElement>
  } 
) {
  return (
    <div
      className={`
        transition duration-[500]
        rounded-3xl m-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5 overflow-y-scroll min-w-min flex-1 
      `}
      style={{
        background: backgroundColor, 
        color: textColor
      }}
    >

      {/* Header */}
      <div className={`flex gap-5 w-full items-center`}>
        <h1 className={`text-3xl`}>Friends</h1>

        <div className={`flex gap-5 ml-auto`}>
          {/* Add Friend */}
          <button title={`Click to add friend`} className={`ml-auto`} onClick={handleAddFriend}>
            <UserPlus id={`button_UserPlus`} size={iconSize} color={iconColor} />
            <X id={`button_X`} size={iconSize} color={iconColor} className={`hidden`} />
          </button>

          {/* Create Group */}
          <button title={`Click to create group`} className={`ml-auto`}>
            <Users size={iconSize} color={iconColor} />
          </button>
        </div>
      </div>

      {
        currentSmallTab === `LIST_FRIENDS` ? 
          (
            <>
              {/* Search Chats */}
              <div className={`
                ${direction === 0 ? `` : `w-full`}
                flex gap-5
              `}>
                <div className={`
                  ${direction === 0 ? `` : `w-full`}
                  flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5
                `}>
                  <input
                    name={`searchMessage`}
                    type={`text`}
                    autoComplete={``}
                    placeholder={`Search Message`}
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

                <button title={`Click to search message`}>
                  <Search size={iconSize} color={iconColor} />
                </button>
              </div>

              {/* Friends */}
              <div className={`
                flex-1 flex flex-col w-full gap-5 overflow-scroll
              `}>

                {/* Friend 1 */}
                <button title={`Open Conversation`} onClick={handleOpenChats}>
                  <Friend name={`Lmao Lmao`} newMessage={``} />
                </button>

                {/* Friend 2 */}
                <button title={`Open Conversation`} onClick={handleOpenChats}>
                  <Friend name={`Lmao Lmao 2`} newMessage={``} />
                </button>

                {/* Friend 1 */}
                <button title={`Open Conversation`} onClick={handleOpenChats}>
                  <Friend name={`Lmao Lmao 3`} newMessage={``} />
                </button>

                {/* Friend 2 */}
                <button title={`Open Conversation`} onClick={handleOpenChats}>
                  <Friend name={`Lmao Lmao`} newMessage={``} />
                </button>

                {/* Friend 1 */}
                <button title={`Open Conversation`} onClick={handleOpenChats}>
                  <Friend name={`Lmao Lmao`} newMessage={``} />
                </button>

                {/* Friend 2 */}
                <button title={`Open Conversation`} onClick={handleOpenChats}>
                  <Friend name={`Lmao Lmao`} newMessage={``} />
                </button>


              </div>
            </>
          ) : (
            <>
              {/* Search Friend */}
              <div className={`
                ${direction === 0 ? `` : `w-full`}
                flex gap-5
              `}>
                <div className={`
                  ${direction === 0 ? `` : `w-full`}
                  flex p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5
                `}>
                  <input
                    name={`searchFriend`}
                    type={`text`}
                    autoComplete={``}
                    placeholder={`Search Friend`}
                    value={searchFriendPhoneNumber}
                    onChange={handleChangeSearchFriendPhoneNumber}
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

                <button title={`Click to search message`} onClick={handleSearchFriendPhoneNumber}>
                  <Search size={iconSize} color={iconColor} />
                </button>
              </div>


              {/* Searched Friend */}
              <div className={`
                flex-1 flex flex-col w-full gap-5 overflow-scroll
              `}>
                {
                  searchFriend !== null ?
                    (
                      <button title={`Open Conversation`} onClick={handleOpenChats}>
                        <Friend name={`${searchFriend.firstName} ${searchFriend.lastName}`} newMessage={`${searchFriend.phoneNumber}`} />
                      </button>
                    ) : (
                      <>No user found</>    
                    )
                }

              </div>
            </>
          )
      }

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
        rounded-3xl m-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5 overflow-y-scroll
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
          <button title={`Click to call with current friend`}>
            <Phone size={iconSize} color={iconColor} />
          </button>

          {/* Video */}
          <button title={`Click to call video with current friend`}>
            <Video size={iconSize} color={iconColor} />
          </button>
          
          {/* Video */}
          <button title={`Click to see more information`}>
            <MoreHorizontal size={iconSize} color={iconColor} />
          </button>
        </div>
      </div>

      {/* Chat History */}
      <div className={`w-full p-1.5 flex flex-col flex-1 gap-1.5 overflow-y-scroll`}>
        {/* Message 1 */}
        <Message name={`Le Trong Nghia`} dateSent={`${new Date().toLocaleString()}`} content={`Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey`} />

        {/* Message 2 */}
        <Message dir={`ltr`} name={`Lmao Lmao`} dateSent={`${new Date().toLocaleString()}`} content={`Hello`} />

        {/* Message 1 */}
        <Message name={`Le Trong Nghia`} dateSent={`${new Date().toLocaleString()}`} content={`Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey`} />

        {/* Message 2 */}
        <Message dir={`ltr`} name={`Lmao Lmao`} dateSent={`${new Date().toLocaleString()}`} content={`Hello`} />

        {/* Message 1 */}
        <Message name={`Le Trong Nghia`} dateSent={`${new Date().toLocaleString()}`} content={`Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey Hey`} />

        {/* Message 2 */}
        <Message dir={`ltr`} name={`Lmao Lmao`} dateSent={`${new Date().toLocaleString()}`} content={`Hello`} />


      </div>

      {/* Chat input */}
      <div className={`w-full flex gap-5 items-center`}>

        {/* Search Chats */}
        <div className={`flex flex-1 p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5`}>
          <input
            name={`message`}
            type={`text`}
            autoComplete={``}
            placeholder={`Write your message here`}
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
              colorScheme: `dark`
            }}
          />
        </div>

        {/* Emoji */}
        <button title={`Click to add emoji to your message`}>
          <SmilePlus size={iconSize} color={iconColor} />
        </button>

        {/* Voice */}
        <button title={`Click to send audio message`}>
          <Mic size={iconSize} color={iconColor} />
        </button>

        {/* Send file */}
        <button title={`Click to send file from your computer`}>
          <Paperclip size={iconSize} color={iconColor} />
        </button>

        {/* Send */}
        <button title={`Click to send your message`}>
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
  const styles = GlobalStyles();

  return (
    <div
      className={`
        transition duration-[500]
        w-full rounded-3xl m-1 flex flex-1 flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5 overflow-scroll
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

        <div className={`flex gap-5`}>

          {/* First Column */}
          <div className={`flex flex-col items-center justify-between`}>

            <div className={`flex flex-col items-center gap-5`}>
              <AvatarFallback name={`${user.firstName} ${user.lastName}`} size={100} />

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
            <div>

              {/* First Name label */}
              <label
                htmlFor={`firstName`}
                className={`
                  transition duration-[500] 
                  block text-sm font-medium leading-6 select-none
                `}
                style={{
                  color: textColor
                }}
              >
                First Name
              </label>

              {/* First Name input */}
              <div className={`mt-2`}>
                <input
                  id={`firstName`}
                  name={`firstName`}
                  type={`text`}
                  autoComplete={`name`}
                  placeholder={`Your First Name`}
                  // value={phoneNumber}
                  // onChange={handleChangePhoneNumber}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    block w-full rounded-md border-0 p-1.5 ring-1 ring-gray-300 sm:text-sm sm:leading-6 select-none
                  `}
                  style={
                    styles.input
                  }
                />
              </div>
            </div>

            {/* Last Name */}
            <div>

              {/* Last Name label */}
              <label
                htmlFor={`lastName`}
                className={`
                  transition duration-[500] 
                  block text-sm font-medium leading-6 select-none
                `}
                style={{
                  color: textColor
                }}
              >
                Last Name
              </label>

              {/* Last Name input */}
              <div className={`mt-2`}>
                <input
                  id={`lastName`}
                  name={`lastName`}
                  type={`text`}
                  autoComplete={`name`}
                  placeholder={`Your Last Name`}
                  // value={phoneNumber}
                  // onChange={handleChangePhoneNumber}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    block w-full rounded-md border-0 p-1.5 ring-1 ring-gray-300 sm:text-sm sm:leading-6 select-none
                  `}
                  style={
                    styles.input
                  }
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>

              {/* Phone Number label */}
              <label
                htmlFor={`phoneNumber`}
                className={`
                  transition duration-[500] 
                  block text-sm font-medium leading-6 select-none
                `}
                style={{
                  color: textColor
                }}
              >
                Phone Number
              </label>

              {/* Phone Number input */}
              <div className={`mt-2`}>
                <input
                  id={`phoneNumber`}
                  name={`phoneNumber`}
                  type={`tel`}
                  autoComplete={`tel`}
                  placeholder={`Your Phone Number`}
                  // value={phoneNumber}
                  // onChange={handleChangePhoneNumber}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    block w-full rounded-md border-0 p-1.5 ring-1 ring-gray-300 sm:text-sm sm:leading-6 select-none
                  `}
                  style={
                    styles.input
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div>

              {/* Email label */}
              <label
                htmlFor={`email`}
                className={`
                  transition duration-[500] 
                  block text-sm font-medium leading-6 select-none
                `}
                style={{
                  color: textColor
                }}
              >
                Email
              </label>

              {/* Email input */}
              <div className={`mt-2`}>
                <input
                  id={`email`}
                  name={`email`}
                  type={`email`}
                  autoComplete={`email`}
                  placeholder={`Your Email`}
                  // value={phoneNumber}
                  // onChange={handleChangePhoneNumber}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    block w-full rounded-md border-0 p-1.5 ring-1 ring-gray-300 sm:text-sm sm:leading-6 select-none
                  `}
                  style={
                    styles.input
                  }
                />
              </div>
            </div>

            {/* Address */}
            <div>

              {/* Address label */}
              <label
                htmlFor={`address`}
                className={`
                  transition duration-[500] 
                  block text-sm font-medium leading-6 select-none
                `}
                style={{
                  color: textColor
                }}
              >
                Address
              </label>

              {/* Address input */}
              <div className={`mt-2`}>
                <input
                  id={`address`}
                  name={`address`}
                  type={`text`}
                  autoComplete={`street-address`}
                  placeholder={`Your Address`}
                  // value={phoneNumber}
                  // onChange={handleChangePhoneNumber}
                  required
                  className={`
                    transition duration-[500] 
                    placeholder:text-gray-400
                    block w-full rounded-md border-0 p-1.5 ring-1 ring-gray-300 sm:text-sm sm:leading-6 select-none
                  `}
                  style={
                    styles.input
                  }
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
  const [currentTab, setCurrentTab] = useState(`FRIENDS`);
  const [currentSmallTab, setCurrentSmallTab] = useState(`LIST_FRIENDS`);
  const [searchFriendPhoneNumber, setSearchFriendPhoneNumber] = useState(``);
  const [searchPhoneNumberStatus, setSearchPhoneNumberStatus] = useState<string | null>(``);
  const [searchFriend, setSearchFriend] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state ? state.user.data ? state.user.data : {} : {};
  const iconSize = 30;
  const { width, height }: {
    width: number, 
    height: number
  } = useWindowDimensions();
  let direction: number;
  const socket = GlobalVariables.socket;
  const status = GlobalVariables.status;

  const {
    backgroundColor,
    chatBackgroundColor, 
    iconColor,
    textColor,
  } = ExportColor();

  useEffect(() => {
    return () => {
      socket.emit("User Leave", { data: user.phoneNumber });
    }
  });

  const handleChangeSearchFriendPhoneNumber = (e: BaseSyntheticEvent) => {
    setSearchFriendPhoneNumber(e.target.value);
  }

  const handleSearchFriendPhoneNumber = async () => {
    setSearchFriend(null);

    if (searchFriendPhoneNumber === ``)
      return;
    
    const respsone: SERVER_RESPONSE = await UserServices.getUser(searchFriendPhoneNumber);

    setSearchFriendPhoneNumber(``);

    switch (respsone.status) {
      case status.INTERNAL_SERVER_ERROR:
        break;
      case status.NO_CONTENT:
        break;
      case status.OK:
        setSearchFriend(respsone.data.data);
        break;
    }
  }

  const handleOpenFriends = () => {
    setCurrentTab(`FRIENDS`);
  }

  const handleOpenChats = () => {
    setCurrentTab(`CHATS`);
  }

  const handleOpenSetting = () => {
    setCurrentTab(`SETTING`);
  }

  const handleOpenPersonalInfo = () => {
    setCurrentTab(`PERSONAL_INFO`);
  }

  const handleAddFriend = () => {
    const button_X: HTMLButtonElement | null = document.querySelector(`#button_X`)!;
    const button_UserPlus: HTMLButtonElement | null = document.querySelector(`#button_UserPlus`)!;
  
    if (currentSmallTab === `LIST_FRIENDS`) {
      setCurrentSmallTab(`ADD_FRIEND`);
      button_X.style.display = `block`;
      button_UserPlus.style.display = `none`;
    }
    else {
      setCurrentSmallTab(`LIST_FRIENDS`);
      setSearchFriend(null);
      button_X.style.display = `none`;
      button_UserPlus.style.display = `block`;
    }
  }

  const handleLogOut = () => {
    if (window.confirm(`Are you sure you want to log out?`))
      navigate(`/`, { state: { user: null} });
  }

  if (width >= height)
    direction = 0;
  else
    direction = 1;

  return (
    <div
      className={`
        ${
          direction === 0 ?
            `` : `flex-col-reverse`
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
        handleOpenFriends={handleOpenFriends}
        handleLogOut={handleLogOut}
        handleOpenSetting={handleOpenSetting} handleOpenPersonalInfo={handleOpenPersonalInfo}
      />

      {
        direction === 0 ?
          currentTab === `CHATS` || currentTab === 'FRIENDS' ?
            ([
              <Friends
                key={`Friends`}
                direction={direction}
                backgroundColor={backgroundColor}
                textColor={textColor}
                iconColor={iconColor}
                iconSize={iconSize}
                currentSmallTab={currentSmallTab}
                searchFriendPhoneNumber={searchFriendPhoneNumber}
                searchFriend={searchFriend}
                handleChangeSearchFriendPhoneNumber={handleChangeSearchFriendPhoneNumber}
                handleSearchFriendPhoneNumber={handleSearchFriendPhoneNumber}
                handleAddFriend={handleAddFriend}
                handleOpenChats={handleOpenChats}
              />, 
              <Chats
                key={`Chats`}
                backgroundColor={backgroundColor}
                textColor={textColor}
                iconColor={iconColor}
                iconSize={iconSize}
              />
            ]) :
            <PersonalInfor
              backgroundColor={backgroundColor}
              textColor={textColor}
              iconColor={iconColor}
              iconSize={iconSize}
              user={user}
            />
          : 
          currentTab === `FRIENDS` ?
            <Friends
              direction={direction}
              backgroundColor={backgroundColor}
              textColor={textColor}
              iconColor={iconColor}
              iconSize={iconSize}
              currentSmallTab={currentSmallTab}
              searchFriendPhoneNumber={searchFriendPhoneNumber}
              searchFriend={searchFriend}
              handleChangeSearchFriendPhoneNumber={handleChangeSearchFriendPhoneNumber}
              handleSearchFriendPhoneNumber={handleSearchFriendPhoneNumber}
              handleAddFriend={handleAddFriend}
              handleOpenChats={handleOpenChats}
            /> :
            currentTab === `CHATS` ?
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
      }

    </div>
  )
}
