import BottomBar from "@/components/shared/bottom-bar"
import LeftSidebar from "@/components/shared/left-sidebar"
import TopBar from "@/components/shared/top-bar"
import { Outlet } from "react-router-dom"
const RootLayout = () => {
   return (
      <div className="w-full md:flex">
         <TopBar />
         <LeftSidebar />
         <section className="flex flex-1 h-full">
            <Outlet />
         </section>

         <BottomBar />
      </div>
   )
}

export default RootLayout
