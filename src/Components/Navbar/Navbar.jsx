import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export const Navbar = () => {
  const navigate = useNavigate();
  const { userLogOut, successfulToast, user } = useContext(AuthContext);
  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        successfulToast("Logout Successfull");
        navigate("/login");
      })
      .catch((error) => {
        errorToast(error.code);
      });

    navigate("/");
  };
  const navlinks = (
    <>
       <NavLink
        className={({ isActive }) =>
          `button md:text-lg lg:text-xl ${
            isActive ? "bg-white text-primary-color " : ""
          }`
        }
        to="/"
      >
        <a>Home</a>
      </NavLink>
    </>
  );
  return (
    <div className=" w-11/12 mx-auto h-20">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navlinks}
            </ul>
          </div>

          <Link to="/" className="font-extrabold text-xl md:text-3xl lg:text-4xl">TMS</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navlinks}
          </ul>
        </div>
        <div className="navbar-end">
          {user && user?.email && (
            <div className="flex justify-center items-center z-10 gap-3">
              {/* image  */}
              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  className="border-2 border-white rounded-full bg-primary-color"
                >
                  <img
                    className="w-12 rounded-full p-1"
                    referrerPolicy="no-referrer"
                    src={user && user?.photoURL ? user.photoURL : avatarImage}
                    alt=""
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white rounded-box z-[1] w-60 p-2 shadow"
                >
                  <li>
                    <a className="flex justify-center text-primary-color  rounded-lg  md:text-lg font-semibold mb-2">
                      {user?.displayName}
                    </a>
                  </li>

                  <li>
                    <a
                      onClick={handleLogOut}
                      className="flex justify-center  hover:bg-red-500 font-bold rounded-lg  text-red-500 hover:text-white md:text-lg gap-2 "
                    >
                      Logout <FiLogOut />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
