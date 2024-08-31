import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log("🚀 ~ handleSubmit ~ res:", res);

      const { token } = res.data;
      console.log("🚀 ~ handleSubmit ~ token:", token);

      // Decode token to get user role
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log("🚀 ~ handleSubmit ~ decodedToken:", decodedToken);
      const userRole = decodedToken.user.role;
      console.log("🚀 ~ handleSubmit ~ userRole:", userRole);

      // Save token and role to Zustand store
      setUserInfo(token, userRole);

      // Save token to localStorage (optional, depending on your security needs)
      localStorage.setItem("token", token);

      // Navigate based on user role
      // if (userRole === "admin") {
        navigate("/home");
      // } else {
        // navigate("/home");
      // }
    } catch (err) {
      setError("Invalid credentials or server error");
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
