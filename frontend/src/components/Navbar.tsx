import { NavLink, useLocation } from "react-router-dom";
import Button from "./ui/Button";
import Ximg from "../img/XXXX.png"
const Navbar = () => {

  const {pathname} = useLocation();
  const storageKey = 'loggedIn';
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null

  // const {pathphone} = useLocation();
  // const storageKeyp = 'Phone';
  // const phoneDatas = localStorage.getItem(storageKeyp);
  // const phoneData = phoneDatas ? JSON.parse(phoneDatas) : null

const Logoutin = () =>{
  localStorage.removeItem(storageKey);
  setTimeout(() =>{
    location.replace(pathname)
  },1200)
}

  return (
    <nav className="max-w-2xl mx-auto text-white mt-7 mb-20 bg-slate-900 px-4 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className=" duration-200 font-semibold text-lg">
          <NavLink to="/">
            <img src={Ximg} alt="X" className="h-12" />
          </NavLink>
        </li>

        
         
        {userData ? (
           <div className="text-white flex justify-center 
           items-center space-x-14">

           <NavLink to="/Profile">
            <p className="text-xl 
            font-medium ">
              {userData.user.username}</p>
            </NavLink> 

            {/* <NavLink to="/Profile">
            <p className="text-xl 
            font-medium ">
              {phoneData.user.phone}</p>
            </NavLink>  */}

           

            <Button fullWidth onClick={Logoutin}
            variant={"blue"}>
              Logout</Button>

            </div>
            
        ) : (
          <p className="flex items-center space-x-3 text-white">
          <li className=" duration-200 font-semibold text-lg">
            <NavLink to="/register">Register</NavLink>
          </li>
          <li className=" duration-200 font-semibold text-lg">
            <NavLink to="/login">Login</NavLink>
          </li>
        </p>
        )}
        
      </ul>
    </nav>
  );
};

export default Navbar;
