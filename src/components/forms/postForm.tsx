import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { postValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { IPostForm } from "@/interface/postForm"
import { Textarea } from "../ui/textarea"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FileUploader from "../shared/file-uploader"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queryAndMutation"
import { useUserContext } from "@/context/AuthContext"
import { toast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"

const PostForm = ({ post, action }: IPostForm) => {
   const { user } = useUserContext()

   const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost()
   const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost()
   const navigate = useNavigate()

   const form = useForm<z.infer<typeof postValidation>>({
      resolver: zodResolver(postValidation),
      defaultValues: {
         caption: post ? post?.caption : '',
         file: [],
         location: post ? post?.location : '',
         tags: post ? post.tags.join(',') : ''
      },
   })

   async function onSubmit(values: z.infer<typeof postValidation>) {
      if (post && action === 'Update') {
         const updatedPost = await updatePost({
            ...values,
            postId: post.$id,
            imageId: post?.imageId,
            imageUrl: post?.imageUrl
         })
         if (!updatedPost) {
            toast({ title: 'Ocorreu um erro por-favor tente de novo' })
         }
         return navigate(`/posts/${post.$id}`)
      }

      const newPost = await createPost({
         ...values,
         userId: user.id
      })
      if (!newPost) {
         toast({ title: 'Ocorreu um erro por-favor tente de novo' })
      }
      navigate('/')
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
            <FormField
               control={form.control}
               name="caption"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="shad-form_label">Captura</FormLabel>
                     <FormControl>
                        <Textarea className="shad-textarea custom-scrollbar" {...field} />
                     </FormControl>
                     <FormMessage className="shad-form_message" />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="file"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="shad-form_label">Adicionar foto</FormLabel>
                     <FormControl>
                        <FileUploader
                           fieldChange={field.onChange}
                           mediaUrl={post?.imageUrl}
                        />
                     </FormControl>
                     <FormMessage className="shad-form_message" />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="location"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="shad-form_label">Localização</FormLabel>
                     <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                     </FormControl>
                     <FormMessage className="shad-form_message" />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="tags"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="shad-form_label">Etiqueta (separada por vírgula " , ")</FormLabel>
                     <FormControl>
                        <Input type="text" className="shad-input" placeholder="JS, React, NextJS, Gatsby" {...field} />
                     </FormControl>
                     <FormMessage className="shad-form_message" />
                  </FormItem>
               )}
            />
            <div className="flex items-center gap-4 justify-end">
               <Button type="button" className="shad-button_dark_4">Cancelar</Button>
               <Button
                  type="submit"
                  className="shad-button_primary whitespace-nowrap"
                  disabled={isLoadingCreate || isLoadingUpdate}
               >{isLoadingCreate || isLoadingUpdate && 'Carregando...'}
                  {action} post
               </Button>
            </div>
         </form>
      </Form>
   )
}

export default PostForm