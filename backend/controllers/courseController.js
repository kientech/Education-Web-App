const Course = require("../models/courseModel");

// // Get all courses
// exports.getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();
//     return res.status(200).json({
//       status: "success",
//       length: courses.length,
//       data: courses,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // Get a single course by ID
// exports.getCourseById = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (course) {
//       return res.status(200).json({
//         status: "success",
//         data: course,
//       });
//     } else {
//       return res.status(404).json({ message: "Course not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Controller: courseController.js
exports.getLessonBySlug = async (req, res) => {
  try {
    const { courseSlug, lessonSlug } = req.params;

    // Find the course by its slug
    const course = await Course.findOne({ courseSlug });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the lesson by its slug within the found course
    const chapter = course.courseChapters.find((chap) =>
      chap.chapterLessons.some((lesson) => lesson.slug === lessonSlug)
    );

    if (!chapter) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const lesson = chapter.chapterLessons.find(
      (lesson) => lesson.slug === lessonSlug
    );

    return res.status(200).json({
      status: "success",
      data: lesson,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ courseSlug: req.params.courseSlug });
    if (course) {
      return res.status(200).json({
        status: "success",
        data: course,
      });
    } else {
      return res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Get all courses by difficulty level
exports.getCoursesFilter = async (req, res) => {
  try {
    const difficulty = parseInt(req.query.difficulty);
    if (isNaN(difficulty)) {
      return res.status(400).json({ error: "Invalid difficulty level" });
    }
    const courses = await Course.find({ difficulty });
    return res.status(200).json({
      status: "success",
      length: courses.length,
      data: courses,
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// // Create a new course
// exports.createCourse = async (req, res) => {
//   const { title, image, description, lessons, difficulty } = req.body;
//   try {
//     const newCourse = new Course({
//       title,
//       image,
//       description,
//       lessons,
//       difficulty,
//     });
//     await newCourse.save();
//     return res.status(201).json({
//       status: "success",
//       data: newCourse,
//     });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// // Update a course
// exports.updateCourse = async (req, res) => {
//   try {
//     const updatedCourse = await Course.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (updatedCourse) {
//       res.status(200).json(updatedCourse);
//     } else {
//       res.status(404).json({ message: "Course not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a course
// exports.deleteCourse = async (req, res) => {
//   try {
//     const deletedCourse = await Course.findByIdAndDelete(req.params.id);
//     if (deletedCourse) {
//       res.status(200).json({ message: "Course deleted successfully" });
//     } else {
//       res.status(404).json({ message: "Course not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// controllers/courseController.js

// const Course = require('../models/courseModel');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
