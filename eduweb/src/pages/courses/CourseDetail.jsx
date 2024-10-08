import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlineBarsArrowUp } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineClock } from "react-icons/hi2";
import { HiArrowPath } from "react-icons/hi2";
import { HiOutlineShare } from "react-icons/hi2";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import CourseTopics from "./CourseTopics";
import CourseTabs from "./CourseTabs";
import { toast } from "react-toastify";
import { api } from "../../utils/apis";

const CourseDetail = () => {
  const { courseSlug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getFirstLessonSlug = () => {
    if (course && course.courseChapters && course.courseChapters.length > 0) {
      const firstChapter = course.courseChapters[0];
      if (
        firstChapter.chapterLessons &&
        firstChapter.chapterLessons.length > 0
      ) {
        return firstChapter.chapterLessons[0].slug;
      }
    }
    return null; // Fallback if no lessons are found
  };

  const handleGoToCourse = () => {
    const firstLessonSlug = getFirstLessonSlug();
    if (firstLessonSlug) {
      navigate(`/courses/${course.courseSlug}/lesson/${firstLessonSlug}`);
    } else {
      console.error("First lesson slug not found");
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${api}/api/courses/${courseSlug}`
        );
        setCourse(response.data.data);
      } catch (err) {
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseSlug]);

  const shareOnSocialMedia = (platform) => {
    const url = `${api}/courses/${courseSlug}`;
    const title = course ? course.title : "Check out this course!";
    const text = `I found this course interesting: ${title}`;

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&quote=${encodeURIComponent(text)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  if (loading)
    return (
      <>
        <Loading />
      </>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="w-[90%] mx-auto my-8 bg-[#ffff]">
      <div className="flex justify-between gap-10">
        <div className="w-[65%]">
          {course ? (
            <div>
              <img
                src={course.courseImage}
                alt={course.courseName}
                className="w-full h-[500px] object-cover rounded-lg"
              />
              <h1 className="text-3xl font-bold mt-4">{course.courseName}</h1>
              <p className="mt-2">{course.courseDescription}</p>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                courseLink={`${api}/courses/${courseSlug}`}
                shareOnSocialMedia={shareOnSocialMedia}
              />
            </div>
          ) : (
            <div>Course not found</div>
          )}
          <div className="mb-8">
            <CourseTabs />
          </div>
          <div className="mt-8">
            <h1 className="font-bold text-2xl">Topics of Courses</h1>
            <CourseTopics />
          </div>
        </div>
        <div className="w-[35%]">
          <div className="shadow-md p-10 rounded-lg">
            <div>
              <div className="flex items-center gap-x-2">
                <h1 className="font-bold text-xl text-green-600">$ 100.00</h1>
                <h2 className="text-sm font-base text-gray-800 line-through">
                  $ 200.00
                </h2>
              </div>
              <div>
                {/* {!isInCart || !token ? (
                  <button
                    className="text-white font-semibold w-full my-4 font-base py-4 px-8 rounded-lg bg-green-400"
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button
                    className="text-white font-semibold w-full my-4 font-base py-4 px-8 rounded-lg bg-green-400"
                    // onClick={}
                  >
                    Go to course
                  </button>
                )} */}

                <button
                  className="text-white font-semibold w-full my-4 font-base py-4 px-8 rounded-lg bg-green-400"
                  onClick={handleGoToCourse}
                >
                  Go to course
                </button>
              </div>
              <div className="w-full h-[1px] rounded-lg bg-gray-200 my-4"></div>
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center gap-x-2">
                  <HiOutlineBarsArrowUp size={20} className="text-green-500" />
                  <h1 className="font-base text-md text-[#41454f]">
                    Intermediate
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <HiOutlineUserGroup size={20} className="text-green-500" />
                  <h1 className="font-base text-md text-[#41454f]">
                    1 Total Enrolled
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <HiOutlineClock size={20} className="text-green-500" />
                  <h1 className="font-base text-md text-[#41454f]">
                    1 hour 30 minutes
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <HiArrowPath size={20} className="text-green-500" />
                  <h1 className="font-base text-md text-[#41454f]">
                    May 22, 2024
                  </h1>
                </div>
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 bg-[#f9f9f9] text-gray-600 px-4 py-4 rounded-lg flex items-center justify-center gap-x-4 cursor-pointer"
                >
                  <HiOutlineShare />
                  <h1>Share this course</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-md p-10 rounded-lg mt-12">
            <h1 className="font-semibold text-2xl mb-4">Material Includes</h1>
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-4">
                <div className="w-2 h-2 rounded-full bg-green-300"></div>
                <h1 className="text-[#41454f]">4 hours on-demand video</h1>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="w-2 h-2 rounded-full bg-green-300"></div>
                <h1 className="text-[#41454f]">4 hours on-demand video</h1>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="w-2 h-2 rounded-full bg-green-300"></div>
                <h1 className="text-[#41454f]">4 hours on-demand video</h1>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="w-2 h-2 rounded-full bg-green-300"></div>
                <h1 className="text-[#41454f]">4 hours on-demand video</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
