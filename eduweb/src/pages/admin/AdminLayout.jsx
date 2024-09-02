import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

const AdminLayout = () => {
  const { isLoggedIn, userRole } = useAuthStore();

  if (!isLoggedIn || userRole !== "admin") {
    // Redirect to login or error page if not authorized
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AdminHeader />
      <div className="flex w-[90%] mx-auto">
        <AdminSidebar />
        <div className="flex-1 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
