import { User } from "./User"
export const SearchedUsers = ()=>{
     
     return(
          <div className="w-fullmax-w-350 min-h-[70vh] mx-auto p-5 mt-2 rounded-md items-start overflow-y-scroll hide-scrollbar shadow grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center place-content-start">
               <User />
               <User />
               <User />
               <User />
               <User />
               <User />
               <User />
               <User />
               <User />
               <User />
               <User />
               <User />
          </div>
     )
}

