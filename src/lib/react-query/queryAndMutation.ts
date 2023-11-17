import { useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query'
import { createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getPostById, getRecentPosts, likePost, savePost, signInAccount, signOutAccount, updatePost } from '../appwrite/api'
import { INewUser } from '@/interface/user'
import { INewPost, IUpdatePost } from '@/interface/post'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { IDeletePost, ISavedPost } from '@/interface/querys'

export const useCreateUserAccount = () => {
   return useMutation({
      mutationFn: (user: INewUser) => createUserAccount(user)
   })
}
export const useSignInAccount = () => {
   return useMutation({
      mutationFn: (user: {
         email: string;
         password: string;
      }) => signInAccount(user)
   })
}
export const useSignOutAccount = () => {
   return useMutation({
      mutationFn: signOutAccount
   })
}
export const useCreatePost = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: (post: INewPost) => createPost(post),
     onSuccess: () => {
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
       });
     },
   });
 }
 export const useGetRecentPosts = () => {
   return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts
   })
 }
 export const useLikePost = () => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: ({ postId, likesArray}: { postId: string, likesArray: string[]}) => 
      likePost(postId, likesArray),
      onSuccess: (data) => {
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
         })
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
         })
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POSTS]
         })
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER]
         })
      }
   })
 }
 export const useSavePost = () => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: ({ postId, userId}: ISavedPost) => 
      savePost(postId, userId),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
         })
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POSTS]
         })
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER]
         })
      }
   })
 }
 export const useDeleteSavedPost = () => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
         })
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POSTS]
         })
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER]
         })
      }
   })
 }
 export const useGetCurrentUser = () => {
   return useQuery({
      queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      queryFn: getCurrentUser
   })
 }
 export const useGetPostById = (postId: string) => {
   return useQuery({
      queryKey: [QUERY_KEYS.GET_POST_BY_ID],
      queryFn: () => getPostById(postId),
      enabled: !!postId
   })
 }
 export const useUpdatePost = () => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (post: IUpdatePost) => updatePost(post),
      onSuccess: (data) => {
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
         })
      }
   })
 }
 export const useDeletePost = () => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: ({postId, imageId}: IDeletePost) => deletePost(postId, imageId),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
         })
      }
   })
 }
 