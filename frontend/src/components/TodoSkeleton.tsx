

const TodoSkeleton = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
   <div>
       <div className="h-2.5 bg-gray-500 
       rounded-full dark:bg-gray-700 
       w-40 mb-2.5"></div>
       
   </div>
   <div className="flex justify-center items-center space-x-1">
    <div className="h-5 bg-gray-500 
   rounded-full dark:bg-gray-700 w-20"></div>

    <div className="h-5 bg-gray-500 
      rounded-full dark:bg-gray-700 w-20"></div>
   </div>
   
</div>
    </div>
  )
}

export default TodoSkeleton
