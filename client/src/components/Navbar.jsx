import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-indigo-600 transition duration-300 text-white hover:bg-white hover:text-indigo-600 rounded-md px-3 py-2"
      : "leading-8 text-lg text-white transition duration-300  hover:text-indigo-600 rounded-md px-3 py-2";

  return (
    <>
      <div className="relative flex h-16 space-x-10 w-full bg-opacity-30 bg-black">
        <div className="flex justify-start ml-8">
          <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
            <img className="block h-10 w-auto" src={logo} />
            <span className="hidden md:block text-white text-2xl font-bold ml-2 ">
              React Jobs
            </span>
          </NavLink>
        </div>
        <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-6 flex-1 justify-center justify-self-end ">
          <NavLink className={linkClass} to="/">
            Home
          </NavLink>
          <NavLink className={linkClass} to="/jobs">
            Job
          </NavLink>
          <NavLink className={linkClass} to="/add-job">
            Add
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
