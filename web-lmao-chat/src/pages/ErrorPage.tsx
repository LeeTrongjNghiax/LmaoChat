import { ReactElement } from "react";
import { useRouteError } from "react-router-dom";

import Navbar from "../components/Navbar.tsx";
import { useTheme } from '../contexts/ThemeProvider.js';

interface RouteError {
  statusText: string, 
  message: string
}

export default function ErrorPage(): ReactElement {
  const { theme } = useTheme();
  const error = useRouteError() as RouteError;
  
  return (
    <div className={`
      transition duration-[500] 
      bg-color-${theme}
      flex min-h-screen flex-col justify-center`}
    >
      <Navbar />

      <div className={`px-6 py-12 lg:px-8 flex-1`}>
        <h2 className={`
          transition duration-[500] 
          text-color-${theme}
          mt-10 text-center text-2xl font-bold leading-9 tracking-tight
        `}>
          Oops!
        </h2>    
        <p className={`
          transition duration-[500] 
          text-color-${theme}
          mt-10 text-center text-2xl leading-9 tracking-tight
        `}>Sorry, an unexpected error has occurred.</p>
        <p className={`
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