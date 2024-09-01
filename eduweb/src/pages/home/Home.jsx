import React, { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userRole = decodedToken.user.role;

  const handleLogout = () => {
      localStorage.removeItem("token");
    toast.success("Successfully Logged Out!");
    navigate("/login");
  };

  return (
    <div>
      {userRole === "admin" ? <h1>Hello, Admin</h1> : <h1>Hello, User</h1>}
      <button
        onClick={handleLogout}
        className="my-4 py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-400"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
