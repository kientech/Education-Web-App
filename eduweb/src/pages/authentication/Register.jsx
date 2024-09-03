import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../utils/apis";

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      role: "user",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Fullname is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(`${api}/api/auth/register`, values);
        toast.success("Registration Successful!");
        navigate("/login"); 
      } catch (err) {
        console.error(err);
        toast.error("Registration Failed!");
      }
    },
  });

  return (
    <div className="min-h-screen md:grid md:grid-cols-2 p-8 bg-[#f4f5f9] grid-cols-1">
      <div className="w-full md:h-full h-[150px] rounded-lg">
        <img
          src="https://cdn.dribbble.com/userupload/12102403/file/original-14b44fb83041a72959313ef92592e116.jpg?resize=1504x1128"
          alt=""
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-right flex items-center justify-end">
          <p>Already a member?</p>
          <Link to="/login" className="text-blue-500 ml-1">
            Login Now
          </Link>
        </div>
        <div className="w-full mx-auto md:mt-24 mt-10">
          <h2 className="text-center font-semibold md:text-3xl text-2xl text-gray-800 mb-2">
            Register
          </h2>
          <p className="text-center font-base my-2 md:text-lg text-sm">
            Create an account to get started!
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="md:w-[70%] w-full mx-auto mt-10"
          >
            <div>
              <input
                type="text"
                name="fullname"
                placeholder="Fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`px-4 py-4 w-full mt-4 outline-none rounded-xl shadow-sm ${
                  formik.touched.fullname && formik.errors.fullname
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.fullname}
                </p>
              ) : null}
            </div>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`px-4 py-4 w-full mt-4 outline-none rounded-xl shadow-sm ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.username && formik.errors.username ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </p>
              ) : null}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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

            <button
              type="submit"
              className="my-4 mt-16 py-4 w-full rounded-lg bg-[#ff726f] text-white shadow-md hover:bg-[#ff6764] transition-all"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
