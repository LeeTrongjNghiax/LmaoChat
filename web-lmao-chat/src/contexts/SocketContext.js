import { createContext } from "react";
import GlobalVariable from "./../GlobalVariable";

export default createContext(GlobalVariable.socket);