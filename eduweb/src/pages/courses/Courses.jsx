import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CourseItem from "./CourseItem";
import Loading from "../../components/Loading";

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
  if (loading)
    return (
      <>
        <Loading />
      </>
    );
  return (
    <div className="w-[90%] mx-auto">
      <div className="">
        <img
          src="https://cdn.dribbble.com/userupload/10102014/file/original-c751b95cdcbc47a393e5a4f19427b5c0.jpg?resize=2048x2048"
          alt=""
          className="relative w-full h-[300px] object-cover rounded-lg"
        />
        <div className="absolute bottom-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 p-10">
          <h1 className="font-bold text-center text-xl my-4">Courses</h1>
          <div className="flex items-center">
            <Link to={"/"}>Home</Link>
            <div className="mx-2">{`>>`}</div>
            <Link to={"/courses"} className="text-blue-900 font-semibold ">
              Courses
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 my-32">
        {courses &&
          courses.map((item) => (
            <CourseItem
              key={item._id}
              courseImage={item.courseImage}
              courseTitle={item.courseName}
              courseSlug={item.courseSlug}
            />
          ))}
      </div>
    </div>
  );
};

export default Courses;
