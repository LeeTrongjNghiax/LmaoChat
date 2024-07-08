import { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImagePlus, Save  } from "lucide-react";

import { AvatarFallback, Chats, Friends, Sidebar } from "./components";
import { useWindowDimensions } from "./hooks";

import GlobalStyles from "../../GlobalStyles.js";
import ExportColor, { GlobalVariables } from "../../GlobalVariables.js";

function PersonalInfor(
  { backgroundColor, textColor, iconColor, iconSize, user } :
  {
    backgroundColor: string,
    textColor: string,
    iconColor: string,
    iconSize: number,
    user: USER_INTERFACE
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

interface USER_INTERFACE {
  roomId?: string, 
  phoneNumber: string, 
  firstName: string, 
  lastName: string, 
  requestSends: string[], 
  requestGets: string[], 
  friends: FRIEND[], 
}

interface FRIEND {
  phoneNumber: string, 
  relationshipId: string
}

export default function MainPage(): ReactElement {
  const [currentTab, setCurrentTab] = useState(`FRIENDS`);
  const [currentFriend, setCurrentFriend] = useState<USER_INTERFACE | null>(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state ? state.user.data ? state.user.data : {} : {};
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

  const socket = GlobalVariables.socket;

  useEffect(() => {
    socket.emit(`User Join`, user.phoneNumber);

    return () => {
      socket.emit("User Leave", user.phoneNumber);
    }
  });

  const handleOpenFriends = () => {
    setCurrentTab(`FRIENDS`);
  }

  const handleOpenChats = (friend: USER_INTERFACE) => {
    setCurrentFriend(friend);
    setCurrentTab(`CHATS`);
  }

  const handleOpenSetting = () => {
    setCurrentTab(`SETTING`);
  }

  const handleOpenPersonalInfo = () => {
    setCurrentTab(`PERSONAL_INFO`);
  }

  const handleLogOut = () => {
    if (window.confirm(`Are you sure you want to log out?`))
      navigate(`/`, { state: { user: null} });
  }

  if (width >= height)
    direction = 0;
  else
    direction = 1;

  const sideBarTab = <Sidebar
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

  const friendsTab = <Friends
    key={`Friends`}
    direction={direction}
    backgroundColor={backgroundColor}
    textColor={textColor}
    iconColor={iconColor}
    iconSize={iconSize}
    user={user}
    handleOpenChats={handleOpenChats}
  />

  const chatsTab = <Chats
    key={`Chats`}
    backgroundColor={backgroundColor}
    textColor={textColor}
    iconColor={iconColor}
    iconSize={iconSize}
    user={user}
    currentFriend={currentFriend}
  />

  const personalInfoTab = <PersonalInfor
    backgroundColor={backgroundColor}
    textColor={textColor}
    iconColor={iconColor}
    iconSize={iconSize}
    user={user}
  />

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
      {sideBarTab}

      {
        direction === 0 ?

          currentTab === `CHATS` || currentTab === 'FRIENDS' ?
            ([friendsTab, chatsTab]) :
            personalInfoTab : 
          
          currentTab === `FRIENDS` ?
            friendsTab :
            currentTab === `CHATS` ?
              chatsTab : personalInfoTab
      }

    </div>
  )
}
