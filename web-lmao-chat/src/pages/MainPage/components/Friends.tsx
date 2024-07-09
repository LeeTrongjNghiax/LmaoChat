import { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserPlus, UserSearch, Users, Search,  User, ListEnd, ListStart, Check, X } from "lucide-react";

import { UserServices } from "../../../services";
import { SERVER_RESPONSE } from "../../../interfaces";
import { Friend, NotificationBadge } from "./";

import { FRIEND_INTERFACE, USER_INTERFACE } from "../interfaces";
import ExportColor, { GlobalVariables } from "../../../GlobalVariables";

function Friends(
  { direction, user, friendRequestSends, setFriendRequestSends, friendRequestGets, setFriendRequestGets, friends, setFriends, handleOpenChats } :
  {
    direction: number,
      user: USER_INTERFACE, 
    friendRequestSends: USER_INTERFACE[], 
    setFriendRequestSends: Dispatch<SetStateAction<USER_INTERFACE[]>>, 
    friendRequestGets: USER_INTERFACE[], 
    setFriendRequestGets: Dispatch<SetStateAction<USER_INTERFACE[]>>,
    friends: USER_INTERFACE[], 
    setFriends: Dispatch<SetStateAction<USER_INTERFACE[]>>,
    handleOpenChats: (friend: USER_INTERFACE) => any, 
  } 
) {
  console.log("%cFriends", "color: royalBlue; fontWeight: bold");

  const status = GlobalVariables.status;
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchFriendPhoneNumber, setSearchFriendPhoneNumber] = useState(``);
  const [searchFriend, setSearchFriend] = useState<USER_INTERFACE | null>(null);
  // const [rooms, setRooms] = useState<string[]>([]);
  const socket = GlobalVariables.socket;
  const {
    backgroundColor,
    iconColor,
    textColor,
  } = ExportColor();
  const iconSize = 30;

  const handleSetActiveIndex = (i: number) => {
    setActiveIndex(i);
  }

  const handleChangeSearchFriendPhoneNumber = (e: BaseSyntheticEvent) => {
    setSearchFriendPhoneNumber(e.target.value);
  }

  const handleAddFriendRequest = async () => {
    if (searchFriend === null)
      return;

    const response = await UserServices.addFriendRequest(user.phoneNumber, searchFriend!.phoneNumber);

    switch (response.status) {
      case status.INTERNAL_SERVER_ERROR:
        alert`Internal Server Error`;
        break;
      case status.NO_CONTENT:
        alert`No content`;
        break;
      case status.CONFLICT:
        alert`Conflict`;
        break;
      case status.OK:
        alert`Add Friend Request Successfully!`;
        setSearchFriend(null);
        break;
    }

    socket.emit(`${user.phoneNumber} get updated`, [
      user.phoneNumber, 
      searchFriend!.phoneNumber
    ]);
  }

  const handleRemoveFriendRequest = async (phoneNumber: string) => {
    const response = await UserServices.removeFriendRequest(user.phoneNumber, phoneNumber);

    switch (response.status) {
      case status.INTERNAL_SERVER_ERROR:
        alert`Internal Server Error`;
        break;
      case status.NO_CONTENT:
        alert`No content`;
        break;
      case status.CONFLICT:
        alert`Conflict`;
        break;
      case status.OK:
        alert`Remove Friend Request Successfully!`;
        break;
    }

    socket.emit(`${user.phoneNumber} get updated`, [
      user.phoneNumber, 
      phoneNumber
    ]);
  }

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

  const handleAcceptFriend = async (phoneNumber: string) => {
    if (phoneNumber === null)
      return;

    const response = await UserServices.acceptFriend(phoneNumber, user.phoneNumber);

    switch (response.status) {
      case status.INTERNAL_SERVER_ERROR:
        alert`Internal Server Error`;
        break;
      case status.NO_CONTENT:
        alert`No content`;
        break;
      case status.CONFLICT:
        alert`Conflict`;
        break;
      case status.OK:
        alert`Accept Friend Request Successfully!`;
        setSearchFriend(null);
        break;
    }

    socket.emit(`${user.phoneNumber} get updated`, [
      user.phoneNumber, 
      phoneNumber
    ]);
  }

  const handleRemoveFriend = async (phoneNumber: string) => {
    const response = await UserServices.removeFriendRequest(phoneNumber, user.phoneNumber);

    switch (response.status) {
      case status.INTERNAL_SERVER_ERROR:
        alert`Internal Server Error`;
        break;
      case status.NO_CONTENT:
        alert`No content`;
        break;
      case status.CONFLICT:
        alert`Conflict`;
        break;
      case status.OK:
        alert`Remove Friend Successfully!`;
        break;
    }

    socket.emit(`${user.phoneNumber} get updated`, [
      user.phoneNumber, 
      phoneNumber
    ]);
  }

  return (
    <div
      key={friendRequestSends.length}
      className={`
        ${
          direction === 0 ?
            `` :
            `flex-1`
        }
        transition duration-[500]
        rounded-3xl m-1 flex flex-col gap-5 items-center text-sm font-medium leading-6 select-none p-5 overflow-y-scroll min-w-min 
      `}
      style={{
        background: backgroundColor, 
        color: textColor
      }}
    >

      {/* Header */}
      <div className={`flex gap-5 w-full items-center`}>
        <h1 className={`text-3xl`}>
          { activeIndex === 0 && `Friends` }
          { activeIndex === 1 && `Search Friends` }
          { activeIndex === 2 && `Friend Request Sent` }
          { activeIndex === 3 && `Friend Request Get` }
          { activeIndex === 4 && `Create Group` }
        </h1>
      </div>

      {/* Small tabs icon */}
      <div className={`flex w-full gap-5 item-centers justify-around`}>
        {/* Friends */}
        <button title={`Click to open list friends`} className={``} onClick={() => handleSetActiveIndex(0)}>
          <User id={`FRIENDS`} size={iconSize} color={iconColor} />
        </button>

        {/* Search Friend */}
        <button title={`Click to search and add friend`} className={``} onClick={() => handleSetActiveIndex(1)}>
          <UserSearch id={`SEARCH_FRIEND`} size={iconSize} color={iconColor} />
        </button>

        {/* List request send */}
        <button title={`Click to view list friend request you had sent`} className={`relative`} onClick={() => handleSetActiveIndex(2)}>
          {
            friendRequestSends.length > 0 &&
              <NotificationBadge quantity={friendRequestSends.length} />
          }
          <ListStart id={`LIST_REQUEST_SEND`} size={iconSize} color={iconColor} />
        </button>

        {/* List request get */}
        <button title={`Click to view list friend request you had get`} className={`relative`} onClick={() => handleSetActiveIndex(3)}>
          {
            friendRequestGets.length > 0 &&
              <NotificationBadge quantity={friendRequestGets.length} />
          }
          <ListEnd id={`LIST_REQUEST_GET`} size={iconSize} color={iconColor} />
        </button>

        {/* Create Group */}
        <button title={`Click to create group`} className={``} onClick={() => handleSetActiveIndex(4)}>
          <Users id={`CREATE_GROUP`} size={iconSize} color={iconColor} />
        </button>
      </div>

      {/* FRIENDS */}
      {
        activeIndex === 0 && (
          <>
            {/* Search Chats */}
            <div className={`
              ${direction === 0 ? `w-full` : `w-full`}
              flex gap-5
            `}>
              <div className={`
                ${direction === 0 ? `` : `w-full`}
                flex flex-1 p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5
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
            <div id={`list-friends`} className={`
              flex-1 flex flex-col w-full gap-5 overflow-scroll
            `}>

            {
              friends.map((e, i) => (
                <button key={i} title={`Open Conversation`} onClick={() => handleOpenChats(e)}>
                  <Friend name={`${e.firstName} ${e.lastName}`} newMessage={``} />
                </button>
              ))
            }

            </div>
          </>
        )
      }

      {/* SEARCH FRIEND */}
      {
        activeIndex === 1 && (
          <>
            {/* Search Friend */}
            <div className={`
              ${direction === 0 ? `w-full` : `w-full`}
              flex gap-5
            `}>
              <div className={`
                ${direction === 0 ? `` : `w-full`}
                flex flex-1 p-1.5 rounded-md ring-1 ring-gray-300 gap-1.5
              `}>
                <input
                  name={`searchFriend`}
                  type={`text`}
                  autoComplete={``}
                  placeholder={`Search Friend by Phone Number`}
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
                  searchFriend.requestGets.some((phoneNumber: string) => phoneNumber === user.phoneNumber) ||
                  searchFriend.requestSends.some((phoneNumber: string) => phoneNumber === user.phoneNumber) ||
                  searchFriend.friends.some((friend: FRIEND_INTERFACE) => friend.phoneNumber === user.phoneNumber) ||
                  searchFriend.phoneNumber === user.phoneNumber ?
                    (
                      <Friend name={`${searchFriend.firstName} ${searchFriend.lastName}`} newMessage={`${searchFriend.phoneNumber}`} />
                    ) :
                    (
                      <div className={`flex items-center justify-between`}>
                        <Friend name={`${searchFriend.firstName} ${searchFriend.lastName}`} newMessage={`${searchFriend.phoneNumber}`} />
                        
                        <button title={`Click to add friend request`} onClick={handleAddFriendRequest}>
                          <UserPlus />
                        </button>
                      </div>
                    ) :
                  (
                    <>No user found</>
                  )
              }

            </div>
          </>
        )
      }

      {/* LIST REQUEST SEND */}
      {
        activeIndex === 2 && (
          <div className={`
            flex-1 flex flex-col w-full gap-5 overflow-scroll
          `}>

            {
              friendRequestSends.map((e, i) => (
                <div key={i} className={`flex items-center justify-between`}>
                  <Friend name={`${e.firstName} ${e.lastName}`} newMessage={``} />

                  <button title={`Click to remove friend request`} onClick={()=> handleRemoveFriendRequest(e.phoneNumber)}>
                    <X color={iconColor} size={iconSize} /> 
                  </button>
                </div>
              ))
            }

          </div>
        )
      }

      {/* LIST REQUEST GET */}
      {
        activeIndex === 3 && (
          <div className={`
            flex-1 flex flex-col w-full gap-5 overflow-scroll
          `}>

            {
              friendRequestGets.map((e, i) => (
                <div key={i} className={`flex items-center justify-between`}>
                  <Friend name={`${e.firstName} ${e.lastName}`} newMessage={``} />

                  <div className={`flex items-center gap-5`}>
                    <button title={`Click to accept friend request`} onClick={()=> handleAcceptFriend(e.phoneNumber)}>
                      <Check color={iconColor} size={iconSize} /> 
                    </button>

                    <button title={`Click to remove friend request`} onClick={()=> handleRemoveFriend(e.phoneNumber)}>
                      <X color={iconColor} size={iconSize} /> 
                    </button>
                  </div>
                </div>
              ))
            }

          </div>
        )
      }

      {/* CREATE GROUP */}
      {
        activeIndex === 4 && (
          <></>
        )
      }

    </div>
  );
}

export default Friends;