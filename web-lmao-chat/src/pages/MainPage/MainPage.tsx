import { ReactElement, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Chats, Friends, PersonalInfor, Sidebar } from "./components";
import { useWindowDimensions } from "./hooks";

import ExportColor, { GlobalVariables } from "../../GlobalVariables.js";
import { FRIEND_INTERFACE, USER_INTERFACE } from './interfaces'
import { SERVER_RESPONSE } from "../../interfaces";
import { UserServices } from "../../services";

export default function MainPage(): ReactElement {
  console.log("%cMain", "color: red; fontWeight: bold");

  const [currentTab, setCurrentTab] = useState(`FRIENDS`);
  const [currentFriend, setCurrentFriend] = useState<USER_INTERFACE | null>(null);
  const [friendRequestSends, setFriendRequestSends] = useState<USER_INTERFACE[]>([]);
  const [friendRequestGets, setFriendRequestGets] = useState<USER_INTERFACE[]>([]);
  const [friends, setFriends] = useState<USER_INTERFACE[]>([]);
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
  const status = GlobalVariables.status;
  let direction: number;

  const socket = GlobalVariables.socket;

  const phoneNumbersToUsers = async (arr: string[]) => {
    let result: USER_INTERFACE[] = [];
    
    for (let i = 0; i < arr.length; i++) {
      const response: SERVER_RESPONSE = await UserServices.getUser(arr[i]);

      result.push(response.data.data);
    }

    return result;
  }

  const phoneNumbersToFriends = async (arr: [FRIEND_INTERFACE]) => {
    let result: USER_INTERFACE[] = [];

    for (let i = 0; i < arr.length; i++) {
      const response: SERVER_RESPONSE = await UserServices.getUser(arr[i].phoneNumber);

      const friendWithId: USER_INTERFACE = response.data.data;
      friendWithId.roomId = arr[i].relationshipId;

      result.push(friendWithId);
    }

    return result;
  }

  useEffect(() => {
    socket.emit(`User Join`, user.phoneNumber);

    socket.on(`Server: ${user.phoneNumber} get updated`, async () => {
      console.log(`${user.phoneNumber} get updated`);

      const response: SERVER_RESPONSE = await UserServices.getUser(user.phoneNumber);

      switch (response.status) {
        case status.INTERNAL_SERVER_ERROR:
          alert`Internal Server Error`;
          break;
        case status.NO_CONTENT:
          alert`No content`;
          break;
        case status.OK:
          let requestSends = await phoneNumbersToUsers(response.data.data.requestSends);
          setFriendRequestSends(requestSends);

          let requestGets = await phoneNumbersToUsers(response.data.data.requestGets);
          setFriendRequestGets(requestGets);

          let listFriends = await phoneNumbersToFriends(response.data.data.friends);
          setFriends(listFriends);

          for (let i = 0; i < response.data.data.friends.length; i++) {
            console.log(`Create Room ${response.data.data.friends[i].relationshipId}`);
          }

          break;
      }
    });

    return () => {
      console.log("Leave Main Page");
      
      socket.emit("User Leave", user.phoneNumber);
    }
  }, [socket]);

  const handleOpenFriends = useCallback(
    () => {
      setCurrentTab(`FRIENDS`);
    }, 
    [setCurrentTab]
  )

  const handleOpenChats = useCallback(
    (friend: USER_INTERFACE) => {
      setCurrentFriend(friend);
      setCurrentTab(`CHATS`);
    }, 
    [setCurrentFriend, setCurrentTab]
  )

  const handleOpenSetting = useCallback(
    () => {
      setCurrentTab(`SETTING`);
    }, 
    [setCurrentTab]
  )

  const handleOpenPersonalInfo = useCallback(
    () => {
      setCurrentTab(`PERSONAL_INFO`);
    }, 
    [setCurrentTab]
  )

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
    handleOpenSetting={handleOpenSetting}
    handleOpenPersonalInfo={handleOpenPersonalInfo}
  />

  const friendsTab = <Friends
    key={`Friends`}
    direction={direction}
    user={user}
    friendRequestSends={friendRequestSends}
    setFriendRequestSends={setFriendRequestSends}
    friendRequestGets={friendRequestGets}
    setFriendRequestGets={setFriendRequestGets}
    friends={friends}
    setFriends={setFriends}
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
