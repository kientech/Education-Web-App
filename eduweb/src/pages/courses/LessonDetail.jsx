import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import CourseSidebarLesson from "./CourseSidebarLesson";
import { api } from "../../utils/apis";

const LessonDetail = () => {
  const { courseSlug, lessonSlug } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          `${api}/api/courses/${courseSlug}/lesson/${lessonSlug}`
        );
        setLesson(response.data.data);
      } catch (error) {
        setError("Error fetching lesson data!");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [courseSlug, lessonSlug]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-[90%] mx-auto flex gap-x-10 my-16">
      {/* Main Content */}
      <div className="w-[65%]">
        <h1 className="text-3xl font-bold mb-6">{lesson.name}</h1>
        <div className="mb-4">
          <div className="w-full h-[500px] rounded-lg mb-4 shadow-md p-4">
            <ReactPlayer
              url={lesson.video}
              controls
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    modestBranding: 1,
                    controls: 1,
                    showInfo: 0,
                    rel: 0,
                  },
                },
              }}
            />
          </div>
          <p className="text-gray-600">Duration: {lesson.duration} minutes</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Lesson Description</h2>
          <p>{lesson.description}</p>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-[35%] mt-12 shadow-md p-4 rounded-lg">
        <h1 className="font-semibold text-xl text-green-500 mb-4">Topics of Course</h1>
        <CourseSidebarLesson /> {/* Render the CourseTopics sidebar */}
      </aside>
    </div>
  );
};

export default LessonDetail;
