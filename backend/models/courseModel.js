const mongoose = require("mongoose");
const slugify = require("slugify");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true, 
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  lessons: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Middleware to generate slug before saving
courseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
