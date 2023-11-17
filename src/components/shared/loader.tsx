import { loaderIcon } from '@/assets'

export const Loader = () => {
   return (
      <div className='flex-center w-full'>
         <img src={loaderIcon} width={24} height={24} loading='lazy' alt="loader" />
      </div>
   )
}


