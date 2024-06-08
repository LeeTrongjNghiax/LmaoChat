import { ReactElement } from "react";

export default function Logo(): ReactElement {
  return (
    <img
      src={require(`./LmaoChatLogo.png`)}
      alt={`logo`}
      style={{
        width: 24, 
        aspectRatio: 1 / 1
      }}
    ></img>
  )
}