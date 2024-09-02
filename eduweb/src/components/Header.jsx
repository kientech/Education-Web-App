import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { userRole, isLoggedIn, userInfo, logout } = useAuthStore((state) => ({
    userRole: state.userRole,
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Successfully Logged Out!");
    navigate("/login");
  };

  return (
    <div className="w-[90%] mx-auto h-[80px] border-b-2 border-gray-50 flex items-center justify-between">
      <NavLink to={"/"} className="font-bold text-2xl text-green-600">
        Edu
      </NavLink>
      <div className="flex gap-8">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-green-500 font-bold" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/courses"}
          className={({ isActive }) =>
            isActive ? "text-green-500 font-bold" : ""
          }
        >
          Courses
        </NavLink>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            isActive ? "text-green-500 font-bold" : ""
          }
        >
          Contact
        </NavLink>
      </div>
      <div>
        {isLoggedIn || user ? (
          <div className="flex items-center gap-4">
            <Link to={`/profile/${user._id}`}>
              Hello, {userInfo.fullname || user.fullname}
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-400"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to={"/login"}
            className="px-8 py-3 bg-green-300 rounded-full text-sm"
          >
            Get Started
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Header;
