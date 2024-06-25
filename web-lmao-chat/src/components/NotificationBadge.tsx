import { CSSProperties } from 'react'

export default function NotificationBadge({ quantity }: {quantity: number}) {
  const style: CSSProperties = {
    position: `absolute`, 
    right: `-0.7em`, 
    top: `-0.7em`, 
    minWidth: `1.6em`, 
    height: `1.6em`, 
    borderRadius: `0.8em`,
    border: `0.05em solid white`, 
    backgroundColor: `red`, 

    display: `flex`, 
    justifyContent: `center`, 
    alignItems: `center`, 
    fontSize: `0.8em`, 
    color: `white`, 
  }

  return (
    <div style={style}>{ quantity }</div>
  )
}