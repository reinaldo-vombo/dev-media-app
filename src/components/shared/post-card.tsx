import { edite, profilePlaceholder } from '@/assets'
import { useUserContext } from '@/context/AuthContext'
import { IPostCard } from '@/interface/post'
import { multiFormatDateString } from '@/lib/utils'
import { Link } from 'react-router-dom'
import PostStats from './post-stats'


const PostCard = ({ post }: IPostCard) => {

   const { user } = useUserContext()
   return (
      <div className="post-card">
         <div className="flex-between">
            <div className="flex items-center gap-3">
               <Link to={`/profile/${post.creator.$id}`}>
                  <img
                     src={
                        post.creator?.imageUrl ||
                        profilePlaceholder
                     }
                     alt="creator"
                     loading='lazy'
                     width={48}
                     height={48}
                     className="w-12 lg:h-12 rounded-full"
                  />
               </Link>

               <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                     {post.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                     <p className="subtle-semibold lg:small-regular ">
                        {multiFormatDateString(post.$createdAt)}
                     </p>
                     •
                     <p className="subtle-semibold lg:small-regular">
                        {post.location}
                     </p>
                  </div>
               </div>
            </div>

            <Link
               to={`/update-post/${post.$id}`}
               className={`${user.id !== post.creator.$id && "hidden"}`}
               aria-label='edit post icon'>
               <img
                  src={edite}
                  alt="edit"
                  loading='lazy'
                  width={20}
                  height={20}
               />
            </Link>
         </div>

         <Link to={`/posts/${post.$id}`}>
            <div className="small-medium lg:base-medium py-5">
               <p>{post.caption}</p>
               <ul className="flex gap-1 mt-2">
                  {post.tags.map((tag: string, index: string) => (
                     <li key={`${tag}${index}`} className="text-light-3 small-regular">
                        #{tag}
                     </li>
                  ))}
               </ul>
            </div>

            <img
               src={post.imageUrl || profilePlaceholder}
               alt="post image"
               width={400}
               height={400}
               loading='lazy'
               className="post-card_img"
            />
         </Link>

         <PostStats post={post} userId={user.id} />
      </div>
   )
}

export default PostCard