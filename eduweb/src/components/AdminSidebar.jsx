import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-1/4 bg-white shadow-md h-screen p-5">
      <ul>
        <li className="mb-4">
          <NavLink
            to="/admin/dashboard/courses/create-course"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-black font-bold hover:text-blue-400"
            }
          >
            Create Course
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/admin/dashboard/courses/manage-courses"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-black font-bold hover:text-blue-400"
            }
          >
            Manage Courses
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
