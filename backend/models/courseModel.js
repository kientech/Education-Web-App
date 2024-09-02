const mongoose = require("mongoose");
const slugify = require("slugify");

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  video: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});
// Middleware to generate slug before saving a lesson
lessonSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const chapterSchema = new mongoose.Schema({
  chapterName: {
    type: String,
    required: true,
  },
  chapterLessons: [lessonSchema], // Embed lessonSchema in chapterSchema
});

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseImage: {
    type: String,
    required: true,
  },
  courseSlug: {
    type: String,
    unique: true,
  },
  courseVideoIntro: {
    type: String,
    required: true,
  },
  courseCategory: {
    type: String,
  },
  courseAuthor: {
    type: String,
    default: "Kien Duong Trung",
  },
  coursePrice: {
    type: Number,
    default: 0,
  },
  courseTotalEnrolled: {
    type: Number,
    default: 0,
  },
  courseDifficulty: {
    type: Number,
    required: true,
    default: 0,
  },
  courseDuration: {
    type: Number,
  },
  courseDescription: {
    type: String,
  },
  courseChapters: [chapterSchema], // Embed chapterSchema in courseSchema
});

// Middleware to generate slug before saving
courseSchema.pre("save", function (next) {
  if (this.isModified("courseName")) {
    this.courseSlug = slugify(this.courseName, { lower: true, strict: true });
  }
  next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
