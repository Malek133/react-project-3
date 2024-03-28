import { ChangeEvent, useState } from "react";
import useAuthenticatedQuery from "../hook/useAuthenticatedQuery";
import Paginat from "./Paginat";

const TodosAll = () => {
    const storageKey = 'loggedIn';
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null
  const [page,setPage]=useState<number>(1)
  const [pageSize,setPageSize]=useState<number>(10)
  const [sortBy,setSortBy] = useState<string>('DESC')
  
    const {isLoading,data} = useAuthenticatedQuery({
      queryKey:[`todos-pages ${page}`,`${pageSize}`,`${sortBy}`],
    url:`/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,config:{
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

  const onChangePageSize = (e:ChangeEvent<HTMLSelectElement>) =>{
    setPageSize(+e.target.value)
  }
  const onChangeSortBy = (e:ChangeEvent<HTMLSelectElement>)=>{
    setSortBy(e.target.value)
  }
    
  if(isLoading)  
   return (
       <div className="space-y-1 ">
        <h3>loading...</h3>
       </div>
  )
  
  
  return (
    <div className="container py-2 my-5 max-w-2xl border-2 border-emerald-950">
        
     <div className="my-6 flex items-center justify-end space-x-5 text-md">
        
        <select className="border-2 border-indigo-600 rounded-md p-2" 
           value={sortBy} onChange={onChangeSortBy}>
            <option disabled>Sort by</option>
            <option value="ASC">Oldest</option>
            <option value="DESC">Latest</option>
          </select>

          <select className="border-2 border-indigo-600 rounded-md p-2" 
          value={pageSize} onChange={onChangePageSize}
          >
            <option disabled>Page size</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
        
       { 
      data.data.length ? data.data.map((
        {id,attributes}:{id:number; 
            attributes:{title:string,des:string}}) => (
            <div key={id}  
            className="flex items-center justify-between
            hover:bg-gray-100 duration-300 p-3
             rounded-md even:bg-gray-100">
        <h3 className="w-full  font-semibold"> {id} -  
        <span className="text-xl">{attributes.title}</span></h3> 
        <p className="w-full font-semibold">  {attributes.des}</p>
        
        
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
