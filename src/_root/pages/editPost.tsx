import { addPost } from "@/assets"
import PostForm from "@/components/forms/postForm"
import { Loader } from "@/components/shared/loader"
import { useGetPostById } from "@/lib/react-query/queryAndMutation"
import { useParams } from "react-router-dom"


const EditPost = () => {
   const { id } = useParams()
   const { data: post, isPending } = useGetPostById(id || '')

   if (isPending) return <Loader />

   return (
      <div className="flex flex-1">
         <div className="common-container">
            <div className="max-w-5xl flex-start gap-3 justify-start w-full">
               <img
                  src={addPost}
                  width={36}
                  height={36}
                  alt="add"
               />
               <h2 className="h3-bold md:h2-bold text-left w-full">Editar Post</h2>
            </div>

            <PostForm action="Update" post={post} />
         </div>
      </div>
   )
}

export default EditPost