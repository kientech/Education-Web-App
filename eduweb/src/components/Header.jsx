import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/useAuthStore";

function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-4"
            >
              <img
                src={userInfo.image || user.image}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span>
                Hello, <span className="font-semibold text-green-400">{userInfo.fullname || user.fullname}</span>
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                <Link
                  to={`/profile/${user._id}`}
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}

            {isDropdownOpen && (
              // Close the dropdown if clicked outside
              <div
                onClick={() => setIsDropdownOpen(false)}
                className="fixed inset-0 z-10"
              ></div>
            )}
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
