// components/CourseForm.jsx

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminCreateNewCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseVideoIntro: "",
    courseCategory: "",
    courseAuthor: "",
    coursePrice: 0,
    courseTotalEnrolled: 0,
    courseDifficulty: 0,
    courseDuration: 0,
    courseDescription: "",
    courseChapters: [
      {
        chapterName: "",
        chapterLessons: [{ name: "", video: "", duration: 0 }],
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChapterChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChapters = formData.courseChapters.map((chapter, i) =>
      i === index ? { ...chapter, [name]: value } : chapter
    );
    setFormData({ ...formData, courseChapters: updatedChapters });
  };

  const handleLessonChange = (chapterIndex, lessonIndex, e) => {
    const { name, value } = e.target;
    const updatedChapters = formData.courseChapters.map((chapter, i) =>
      i === chapterIndex
        ? {
            ...chapter,
            chapterLessons: chapter.chapterLessons.map((lesson, j) =>
              j === lessonIndex ? { ...lesson, [name]: value } : lesson
            ),
          }
        : chapter
    );
    setFormData({ ...formData, courseChapters: updatedChapters });
  };

  const addChapter = () => {
    setFormData({
      ...formData,
      courseChapters: [
        ...formData.courseChapters,
        {
          chapterName: "",
          chapterLessons: [{ name: "", video: "", duration: 0 }],
        },
      ],
    });
  };

  const removeChapter = (index) => {
    setFormData({
      ...formData,
      courseChapters: formData.courseChapters.filter((_, i) => i !== index),
    });
  };

  const addLesson = (chapterIndex) => {
    const updatedChapters = formData.courseChapters.map((chapter, i) =>
      i === chapterIndex
        ? {
            ...chapter,
            chapterLessons: [
              ...chapter.chapterLessons,
              { name: "", video: "", duration: 0 },
            ],
          }
        : chapter
    );
    setFormData({ ...formData, courseChapters: updatedChapters });
  };

  const removeLesson = (chapterIndex, lessonIndex) => {
    const updatedChapters = formData.courseChapters.map((chapter, i) =>
      i === chapterIndex
        ? {
            ...chapter,
            chapterLessons: chapter.chapterLessons.filter(
              (_, j) => j !== lessonIndex
            ),
          }
        : chapter
    );
    setFormData({ ...formData, courseChapters: updatedChapters });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/api/courses/", formData);
      toast.success("Course created successfully!");
      setFormData({
        courseName: "",
        courseVideoIntro: "",
        courseCategory: "",
        courseAuthor: "",
        coursePrice: 0,
        courseTotalEnrolled: 0,
        courseDifficulty: 0,
        courseDuration: 0,
        courseDescription: "",
        courseChapters: [
          {
            chapterName: "",
            chapterLessons: [{ name: "", video: "", duration: 0 }],
          },
        ],
      });
    } catch (error) {
      toast.error("Error creating course!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="courseName" className="mb-2 text-lg font-medium">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="courseVideoIntro"
            className="mb-2 text-lg font-medium"
          >
            Course Video Intro URL
          </label>
          <input
            type="text"
            id="courseVideoIntro"
            name="courseVideoIntro"
            value={formData.courseVideoIntro}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="courseCategory" className="mb-2 text-lg font-medium">
            Course Category
          </label>
          <input
            type="text"
            id="courseCategory"
            name="courseCategory"
            value={formData.courseCategory}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="courseAuthor" className="mb-2 text-lg font-medium">
            Course Author
          </label>
          <input
            type="text"
            id="courseAuthor"
            name="courseAuthor"
            value={formData.courseAuthor}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="coursePrice" className="mb-2 text-lg font-medium">
            Course Price
          </label>
          <input
            type="number"
            id="coursePrice"
            name="coursePrice"
            value={formData.coursePrice}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="courseTotalEnrolled"
            className="mb-2 text-lg font-medium"
          >
            Total Enrolled
          </label>
          <input
            type="number"
            id="courseTotalEnrolled"
            name="courseTotalEnrolled"
            value={formData.courseTotalEnrolled}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="courseDifficulty"
            className="mb-2 text-lg font-medium"
          >
            Course Difficulty
          </label>
          <input
            type="number"
            id="courseDifficulty"
            name="courseDifficulty"
            value={formData.courseDifficulty}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="courseDuration" className="mb-2 text-lg font-medium">
            Course Duration (minutes)
          </label>
          <input
            type="number"
            id="courseDuration"
            name="courseDuration"
            value={formData.courseDuration}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="courseDescription"
            className="mb-2 text-lg font-medium"
          >
            Course Description
          </label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Chapters and Lessons */}
        <div className="flex flex-col">
          <label className="mb-2 text-lg font-medium">Course Chapters</label>
          {formData.courseChapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="mb-6">
              <div className="flex flex-col mb-4">
                <input
                  type="text"
                  name="chapterName"
                  value={chapter.chapterName}
                  onChange={(e) => handleChapterChange(chapterIndex, e)}
                  placeholder={`Chapter ${chapterIndex + 1} Name`}
                  className="p-2 border border-gray-300 rounded-md mb-2"
                />
                <button
                  type="button"
                  onClick={() => removeChapter(chapterIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Remove Chapter
                </button>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-lg font-medium">
                  Lessons in Chapter {chapterIndex + 1}
                </label>
                {chapter.chapterLessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="flex flex-col mb-4">
                    <input
                      type="text"
                      name="name"
                      value={lesson.name}
                      onChange={(e) =>
                        handleLessonChange(chapterIndex, lessonIndex, e)
                      }
                      placeholder={`Lesson ${lessonIndex + 1} Name`}
                      className="p-2 border border-gray-300 rounded-md mb-2"
                    />
                    <input
                      type="text"
                      name="video"
                      value={lesson.video}
                      onChange={(e) =>
                        handleLessonChange(chapterIndex, lessonIndex, e)
                      }
                      placeholder={`Lesson ${lessonIndex + 1} Video URL`}
                      className="p-2 border border-gray-300 rounded-md mb-2"
                    />
                    <input
                      type="number"
                      name="duration"
                      value={lesson.duration}
                      onChange={(e) =>
                        handleLessonChange(chapterIndex, lessonIndex, e)
                      }
                      placeholder={`Lesson ${
                        lessonIndex + 1
                      } Duration (minutes)`}
                      className="p-2 border border-gray-300 rounded-md mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeLesson(chapterIndex, lessonIndex)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Remove Lesson
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addLesson(chapterIndex)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Lesson
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addChapter}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Chapter
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AdminCreateNewCourse;
