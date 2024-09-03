import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { api } from "../../utils/apis";

const AdminManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${api}/api/courses`);
        setCourses(response.data.data);
      } catch (error) {
        toast.error("Error fetching courses!");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/api/courses/admin/${id}`);
      setCourses(courses.filter((course) => course._id !== id));
      toast.success("Course deleted successfully!");
    } catch (error) {
      toast.error("Error deleting course!");
    }
  };

  if (loading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Courses</h2>
      <Link
        to="/admin/dashboard/courses/create-course"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add New Course
      </Link>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-4 text-left">Course Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Author</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id} className="border-b">
              <td className="p-4">{course.courseName}</td>
              <td className="p-4">{course.courseCategory}</td>
              <td className="p-4">{course.courseAuthor}</td>
              <td className="p-4">${course.coursePrice.toFixed(2)}</td>
              <td className="p-4">
                <Link
                  to={`/admin/dashboard/courses/edit-course/${course._id}`}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageCourses;
