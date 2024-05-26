/*
  * Used by 
  *   index.js
*/

import { createContext } from "react";
import GlobalVariables from "./../GlobalVariables";

export default createContext(GlobalVariables.socket);