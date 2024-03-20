import Button from "./ui/Button";
import { ITodo } from "./interface";
import useAuthenticatedQuery from "../hook/useAuthenticatedQuery";

const TodoList = () => {


  // const [todos, setTodos] = useState([]);
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
          <Button variant={"blue"} size={"sm"}>Edit</Button>
          <Button variant={"danger"} size={"sm"}>
            Remove
          </Button>
        </div>
      </div>
         )
         
         ): <h2>No Todo</h2>
      
      }
    </div>
  );
};

export default TodoList;
