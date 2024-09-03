import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../utils/apis";
import slugify from "slugify";

const AdminEditCourse = () => {
  const { id } = useParams(); // Get the course ID from URL params
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    courseName: "",
    courseImage: "",
    courseVideoIntro: "",
    courseCategory: "",
    courseAuthor: "",
    coursePrice: 0,
    courseTotalEnrolled: 0,
    courseDifficulty: 0,
    courseDuration: 0,
    courseDescription: "",
    courseChapters: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${api}/api/courses/admin/${id}`);
        setCourse(response.data.data);
      } catch (error) {
        toast.error("Error fetching course data!");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleChapterChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChapters = [...course.courseChapters];
    updatedChapters[index][name] = value;
    setCourse({ ...course, courseChapters: updatedChapters });
  };

  const handleLessonChange = (chapterIndex, lessonIndex, e) => {
    const { name, value } = e.target;
    const updatedChapters = [...course.courseChapters];
    updatedChapters[chapterIndex].chapterLessons[lessonIndex][name] = value;

    // Update slug when name changes
    if (name === "name") {
      updatedChapters[chapterIndex].chapterLessons[lessonIndex].slug = slugify(
        value,
        { lower: true, strict: true }
      );
    }

    setCourse({ ...course, courseChapters: updatedChapters });
  };

  const addChapter = () => {
    setCourse({
      ...course,
      courseChapters: [
        ...course.courseChapters,
        { chapterName: "", chapterLessons: [] },
      ],
    });
  };

  const removeChapter = (index) => {
    const updatedChapters = course.courseChapters.filter((_, i) => i !== index);
    setCourse({ ...course, courseChapters: updatedChapters });
  };

  const addLesson = (chapterIndex) => {
    const updatedChapters = [...course.courseChapters];
    updatedChapters[chapterIndex].chapterLessons.push({
      name: "",
      video: "",
      duration: 0,
      slug: "", // Add slug here
    });
    setCourse({ ...course, courseChapters: updatedChapters });
  };

  const removeLesson = (chapterIndex, lessonIndex) => {
    const updatedChapters = [...course.courseChapters];
    updatedChapters[chapterIndex].chapterLessons = updatedChapters[
      chapterIndex
    ].chapterLessons.filter((_, i) => i !== lessonIndex);
    setCourse({ ...course, courseChapters: updatedChapters });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${api}/api/courses/${id}`, course);
      toast.success("Course Updated Successfully!");
      navigate("/admin/dashboard/courses/manage-courses");
    } catch (error) {
      toast.error("Error updating course!");
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
      <h2 className="text-2xl font-bold mb-6">Edit Course</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        {/* Course fields here */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="courseName">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="courseName">
            Course Image
          </label>
          <input
            type="text"
            id="courseImage"
            name="courseImage"
            value={course.courseImage}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 mb-2"
            htmlFor="courseVideoIntro"
          >
            Video Intro URL
          </label>
          <input
            type="text"
            id="courseVideoIntro"
            name="courseVideoIntro"
            value={course.courseVideoIntro}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="courseCategory">
            Category
          </label>
          <input
            type="text"
            id="courseCategory"
            name="courseCategory"
            value={course.courseCategory}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="courseAuthor">
            Author
          </label>
          <input
            type="text"
            id="courseAuthor"
            name="courseAuthor"
            value={course.courseAuthor}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="coursePrice">
            Price
          </label>
          <input
            type="number"
            id="coursePrice"
            name="coursePrice"
            value={course.coursePrice}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 mb-2"
            htmlFor="courseTotalEnrolled"
          >
            Total Enrolled
          </label>
          <input
            type="number"
            id="courseTotalEnrolled"
            name="courseTotalEnrolled"
            value={course.courseTotalEnrolled}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 mb-2"
            htmlFor="courseDifficulty"
          >
            Difficulty
          </label>
          <input
            type="number"
            id="courseDifficulty"
            name="courseDifficulty"
            value={course.courseDifficulty}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            min="0"
            max="5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="courseDuration">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="courseDuration"
            name="courseDuration"
            value={course.courseDuration}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 mb-2"
            htmlFor="courseDescription"
          >
            Description
          </label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            value={course.courseDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>

        {/* Chapter Management */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Chapters</h3>
          {course.courseChapters.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              className="mb-6 border p-4 rounded shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  name="chapterName"
                  value={chapter.chapterName}
                  onChange={(e) => handleChapterChange(chapterIndex, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="Chapter Name"
                />
                <button
                  type="button"
                  onClick={() => removeChapter(chapterIndex)}
                  className="text-red-500 hover:underline"
                >
                  Remove Chapter
                </button>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Lessons</h4>
                {chapter.chapterLessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="mb-4 p-4 border border-gray-200 rounded"
                  >
                    <input
                      type="text"
                      name="name"
                      value={lesson.name}
                      onChange={(e) =>
                        handleLessonChange(chapterIndex, lessonIndex, e)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                      placeholder="Lesson Name"
                    />
                    <input
                      type="text"
                      name="video"
                      value={lesson.video}
                      onChange={(e) =>
                        handleLessonChange(chapterIndex, lessonIndex, e)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                      placeholder="Lesson Video URL"
                    />
                    <input
                      type="number"
                      name="duration"
                      value={lesson.duration}
                      onChange={(e) =>
                        handleLessonChange(chapterIndex, lessonIndex, e)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="Lesson Duration (minutes)"
                      min="0"
                    />
                    <input
                      type="text"
                      name="slug"
                      value={lesson.slug}
                      onChange={(e) =>
                        handleLessonChange(chapterIndex, lessonIndex, e)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                      placeholder="Lesson Slug"
                    />
                    <button
                      type="button"
                      onClick={() => removeLesson(chapterIndex, lessonIndex)}
                      className="text-red-500 hover:underline"
                    >
                      Remove Lesson
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addLesson(chapterIndex)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Lesson
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addChapter}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Chapter
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminEditCourse;
