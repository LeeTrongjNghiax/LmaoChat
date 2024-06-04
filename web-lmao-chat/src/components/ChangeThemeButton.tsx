import { PropsWithChildren, ReactElement } from 'react';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../contexts/ThemeProvider';

interface Props extends PropsWithChildren<any>{
  size?: number
}

export default function ChangeThemeButton({ size }: Props): ReactElement {
  const { toggleTheme, theme } = useTheme();

  const changeTheme = () => {
    switch (theme) {
      case "theme1":
        toggleTheme("theme2");
        break;
      case "theme2":
        toggleTheme("theme1");
        break;
      default:
        toggleTheme("theme1");
    }
  }
  
  return (
    <div>
      <button
        className={`bg-${theme}`}
        onClick={changeTheme}
      >
        {
          theme === "theme1" ?
            <Sun  color='white' size={size ? size : 30} /> :
            <Moon color='black' size={size ? size : 30} />
        }
      </button>
    </div>
  )
}
