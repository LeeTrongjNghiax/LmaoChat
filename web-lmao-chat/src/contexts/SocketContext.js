import { createContext } from "react";
import GlobalVariables from "../GlobalVariables";

export default createContext(GlobalVariables.socket);