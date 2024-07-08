import { ReactElement } from "react";
import { useRouteError } from "react-router-dom";

import Navbar from "../../components/Navbar.tsx";
import RouteError from "../../interfaces/RouteError.tsx";
import ExportColor from "../../GlobalVariables.js";

export default function ErrorPage(): ReactElement {
  const error = useRouteError() as RouteError;

  const {
    backgroundColor, 
    textColor, 
  } = ExportColor();
  
  return (
    <div
      className={`
        transition duration-[500] 
        flex min-h-screen flex-col justify-center
      `}
      style={{
        background: backgroundColor
      }}
    >
      <Navbar />

      <div className={`px-6 py-12 lg:px-8 flex-1`}>
        <h2
          className={`
            transition duration-[500] 
            mt-10 text-center text-2xl font-bold leading-9 tracking-tight
          `}
          style={{
            color: textColor
          }}
        >
          Oops!
        </h2>    
        <p
          className={`
            transition duration-[500] 
            mt-10 text-center text-2xl leading-9 tracking-tight
          `}
          style={{
            color: textColor
          }}
        >Sorry, an unexpected error has occurred.</p>
        <p
          className={`
            transition duration-[500] 
            mt-10 text-center text-2xl leading-9 tracking-tight
          `}
          style={{
            color: textColor
          }}
        >
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}