const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Routes
router.get("/", courseController.getAllCourses);
router.get("/filter", courseController.getCoursesFilter);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
