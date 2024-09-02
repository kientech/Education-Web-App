import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { toast } from "react-toastify";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { userRole, isLoggedIn, userInfo, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Successfully Logged Out!");
    navigate("/login");
  };

  return (
    <div className="h-[80px] w-[90%] mx-auto flex items-center justify-between border-b-[1px] border-green-100">
      <Link to="/admin" className="text-xl font-bold">
        Edu Panel
      </Link>
      <div className="flex items-center gap-x-10">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "text-green-500 font-bold" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/admin/dashboard/users"
          className={({ isActive }) =>
            isActive ? "text-green-500 font-bold" : ""
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/dashboard/courses"
          className={({ isActive }) =>
            isActive ? "text-green-500 font-bold" : ""
          }
        >
          Courses
        </NavLink>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2"
        >
          <span>Hello, {userInfo?.fullname || "Admin"}</span>
          <img
            src={userInfo?.image || user.image}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
            <Link
              to={`/profile/${userInfo?._id}`}
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
          <div
            onClick={() => setIsDropdownOpen(false)}
            className="fixed inset-0 z-10"
          ></div>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
