import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminEditCourse = () => {
  const { id } = useParams(); // Get the course ID from the URL parameters
  const [course, setCourse] = useState({
    title: "",
    image: "",
    description: "",
    lessons: "",
    difficulty: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the course data based on the ID
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/courses/${id}`
        );
        setCourse(response.data.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://127.0.0.1:5000/api/courses/${id}`, course);
      toast.success("Course Updated Successfully!");
      navigate("/admin/dashboard/courses/manage-courses");
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Error Updating Course!");
    }
  };

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={course.image}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lessons</label>
          <input
            type="number"
            name="lessons"
            value={course.lessons}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            value={course.difficulty}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default AdminEditCourse;
