import { Models } from "appwrite";

export interface IPostForm  {
   post?: Models.Document;
   action: "Create" | "Update";
 }