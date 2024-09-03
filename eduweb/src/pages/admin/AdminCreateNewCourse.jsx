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
    <div className="w-full mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Create a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between gap-x-5">
          <div className="flex flex-col w-full">
            <label htmlFor="courseName" className="mb-2 text-md font-medium">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              placeholder="Enter the Course Name"
              value={formData.courseName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md outline-none focus:border-green-400"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="courseVideoIntro"
              className="mb-2 text-md font-medium"
            >
              Course Video Intro URL
            </label>
            <input
              type="text"
              id="courseVideoIntro"
              name="courseVideoIntro"
              placeholder="Enter the Video Intro URL"
              value={formData.courseVideoIntro}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md outline-none focus:border-green-400"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-5">
          <div className="flex flex-col w-full">
            <label
              htmlFor="courseCategory"
              className="mb-2 text-md font-medium"
            >
              Course Category
            </label>
            <input
              type="text"
              id="courseCategory"
              placeholder="Enter the Course Category"
              name="courseCategory"
              value={formData.courseCategory}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md outline-none focus:border-green-400"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="courseAuthor" className="mb-2 text-md font-medium">
              Course Author
            </label>
            <input
              type="text"
              id="courseAuthor"
              name="courseAuthor"
              placeholder="Enter the Author Course"
              value={formData.courseAuthor}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md outline-none focus:border-green-400"
            />
          </div>
        </div>

        <div className="flex item-center justify-between gap-x-5">
          <div className="flex flex-col w-full">
            <label htmlFor="coursePrice" className="mb-2 text-md font-medium">
              Course Price
            </label>
            <input
              type="number"
              id="coursePrice"
              name="coursePrice"
              value={formData.coursePrice}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md outline-none focus:border-green-400"
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="courseTotalEnrolled"
              className="mb-2 text-md font-medium"
            >
              Total Enrolled
            </label>
            <input
              type="number"
              id="courseTotalEnrolled"
              name="courseTotalEnrolled"
              value={formData.courseTotalEnrolled}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md outline-none focus:border-green-400"
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="courseDifficulty"
              className="mb-2 text-md font-medium"
            >
              Course Difficulty
            </label>
            <input
              type="number"
              id="courseDifficulty"
              name="courseDifficulty"
              value={formData.courseDifficulty}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md outline-none focus:border-green-400"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="courseDuration"
              className="mb-2 text-md font-medium"
            >
              Duration (minutes)
            </label>
            <input
              type="number"
              id="courseDuration"
              name="courseDuration"
              value={formData.courseDuration}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md outline-none focus:border-green-400"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="courseDescription"
            className="mb-2 text-md font-medium"
          >
            Course Description
          </label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            placeholder="Write a description"
            value={formData.courseDescription}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md outline-none focus:border-green-400"
          />
        </div>

        {/* Chapters and Lessons */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Course Chapters</h3>
          {formData.courseChapters.map((chapter, chapterIndex) => (
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
                  placeholder={`Chapter ${chapterIndex + 1} Name`}
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
                <h4 className="text-lg font-semibold mb-2">
                  Lessons in Chapter {chapterIndex + 1}
                </h4>
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
                      placeholder={`Lesson ${lessonIndex + 1} Name`}
                    />
                    <input
                      type="text"
                      name="video"
                      value={lesson.video}
                      onChange={(e) =>
                        handleLessonChange(chapterIndex, lessonIndex, e)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                      placeholder={`Lesson ${lessonIndex + 1} Video URL`}
                    />
                    <input
                      type="number"
                      name="duration"
                      value={lesson.duration}
                      onChange={(e) =>
                        handleLessonChange(chapterIndex, lessonIndex, e)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder={`Lesson ${
                        lessonIndex + 1
                      } Duration (minutes)`}
                      min="0"
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
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AdminCreateNewCourse;
