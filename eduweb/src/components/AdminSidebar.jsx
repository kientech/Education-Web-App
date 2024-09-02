import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// Define sidebar items as a configuration object
const sidebarItems = {
  "/admin/dashboard/courses": [
    {
      id: 1,
      name: "Create Course",
      to: "/admin/dashboard/courses/create-course",
    },
    {
      id: 2,
      name: "Manage Courses",
      to: "/admin/dashboard/courses/manage-courses",
    },
  ],
  "/admin/dashboard/users": [
    {
      id: 1,
      name: "Create User",
      to: "/admin/dashboard/users/create-user",
    },
    {
      id: 2,
      name: "Manage Users",
      to: "/admin/dashboard/users/manage-users",
    },
  ],
};

const AdminSidebar = () => {
  const location = useLocation();

  // Determine the current section based on the route
  const currentSection = Object.keys(sidebarItems).find((section) =>
    location.pathname.startsWith(section)
  );

  // Get the items for the current section, or an empty array if no section matches
  const items = sidebarItems[currentSection] || [];

  return (
    <div className="w-1/4 bg-white shadow-md h-screen p-5">
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-4">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-bold"
                  : "text-black font-bold hover:text-blue-400"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
