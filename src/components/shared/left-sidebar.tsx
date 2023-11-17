import { sidebarLinks } from "@/constants";
import { INavLink } from "@/interface/nav";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Loader } from "./loader";
import { Button } from "../ui/button";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queryAndMutation";
import React from "react";
import { logo, logout } from "@/assets";

const LeftSidebar = () => {
   const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
   const { mutate: signOut } = useSignOutAccount();
   const navigate = useNavigate()
   const { pathname } = useLocation();
   const handleSignOut = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      signOut();
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      navigate("/register");
   }
   return (
      <nav className="leftsidebar">
         <div className="flex flex-col gap-11">
            <Link to="/" className="flex gap-3 items-center">
               <img
                  src={logo}
                  alt="logo"
                  width={170}
                  height={36}
               />
            </Link>

            {isLoading || !user.email ? (
               <div className="h-14">
                  <Loader />
               </div>
            ) : (
               <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                  <img
                     src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                     alt="profile"
                     className="h-14 w-14 rounded-full"
                  />
                  <div className="flex flex-col">
                     <p className="body-bold">{user.name}</p>
                     <p className="small-regular text-light-3">@{user.username}</p>
                  </div>
               </Link>
            )}

            <ul className="flex flex-col gap-6">
               {sidebarLinks.map((link: INavLink) => {
                  const isActive = pathname === link.route;

                  return (
                     <li
                        key={link.label}
                        className={`leftsidebar-link group ${isActive && "bg-primary-500"
                           }`}>
                        <NavLink
                           to={link.route}
                           className="flex gap-4 items-center p-4">
                           <img
                              src={link.imgURL}
                              alt={link.label}
                              className={`group-hover:invert-white ${isActive && "invert-white"
                                 }`}
                           />
                           {link.label}
                        </NavLink>
                     </li>
                  );
               })}
            </ul>
         </div>

         <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={(e) => handleSignOut(e)}>
            <img src={logout} alt="logout" />
            <p className="small-medium lg:base-medium">Logout</p>
         </Button>
      </nav>
   )
}

export default LeftSidebar