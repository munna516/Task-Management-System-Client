import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export const Navbar = () => {
  const navigate = useNavigate();
  const { userLogOut, errorToast, user } = useContext(AuthContext);
  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        errorToast("Logout Successfull");
        navigate("/login");
      })
      .catch((error) => {
        errorToast(error.code);
      });

    navigate("/");
  };
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

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

          <Link
            to="/"
            className="font-extrabold text-xl md:text-3xl lg:text-4xl"
          >
            TMS
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navlinks}</ul>
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
        <label className="swap swap-rotate ml-3">
          <input
            onChange={handleTheme}
            type="checkbox"
            className="theme-controller"
            value="synthwave"
          />

          {/* sun icon */}
          <svg
            className="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  );
};
