import { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Chats, Friends, PersonalInfor, Sidebar } from "./components";
import { useWindowDimensions } from "./hooks";

import ExportColor, { GlobalVariables } from "../../GlobalVariables.js";
import { USER_INTERFACE } from './interfaces'

export default function MainPage(): ReactElement {
  const [currentTab, setCurrentTab] = useState(`FRIENDS`);
  const [currentFriend, setCurrentFriend] = useState<USER_INTERFACE | null>(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state ? state.user.data ? state.user.data : {} : {};
  const { width, height }: {
    width: number, 
    height: number
  } = useWindowDimensions();
  const {
    chatBackgroundColor, 
  } = ExportColor();
  let direction: number;

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
    user={user}
    handleOpenFriends={handleOpenFriends}
    handleLogOut={handleLogOut}
    handleOpenSetting={handleOpenSetting} handleOpenPersonalInfo={handleOpenPersonalInfo}
  />

  const friendsTab = <Friends
    key={`Friends`}
    direction={direction}
    user={user}
    handleOpenChats={handleOpenChats}
  />

  const chatsTab = <Chats
    key={`Chats`}
    user={user}
    currentFriend={currentFriend}
  />

  const personalInfoTab = <PersonalInfor user={user} />

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
