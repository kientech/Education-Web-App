const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Routes
router.get("/", courseController.getAllCourses);
router.get("/filter", courseController.getCoursesFilter);
router.get("/admin/:id", courseController.getCourseById);
router.get("/:courseSlug/lesson/:lessonSlug", courseController.getLessonBySlug);
router.get("/:courseSlug", courseController.getCourseBySlug);
router.post("/", courseController.createCourse);
router.patch("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
