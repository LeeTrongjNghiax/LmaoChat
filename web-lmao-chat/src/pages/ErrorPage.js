/*
  * Used by 
  *   index.js
*/

import { useRouteError } from "react-router-dom";

import { useTheme } from '../contexts/ThemeProvider';
import Navbar from "../components/Navbar";

export default function ErrorPage() {
  const { theme } = useTheme();
  const error = useRouteError();

  return (
    <div class={`
      transition duration-[500] 
      bg-color-${theme}
      flex min-h-screen flex-col justify-center`}
    >
      <Navbar />

      <div className={`px-6 py-12 lg:px-8 flex-1`}>
        <h2 class={`
          transition duration-[500] 
          text-color-${theme}
          mt-10 text-center text-2xl font-bold leading-9 tracking-tight
        `}>
          Oops!
        </h2>    
        <p class={`
          transition duration-[500] 
          text-color-${theme}
          mt-10 text-center text-2xl leading-9 tracking-tight
        `}>Sorry, an unexpected error has occurred.</p>
        <p class={`
          transition duration-[500] 
          text-color-${theme}
          mt-10 text-center text-2xl leading-9 tracking-tight
        `}>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}