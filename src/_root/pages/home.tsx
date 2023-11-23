import { Loader } from "@/components/shared/loader"
import PostCard from "@/components/shared/post-card"
import { useGetRecentPosts } from "@/lib/react-query/queryAndMutation"
import { Models } from "appwrite"


const Home = () => {
   const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts()
   if (isErrorPosts) {
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
      </div>
   )
}

export default Home