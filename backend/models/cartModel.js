const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courses: [
    { courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" } },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
