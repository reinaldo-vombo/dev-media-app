import { useUserContext } from "@/context/AuthContext"
import { IPostGrid } from "@/interface/post"
import { Link } from "react-router-dom"
import PostStats from "./post-stats"

const GridPostList = ({ posts, showUser = true, showStats = true }: IPostGrid) => {
   const { user } = useUserContext()

   return (
      <ul className="grid-container">
         {posts.map((post) => (
            <li key={post.$id} className="relative min-w-80 h-80">
               <Link to={`/posts/${post.$id}`} className="grid-post_link">
                  <img src={post.imageUrl} className="w-full h-full object-cover" alt="post" />
               </Link>
               <div className="grid-post_user">
                  {showUser && (
                     <div className="flex items-center justify-start gap-2 flex-1">
                        <img src={post.creator} className="h-8 w-8" width={32} height={32} alt="" />
                        <p className="line-clamp-1">{post.creator.name}</p>
                     </div>
                  )}
                  {showStats && <PostStats post={post} userId={user.id} />}
               </div>
            </li>
         ))}
      </ul>
   )
}

export default GridPostList