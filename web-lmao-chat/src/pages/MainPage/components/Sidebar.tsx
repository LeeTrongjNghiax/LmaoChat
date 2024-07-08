import { MouseEventHandler } from "react";
import { MessageCircle, Settings, LogOut } from "lucide-react";

import { AvatarFallback } from "./";
import { ChangeThemeButton, Logo } from "../../../components";

import { USER_INTERFACE } from "../interfaces";
import ExportColor from "../../../GlobalVariables";

export default function Sidebar(
  { direction, user, handleOpenFriends, handleOpenSetting, handleLogOut, handleOpenPersonalInfo } :
  {
    direction: number,
    user: USER_INTERFACE,
    handleOpenFriends: MouseEventHandler<HTMLButtonElement>, 
    handleOpenSetting: MouseEventHandler<HTMLButtonElement>,
    handleLogOut: MouseEventHandler<HTMLButtonElement>,
    handleOpenPersonalInfo: MouseEventHandler<HTMLButtonElement>
  }
) {
  const {
    backgroundColor,
    chatBackgroundColor, 
    iconColor,
    textColor,
  } = ExportColor();
  const iconSize = 30;

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