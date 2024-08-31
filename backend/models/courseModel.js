const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  lessons: { type: Number, default: 0 },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
