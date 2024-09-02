  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import Collapsible from "./Collapsible";
  import { Link, useParams } from "react-router-dom";
  import Loading from "../../components/Loading";

  const CourseTopics = () => {
    const { courseSlug } = useParams();
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');  

    useEffect(() => {
      const fetchChapters = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/api/courses/${courseSlug}`
          ); // Update the URL as needed
          setChapters(response.data.data.courseChapters);
        } catch (error) {
          setError("Error fetching course data!");
        } finally {
          setLoading(false);
        }
      };

      fetchChapters();
    }, []);

    if (loading)
      return (
        <>
          <Loading />
        </>
      );
    if (error) return <p>{error}</p>;

    return (
      <div className="w-full mt-4">
        {chapters.map((chapter, chapterIndex) => (
          <Collapsible key={chapterIndex} title={chapter.chapterName}>
            {chapter.chapterLessons.map((lesson, lessonIndex) => (
              <Link
                to={token ? `/courses/${courseSlug}/lesson/${lesson.slug}` : "/login"}
                key={lessonIndex}
                className="ml-2 py-4 px-8 border-b-[1px] border-gray-200 flex items-center justify-between"
              >
                <p className="font-base">{lesson.name}</p>
                <p className="text-gray-600 px-4 py-1 rounded-md bg-green-100">
                  {lesson.duration}
                </p>
              </Link>
            ))}
          </Collapsible>
        ))}
      </div>
    );
  };

  export default CourseTopics;
