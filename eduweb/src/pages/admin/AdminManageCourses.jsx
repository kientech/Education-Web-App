import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminManageCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/courses');
        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/courses/${courseId}`);
      setCourses(courses.filter(course => course._id !== courseId));
      alert('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course');
    }
  };

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
      <Link to="/admin/dashboard/courses/create-course" className="mb-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
        Create New Course
      </Link>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Lessons</th>
            <th className="border border-gray-300 p-2">Difficulty</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td className="border border-gray-300 p-2">{course.title}</td>
              <td className="border border-gray-300 p-2">
                <img src={course.image} alt={course.title} className="w-16 h-16 object-cover" />
              </td>
              <td className="border border-gray-300 p-2">{course.description}</td>
              <td className="border border-gray-300 p-2">{course.lessons}</td>
              <td className="border border-gray-300 p-2">{course.difficulty}</td>
              <td className="border border-gray-300 p-2">
                <Link
                  to={`/admin/dashboard/courses/edit-course/${course._id}`}
                  className="text-blue-500 hover:underline mr-2"
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
