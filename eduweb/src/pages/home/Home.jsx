import React from "react";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function Home() {
  const { userRole, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!isLoggedIn) {
    return <div>You are not logged in.</div>;
  }

  return (
    <div>
      {userRole === "admin" ? <h1>Hello, Admin</h1> : <h1>Hello, User</h1>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
