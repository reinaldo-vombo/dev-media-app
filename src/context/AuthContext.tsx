import { IContext } from '@/interface/context'
import { IUser } from '@/interface/user'
import { getCurrentUser } from '@/lib/appwrite/api'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const INITIAL_USER = {
   id: '',
   name: '',
   username: '',
   email: '',
   imageUrl: '',
   bio: ''
}
const INITIAL_STATE = {
   user: INITIAL_USER,
   isLoading: false,
   isAuthenticated: false,
   setUser: () => { },
   setIsAuthenticated: () => { },
   checkAuthUser: async () => false as boolean
}
const AuthContext = createContext<IContext>(INITIAL_STATE)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

   const [user, setUser] = useState<IUser>(INITIAL_USER)
   const [isLoading, setIsLoading] = useState(false)
   const [isAuthenticated, setIsAuthenticated] = useState(false)

   const navigate = useNavigate()
   const checkAuthUser = async () => {
      try {
         const currentAccount = await getCurrentUser()

         if (currentAccount) {
            setUser({
               id: currentAccount.$id,
               name: currentAccount.name,
               username: currentAccount.username,
               email: currentAccount.email,
               imageUrl: currentAccount.imageUrl,
               bio: currentAccount.bio
            })
            setIsAuthenticated(true)

            return true
         }
         return false
      } catch (error) {
         console.log(error);
         return false
      } finally {
         setIsLoading(false)
      }
   }
   useEffect(() => {
      if (
         localStorage.getItem('cookieFallback') === '[]' ||
         localStorage.getItem('cookieFallback') === null
      ) navigate('/register')

      checkAuthUser()
   }, [])

   const value = {
      user,
      setUser,
      isLoading,
      isAuthenticated,
      setIsAuthenticated,
      checkAuthUser
   }
   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   )
}
export default AuthProvider
export const useUserContext = () => useContext(AuthContext)