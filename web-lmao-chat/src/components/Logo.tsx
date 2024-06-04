import { ReactElement } from 'react';

export default function Logo(): ReactElement {
  return (
    <img src={require("./LmaoChatLogo.png")} alt='logo' width={50}></img>
  )
}