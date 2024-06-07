import { PropsWithChildren, ReactElement } from 'react';

import ExportColor from '../GlobalVariables';

interface Props extends PropsWithChildren<any> {
  name?: string, 
  size?: number
}

export default function AvatarFallback({name, size}: Props): ReactElement {
  const {
    linkColor,
  } = ExportColor();

  const getNameInit = (name: string = "") =>
    name!.match(/(\b\S)?/g)!.join("")!.match(/(^\S|\S$)?/g)!.join("").toUpperCase();

  return (
    <div
      className={`
        transition duration-[500] 
        text-white
        flex items-center justify-center 
      `}
      style={{
        background: `linear-gradient(90deg, transparent, ${linkColor})`, 
        width: size ? size : 24, 
        borderRadius: size ? (size / 2) : 20, 
        fontSize: size ? size / 2 : 12, 
        aspectRatio: 1 / 1, 
        // background: linkColor, 
        // color: textColor
      }}
    >
      {getNameInit(name ? name : "")}
    </div>
  )
}
