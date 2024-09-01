import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userRole = decodedToken.user.role;

  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    }
  }, [userRole, navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Other admin dashboard content */}
    </div>
  );
};

export default AdminDashboard;
