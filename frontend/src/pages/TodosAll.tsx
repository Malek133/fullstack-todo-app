import { useState } from "react";
import TodoSkeleton from "../components/TodoSkeleton";
import useAuthenticatedQuery from "../hook/useAuthenticatedQuery";
import Paginat from "./Paginat";





const TodosAll = () => {
    const storageKey = 'loggedIn';
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null
  const [page,setPage]=useState<number>(1)
  
    const {isLoading,data} = useAuthenticatedQuery({
      queryKey:[`todos-pages ${page}`],
    url:`/todos?pagination[pageSize]=10&pagination[page]=${page}`,config:{
      headers:{ 
         Authorization: `Bearer ${userData.jwt}`,
                }
    }
    
  })
  const onClickPrev =  () => {
    setPage(prev => prev-1) ;
  };
  const onClickNext = () => {
    setPage(prev => prev+1)
  };
    
  if(isLoading)  
   return (
       <div className="space-y-1 ">
         {
          Array.from({length:4}).map((_,i)=>(
            <TodoSkeleton key={i} />
          ))
         }
       </div>
  )
  
  
  return (
    <div className="my-10">
       { 
      data.data.length ? data.data.map((
        {id,attributes}:{id:number; attributes:{title:string}}) => (
            <div key={id}  
            className="flex items-center justify-between
       hover:bg-gray-100 duration-300 p-3
       rounded-md even:bg-gray-100">
        <p className="w-full font-semibold"> {id} -  {attributes.title}</p> 
        {/* <p className="w-full font-semibold">  {todo.des}</p> */}
        
      </div>
         )
         
         ): <h2>No Todo</h2>

      }
      <Paginat page={page} total={data.meta.pagination.total}
      pageCount={data.meta.pagination.pageCount} 
      isLoading={isLoading}
      onClickPrev={onClickPrev} onClickNext={onClickNext} />
    </div>
  )
}

export default TodosAll
