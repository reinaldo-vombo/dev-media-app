import { ISearchPost } from "@/interface/search"
import { Loader } from "./loader"
import GridPostList from "./GridPostList"

const SeachResults = ({ isSearchingFetching, searchedPosts }: ISearchPost) => {
   if (isSearchingFetching) return <Loader />

   if (searchedPosts && searchedPosts.documents.length > 0) {
      return (
         <GridPostList posts={searchedPosts.documents} />
      )
   }
   return (
      <p className="text-light-4 mt-10 text-center w-full">Sem resultado</p>
   )
}

export default SeachResults