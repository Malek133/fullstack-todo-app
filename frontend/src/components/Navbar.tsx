import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {

  const {pathname} = useLocation();
  const storageKey = 'loggedIn';
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null

const Logoutin = () =>{
  localStorage.removeItem(storageKey);

  setTimeout(() =>{
    location.replace(pathname)
  },1200)
}

  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-3 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="text-white duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>

        {userData ? (
           <div className="text-white flex justify-center items-center space-x-5">
            <p>{userData.user.email}</p>
            <p onClick={Logoutin}
            className="cursor-pointer text-sm rounded 
            border-2 border-white p-2">
              Lougout</p>
            </div>
            
        ) : (
          <p className="flex items-center space-x-3">
          <li className="text-white duration-200 font-semibold text-lg">
            <NavLink to="/register">Register</NavLink>
          </li>
          <li className="text-white duration-200 font-semibold text-lg">
            <NavLink to="/login">Login</NavLink>
          </li>
        </p>
        )}
        
      </ul>
    </nav>
  );
};

export default Navbar;
