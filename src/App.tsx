import { Route, Routes } from "react-router-dom"
import { CreatePost, Explore, Home, Saved, AllUsers, EditPost, Profile, UpdateProfile } from "./_root/pages"
import { Register } from "./_auth/register"
import { Toaster } from "@/components/ui/toaster"
import RootLayout from "./_root/rootLayout"
import AuthLayout from "./_auth/authLayout"
import PostDetail from "./_root/pages/postDetail"


function App() {

  return (
    <main className="h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App
