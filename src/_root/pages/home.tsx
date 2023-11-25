import UserCard from "@/components/shared/UserCard"
import { Loader } from "@/components/shared/loader"
import PostCard from "@/components/shared/post-card"
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queryAndMutation"
import { Models } from "appwrite"
import { Link } from "react-router-dom"


const Home = () => {
   const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts()
   const {
      data: creators,
      isLoading: isUserLoading,
      isError: isErrorCreators,
   } = useGetUsers(10);
   if (isErrorPosts || isErrorCreators) {
      return (
         <div className="flex flex-1">
            <div className="home-container">
               <p className="body-medium text-light-1">Ocorreu um erro</p>
            </div>
         </div>
      );
   }
   return (
      <div className="flex flex-1">
         <div className="home-container">
            <div className="home-post">
               <div className="sm:hidden mb-12">
                  {isUserLoading && !creators ? (
                     <Loader />
                  ) : (
                     <ul className="flex items-center justify-center gap-3">
                        {creators?.documents.map((creator, i) => i < 5 && (
                           <li key={creator?.$id}>
                              <Link to={`/profile/${creator.$id}`}>
                                 <img src={creator.imageUrl} className="rounded-full w-14 h-14 object-cover" width={50} height={50} alt="" />
                              </Link>
                           </li>
                        ))}
                     </ul>
                  )}

               </div>
               <h2 className="h3-bold text-left w-full mb-8 md:h2-bold">Feed</h2>
               {isPostLoading && !posts ? (
                  <Loader />
               ) : (
                  <ul className="flex flex-col flex-1 gap-9 w-full">
                     {posts?.documents.map((post: Models.Document, index) => (
                        <PostCard key={index} post={post} />
                     ))}
                  </ul>
               )}
            </div>
         </div>
         <div className="home-creators">
            <h3 className="h3-bold text-light-1">Top Creators</h3>
            {isUserLoading && !creators ? (
               <Loader />
            ) : (
               <ul className="grid 2xl:grid-cols-2 gap-6">
                  {creators?.documents.map((creator) => (
                     <li key={creator?.$id}>
                        <UserCard user={creator} />
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   )
}

export default Home