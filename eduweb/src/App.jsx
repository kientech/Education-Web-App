import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import Home from "./pages/home/Home";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Header from "./components/Header";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import Courses from "./pages/courses/Courses";
import EditProfile from "./pages/profile/EditProfile";
import AdminCreateNewCourse from "./pages/admin/AdminCreateNewCourse";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminManageCourses from "./pages/admin/AdminManageCourses";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthRoute && !isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<EditProfile />} />
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route
            path="dashboard/courses/create-course"
            element={<AdminCreateNewCourse />}
          />
          <Route
            path="dashboard/courses/manage-courses"
            element={<AdminManageCourses />}
          />
        </Route>
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
