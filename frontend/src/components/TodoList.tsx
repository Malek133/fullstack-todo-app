import Button from "./ui/Button";
import { ITodo } from "./interface";
import useAuthenticatedQuery from "../hook/useAuthenticatedQuery";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import { useState } from "react";

const TodoList = () => {


  const [isopenEditModel, setIsopenEditModel] = useState(false);
  // const [isloading, setIsloading] = useState(true);
  
      const storageKey = 'loggedIn';
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null


  const {isLoading,data} = useAuthenticatedQuery({queryKey:['todo'],
  url:'/users/me?populate=todos',config:{
    headers:{ 
       Authorization: `Bearer ${userData.jwt}`,
              }
  }})

  
   if(isLoading) return <h3>Loading ...</h3>
  
   const onToggelEditModal = () =>{
    setIsopenEditModel(prev =>!prev)
   }
  return (
    <div className="space-y-1 ">
      { 
      data.todos.length ? data.todos.map(({id,title}:ITodo) => (
            <div key={id}  
            className="flex items-center justify-between
       hover:bg-gray-100 duration-300 p-3
       rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">  -  {title}</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button variant={"blue"} size={"sm"}
          onClick={onToggelEditModal}
          >Edit</Button>
          <Button variant={"danger"} size={"sm"}>
            Remove
          </Button>
        </div>
      </div>
         )
         
         ): <h2>No Todo</h2>
      }

      {/* Edit partie */}
      <Modal closeModal={onToggelEditModal} isOpen={isopenEditModel}
      title="Edit Ths Product">
        <Input value={'editer'} />

        <div className="flex justify-center items-center space-x-3 m-3">
        <Button variant={"danger"} size={"sm"} onClick={onToggelEditModal}  >
            Cancel
          </Button>

          <Button variant={"blue"} size={"sm"}>
            Edit
          </Button>
        </div>

      </Modal>
      {/* fin Edit partie */}

    </div>
  );
};

export default TodoList;
