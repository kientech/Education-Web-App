import React, { useState, useEffect } from "react";
import axios from "axios";
import Collapsible from "./Collapsible";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { api } from "../../utils/apis";

const CourseSidebarLesson = () => {
  const { courseSlug } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentPath = window.location.pathname;

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          `${api}/api/courses/${courseSlug}`
        );
        setChapters(response.data.data.courseChapters);
      } catch (error) {
        setError("Error fetching course data!");
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [courseSlug]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full mt-4">
      {chapters.map((chapter, chapterIndex) => {
        const isChapterActive = chapter.chapterLessons.some((lesson) =>
          currentPath.endsWith(lesson.slug)
        );

        return (
          <Collapsible
            key={chapterIndex}
            title={chapter.chapterName}
            isOpen={isChapterActive}
          >
            {chapter.chapterLessons.map((lesson, lessonIndex) => (
              <Link
                to={`/courses/${courseSlug}/lesson/${lesson.slug}`}
                key={lessonIndex}
                className={`ml-2 py-4 px-8 flex items-center justify-between hover:bg-green-10 rounded-lg ${
                  currentPath.endsWith(lesson.slug)
                    ? "bg-green-50 rounded-lg"
                    : ""
                }`}
              >
                <p className="font-base">{lesson.name}</p>
                <p className="text-gray-600 px-4 py-1 rounded-md bg-green-100">
                  {lesson.duration}
                </p>
              </Link>
            ))}
          </Collapsible>
        );
      })}
    </div>
  );
};

export default CourseSidebarLesson;
