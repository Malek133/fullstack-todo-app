import Button from "./ui/Button";
import { ITodo } from "./interface";
import useAuthenticatedQuery from "../hook/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import Textarea from "./ui/Textarea";
import { axiosInstance } from "./config/axios.config";
// import { array } from "yup";
import TodoSkeleton from "./TodoSkeleton";

const TodoList = () => {


  const [isopenEditModel, setIsopenEditModel] = useState(false);
  const [isopenCreateModel, setIsopenCreateModel] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isopenRemoveModel,setIsopenRemoveModel]=useState(false)
   const [todoEdit, setTodoEdit] = useState<ITodo>({
    id:0,title:"",des:""
   });
   const [todoAdd, setTodoAdd] = useState<ITodo>({title:"",des:""});

     console.log(isUpdating)
      const storageKey = 'loggedIn';
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null


  const {isLoading,data} = useAuthenticatedQuery({
    queryKey:['todoList',`${todoEdit.id}`],
  url:'/users/me?populate=todos',config:{
    headers:{ 
       Authorization: `Bearer ${userData.jwt}`,
              }
  }
})

  
  
   const onCloseEditModal = () =>{
    setIsopenEditModel(false)
    setTodoEdit({id:0,title:"",des:""})
  }

  const onCloseCreateModal = () =>{
    setIsopenCreateModel(false)
     setTodoAdd({title:"",des:""})
  }

  const onCloseRemovModal = () =>{
    setIsopenRemoveModel(false)
    
  }


   const onOpenEditModal = (todo:ITodo) =>{
    setTodoEdit(todo)
    setIsopenEditModel(true)
    
  }

  const onOpenCreateModal = () =>{
    setIsopenCreateModel(true)
  }


  const onOpenRemoveModal = (todo:ITodo) =>{
    setTodoEdit(todo)
    setIsopenRemoveModel(true)
  }

  const onChangeHandler = (e:
    ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const {value,name} = e.target;

    setTodoEdit({
      ...todoEdit,[name]: value
    })
  }
  const onChangeAddTodoHandler = (e:
    ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const {value,name} = e.target;

    setTodoAdd({
      ...todoAdd,[name]: value
    })
  }

  const submitHandeler = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const {title,des}= todoEdit;
    try {
    const {status} =  await axiosInstance.put(`/todos/${todoEdit.id}`,
    {data:{title,des}},{
      headers:{ 
         Authorization: `Bearer ${userData.jwt}`,
                }
    })
    if(status === 200){
      onCloseEditModal()
    }
    } catch (error) {
      console.log(error)
    }finally {
      setIsUpdating(false)
    }

    setIsopenEditModel(false)
    setIsUpdating(true)
  //  console.log(todoEdit)
  }

  const submitAddHandeler = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const {title,des}= todoAdd;
    try {
    const {status} =  await axiosInstance.post('/todos',
    {data:{title,des}},{
      headers:{ 
         Authorization: `Bearer ${userData.jwt}`,
                }
    })
    if(status === 200){
      onCloseCreateModal()
    }
    } catch (error) {
      console.log(error)
    }finally {
      setIsUpdating(false)
    }

    setIsopenCreateModel(false)
    setIsUpdating(true)
  //  console.log(todoEdit)
  }

  const onRemove = async () =>{
     
    try {
      const {status}=await axiosInstance.delete(`/todos/${todoEdit.id}`,{
        headers:{ 
          Authorization: `Bearer ${userData.jwt}`,
                 }

      })
      if(status === 200){
        onCloseRemovModal()
      }
    } catch (error) {
      console.log(error)
    }
  }
   

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
    <div className="space-y-1 ">
      <div className="m-5 flex justify-between items-center space-x-4">
        <span></span>
        <span></span>
          <Button 
          variant={"blue"} size={"sm"} 
          onClick={()=> onOpenCreateModal()}>
          Create New Todo
          </Button>
          <span></span>
          <span></span>
      </div>
    
      { 
      data.todos.length ? data.todos.map((todo:ITodo) => (
            <div key={todo.id}  
            className="flex items-center justify-between
       hover:bg-gray-100 duration-300 p-3
       rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">   {todo.title}</p>
        {/* <p className="w-full font-semibold">  {todo.des}</p> */}
        <div className="flex items-center justify-end w-full space-x-3">
          <Button variant={"blue"} size={"sm"}
          onClick={() => onOpenEditModal(todo)}>
          Edit</Button>
          <Button variant={"danger"} size={"sm"} 
          onClick={() => onOpenRemoveModal(todo)}>
            Remove
          </Button>
        </div>
      </div>
         )
         
         ): <h2>No Todo</h2>
      }

      {/* Edit partie */}
      <Modal closeModal={onCloseEditModal} isOpen={isopenEditModel}
      title="Edit Ths Product">
        <form onSubmit={submitHandeler } className="space-y-1">

        <Input name='title' value={todoEdit.title} onChange={onChangeHandler} />
         <Textarea name="des" value={todoEdit.des} onChange={onChangeHandler} /> 
        <div className="flex justify-center items-center space-x-3 m-3">
        <Button variant={"cancel"} size={"sm"} onClick={onCloseEditModal}  >
            Cancel
          </Button>

          <Button variant={"blue"} size={"sm"} 
          // isloading={isUpdating}
          >
            Edit
          </Button>
        </div> 

        </form>
      </Modal>
      {/* fin Edit partie */}

      {/* remove partie */}
      <Modal closeModal={onCloseEditModal} isOpen={isopenRemoveModel}
      title="Remove this Todo">
        <form className="space-y-1">
 
        <div className="flex justify-center items-center space-x-3 m-3">
        

          <Button variant={"danger"} size={"sm"} onClick={onRemove}>
            Remove to Liste
          </Button>

          <Button variant={"cancel"} size={"sm"} 
        onClick={onCloseRemovModal}>
            Cancel
          </Button>

        </div> 

        </form>
      </Modal>
      {/* fin remove partie */}

       {/* Create partie */}
       <Modal closeModal={onCloseCreateModal} isOpen={isopenCreateModel}
      title="Create The Todo">
        <form onSubmit={submitAddHandeler} className="space-y-1">

        <Input name='title' value={todoAdd.title} 
        onChange={onChangeAddTodoHandler} />

         <Textarea name="des" value={todoAdd.des} 
         onChange={onChangeAddTodoHandler} /> 

        <div className="flex justify-center items-center space-x-3 m-3">
        <Button variant={"cancel"} size={"sm"} onClick={onCloseCreateModal}  >
            Cancel
          </Button>

          <Button variant={"blue"} size={"sm"} 
          // isloading={isUpdating}
          >
           Create
          </Button>
        </div> 

        </form>
      </Modal>
      {/* fin Create partie */}

    </div>
  );
};

export default TodoList;
