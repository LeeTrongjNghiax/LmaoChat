import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import ChangeThemeButton from './ChangeThemeButton.tsx';
import ExportColor from '../GlobalVariables';

interface Props extends PropsWithChildren<any>{
  size?: number
}

export default function Navbar( {size}: Props ) {
  const navigate = useNavigate();

  const {
    backgroundColor, 
    iconColor,
  } = ExportColor();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div
      className={`
        transition duration-[500]
        w-full p-3 lg:p-3 flex gap-3
      `}
      style={{
        background: backgroundColor
      }}
    >
      <button onClick={goBack}>
        <ArrowLeft color={iconColor} size={size ? size : 30} />
      </button>

      <ChangeThemeButton />
    </div>
  )
}