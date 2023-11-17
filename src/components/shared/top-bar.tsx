import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { logo, logout, profilePlaceholder } from "@/assets"
import { useSignOutAccount } from "@/lib/react-query/queryAndMutation"
import { useUserContext } from "@/context/AuthContext"
import { Button } from "../ui/button"

const TopBar = () => {
   const { user } = useUserContext()
   const navigate = useNavigate()
   const { mutate: signOut, isSuccess } = useSignOutAccount()

   useEffect(() => {
      if (isSuccess) navigate(0)
   }, [isSuccess])

   return (
      <section className="topbar">
         <div className="flex-between py-4 px-5">
            <Link to="/" className="flex gap-3 items-center" aria-label="logo">
               <img
                  src={logo}
                  alt="logo"
                  width={130}
                  height={325}
               />
            </Link>

            <div className="flex gap-4">
               <Button
                  variant="ghost"
                  className="shad-button_ghost"
                  onClick={() => signOut()}>
                  <img src={logout} alt="logout" />
               </Button>
               <Link to={`/profile/${user.id}`} className="flex-center gap-3" aria-label="user photo">
                  <img
                     src={user.imageUrl || profilePlaceholder}
                     alt="profile"
                     width={32}
                     height={32}
                     className="h-8 w-8 rounded-full"
                  />
               </Link>
            </div>
         </div>
      </section>
   )
}

export default TopBar