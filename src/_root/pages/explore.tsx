import { useState, useEffect } from 'react'
import { useInView } from "react-intersection-observer";
import { filter, search } from "@/assets"
import { Input } from "@/components/ui/input";
import SeachResults from '@/components/shared/SeachResults';
import GridPostList from '@/components/shared/GridPostList';
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queryAndMutation';
import { Loader } from '@/components/shared/loader';


const Explore = () => {
   const { ref, inView } = useInView();
   const [searchValue, setSearchValue] = useState("");

   const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()
   const debounceValue = useDebounce(searchValue, 500)
   const { data: searchedPosts, isFetching: isSearchingFetching } = useSearchPosts(debounceValue)

   useEffect(() => {
      if (inView && !searchValue) fetchNextPage()
   }, [inView, searchValue])

   if (!posts) {
      return (
         <div className='flex-center w-full h-full'>
            <Loader />
         </div>
      )
   }
   const shouldShowSearchResults = searchValue !== '';
   const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item?.documents.length == 0)
   return (
      <div className="explore-container">
         <div className="explore-inner_container">
            <h2 className="h3-bold md:h2-bold w-full">Pesquisar post</h2>
            <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
               <img
                  src={search}
                  width={24}
                  height={24}
                  alt="search"
               />
               <Input
                  type="text"
                  placeholder="Search"
                  className="explore-search"
                  value={searchValue}
                  onChange={(e) => {
                     const { value } = e.target;
                     setSearchValue(value);
                  }}
               />
            </div>
         </div>

         <div className="flex-between w-full max-w-5xl mt-16 mb-7">
            <h3 className="body-bold md:h3-bold">Mais poupulares</h3>

            <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
               <p className="small-medium md:base-medium text-light-2">Todos</p>
               <img
                  src={filter}
                  width={20}
                  height={20}
                  alt="filter"
               />
            </div>
         </div>
         <div className="flex flex-wrap gap-9 w-full max-w-5xl">
            {shouldShowSearchResults ? (
               <SeachResults
                  isSearchingFetching={isSearchingFetching}
                  searchedPosts={searchedPosts}
               />
            ) : shouldShowPosts ? (
               <p className="text-light-4 mt-10 text-center w-full">Fim do post</p>
            ) : posts.pages.map((item, i) => (
               <GridPostList key={`page-${i}`} posts={item?.documents} />
            ))}
         </div>
         {hasNextPage && !searchValue && (
            <div className='mt-10' ref={ref}>
               <Loader />
            </div>
         )}
      </div>
   )
}

export default Explore