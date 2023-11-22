import { Models } from "appwrite";

export interface INewPost  {
   userId: string;
   caption: string;
   file: File[];
   location?: string;
   tags?: string;
 }
 export interface IUpdatePost  {
   postId: string;
   caption: string;
   imageId: string;
   imageUrl: URL;
   file: File[];
   location?: string;
   tags?: string;
 }
 export interface IPostCard {
  post: Models.Document
}
 export interface IPostGrid {
  posts?: Models.Document[]
  showUser?: boolean
  showStats?: boolean
}