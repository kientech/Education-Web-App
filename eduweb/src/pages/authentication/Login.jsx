import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";

export default function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const token = localStorage.getItem("token");

  // Check if user is already logged in
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userRole = decodedToken.user.role;
        setUserInfo(token, userRole, decodedToken.user);
        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Token decoding error:", err);
      }
    }
  }, [token, navigate, setUserInfo]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const { email, password } = values;
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });
        const { token, user } = res.data;
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userRole = decodedToken.user.role;
        setUserInfo(token, userRole, user);

        localStorage.setItem("token", token);

        toast.success("Login Successfully!");

        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (err) {
        setError("Invalid credentials or server error");
        toast.error("Invalid credentials or server error");
        console.error("Login error:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handlePaste = (e) => {
    e.preventDefault();
    toast.warn("Copy/Paste Disabled!");
  };

  return (
    <div className="min-h-screen md:grid md:grid-cols-2 p-8 bg-[#f4f5f9] grid-cols-1">
      <div className="w-full md:h-full h-[150px] rounded-lg">
        <img
          src="https://cdn.dribbble.com/userupload/9816565/file/original-e64b3e235c9618a65f18884faf48210c.png?resize=2048x1536"
          alt=""
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-right flex items-center justify-end">
          <p>Not a member?</p>
          <Link to="/register" className="text-blue-500 ml-1">
            Register Now
          </Link>
        </div>
        <div className="w-full mx-auto md:mt-32 mt-10">
          <h2 className="text-center font-semibold md:text-3xl text-2xl text-gray-800 mb-2">
            Hello Again
          </h2>
          <p className="text-center font-base my-2 md:text-lg text-sm">
            Welcome back, you've been missed!
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="md:w-[70%] w-full mx-auto mt-10"
          >
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`px-4 py-4 w-full mt-4 outline-none rounded-xl shadow-sm ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onPaste={handlePaste}
                className={`px-4 py-4 w-full mt-4 outline-none rounded-xl shadow-sm ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>
            <p className="text-right text-sm my-4 hover:text-blue-500">
              <Link to={"/recover-password"}>Recover Password</Link>
            </p>
            <button
              type="submit"
              className="my-4 py-4 w-full rounded-lg bg-[#ff726f] text-white shadow-md hover:bg-[#ff6764] transition-all"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
