import React from "react";
import { IUser } from "./user";

export interface IContext {
   user: IUser
   isLoading: boolean,
   isAuthenticated: boolean,
   setUser: React.Dispatch<React.SetStateAction<IUser>>,
   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
   checkAuthUser: () => Promise<boolean>
}