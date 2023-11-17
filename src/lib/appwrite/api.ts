import { INewUser } from "@/interface/user";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";
import { INewPost, IUpdatePost } from "@/interface/post";

export async function createUserAccount(user:INewUser) {
   try {
     const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
     ) 
     if(!newAccount) throw Error

     const avatarUrl = avatars.getInitials(user.name)

     const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl
     })
     return newUser
   } catch (error) {
      console.log(error);
      return error
   }
}
export async function saveUserToDB(user: {
   accountId: string
   email: string
   name: string
   imageUrl: URL
   username?: string
}) {
   try {
      const newUser = await databases.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         ID.unique(),
         user,
      )
      return newUser
   } catch (error) {
      console.log(error);
   }
}
export async function signInAccount(user:{ email: string; password: string}) {
   try {
      const session = await account.createEmailSession(user.email, user.password)
      
      return session
   } catch (error) {
      console.log(error);
      
   }
}
export async function getCurrentUser() {
   try {
      const currentAccount = await account.get()

      if(!currentAccount) throw Error

      const currentUser = await databases.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         [Query.equal('accountId', currentAccount.$id)]
      )

      if(!currentUser) throw Error

      return currentUser.documents[0]

   } catch (error) {
      console.log(error);
      
   }
}

export async function signOutAccount() {
   try {
      const session = await account.deleteSession('current')
      
      return session
   } catch (error) {
      console.log(error);
   }
}

export function getFilePreview(fileId: string) {
   try {
     const fileUrl = storage.getFilePreview(
       appwriteConfig.storageId,
       fileId,
       2000,
       2000,
       "top",
       100
     );
 
     if (!fileUrl) throw Error;
 
     return fileUrl;
   } catch (error) {
     console.log(error);
   }
 }

export async function uploadFile(file: File) {
   try {
     const uploadedFile = await storage.createFile(
       appwriteConfig.storageId,
       ID.unique(),
       file
     );
 
     return uploadedFile;
   } catch (error) {
     console.log(error);
   }
 }

 export async function deleteFile(fileId: string) {
   try {
     await storage.deleteFile(appwriteConfig.storageId, fileId);
 
     return { status: "ok" };
   } catch (error) {
     console.log(error);
   }
 }

export async function createPost(post: INewPost) {
   try {
     // Upload file to appwrite storage
     const uploadedFile = await uploadFile(post.file[0]);
 
     if (!uploadedFile) throw Error;
 
     // Get file url
     const fileUrl = getFilePreview(uploadedFile.$id);
     if (!fileUrl) {
       await deleteFile(uploadedFile.$id);
       throw Error;
     }
 
     // Convert tags into array
     const tags = post.tags?.replace(/ /g, "").split(",") || [];
 
     // Create post
     const newPost = await databases.createDocument(
       appwriteConfig.databaseId,
       appwriteConfig.postCollectionId,
       ID.unique(),
       {
         creator: post.userId,
         caption: post.caption,
         imageUrl: fileUrl,
         imageId: uploadedFile.$id,
         location: post.location,
         tags: tags,
       }
     );
 
     if (!newPost) {
       await deleteFile(uploadedFile.$id);
       throw Error;
     }
 
     return newPost;
   } catch (error) {
     console.log(error);
   }
 }
 export async function getRecentPosts() {
   const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
   )
   if(!posts) throw Error

   return posts
 }
 export async function likePost(postId: string, likesArray: string[]){
   try {
      const updatePost = await databases.updateDocument(
         appwriteConfig.databaseId,
         appwriteConfig.postCollectionId,
         postId,
         {
            likes: likesArray
         }
      )
      if(!updatePost) throw Error

      return updatePost
   } catch (error) {
      console.log(error);
      
   }
 }
 export async function savePost(postId: string, userId: string){
   try {
      const updatePost = await databases.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.savesCollectionId,
         ID.unique(),
         {
            user: userId,
            post: postId
         }
      )
      if(!updatePost) throw Error

      return updatePost
   } catch (error) {
      console.log(error);
      
   }
 }
 export async function deleteSavedPost(savedRecordId: string){
   try {
      const statusCode = await databases.deleteDocument(
         appwriteConfig.databaseId,
         appwriteConfig.savesCollectionId,
         savedRecordId
      )
      if(!statusCode) throw Error

      return { status: 'ok'}
   } catch (error) {
      console.log(error);
      
   }
 }
 export async function getPostById(postId:string) {
   try {
      const post = await databases.getDocument(
         appwriteConfig.databaseId,
         appwriteConfig.postCollectionId,
         postId
      )
      return post
   } catch (error) {
      console.log(error);
      
   }
   
 }
 export async function updatePost(post: IUpdatePost) {
   const hasFileToUpdate = post.file.length > 0

   try {
      let image = {
         imageUrl: post.imageUrl,
         imageId: post.imageId
      }

      if(hasFileToUpdate){
              // Upload file to appwrite storage
         const uploadedFile = await uploadFile(post.file[0]);
         if (!uploadedFile) throw Error;
      
         // Get file url
         const fileUrl = getFilePreview(uploadedFile.$id);
         console.log({ fileUrl });
         
         if (!fileUrl) {
            await deleteFile(uploadedFile.$id);
            throw Error;
         }

         image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id}
      }

 
     // Convert tags into array
     const tags = post.tags?.replace(/ /g, "").split(",") || [];
 
     // Create post
     const updatedPost = await databases.updateDocument(
       appwriteConfig.databaseId,
       appwriteConfig.postCollectionId,
       post.postId,
       {
         caption: post.caption,
         imageUrl: image.imageUrl,
         imageId: image.imageId,
         location: post.location,
         tags: tags,
       }
     );
 
     if (!updatedPost) {
       await deleteFile(post.imageId);
       throw Error;
     }
 
     return updatedPost;
   } catch (error) {
     console.log(error);
   }
 }
 export async function deletePost(postId:string, imageId: string) {
   if(!postId || !imageId) throw Error

   try {
      await databases.deleteDocument(
         appwriteConfig.databaseId,
         appwriteConfig.postCollectionId,
         postId
      )
      return { status: 'ok'}
   } catch (error) {
      console.log(error);
      
   }
   
 }