import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  console.log("AuthContext state:");
  return (<AuthContext.Provider value={5}>{children}</AuthContext.Provider>);
};
