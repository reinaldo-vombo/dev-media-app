import { addPost } from "@/assets"
import PostForm from "@/components/forms/postForm"


const CreatePost = () => {
   return (
      <div className="flex flex-1">
         <div className="common-container">
            <div className="max-w-5xl flex-start gap-3 justify-start w-full">
               <img
                  src={addPost}
                  width={36}
                  height={36}
                  loading="lazy"
                  alt="add"
               />
               <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
            </div>

            <PostForm action="Create" />
         </div>
      </div>
   )
}

export default CreatePost