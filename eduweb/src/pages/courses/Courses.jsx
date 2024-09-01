import React, { useEffect, useState } from "react";
import axios from "axios";


const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("🚀 ~ CoursesScreen ~ courses:", courses);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/courses");
        setCourses(response.data.data);
      } catch (err) {
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  return <div className="w-[90%] mx-auto">Courses</div>;
};

export default Courses;
