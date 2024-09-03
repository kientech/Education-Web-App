const Cart = require('../models/cartModel');
const Course = require('../models/courseModel'); // Assuming you have a Course model

exports.addToCart = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const courseExists = cart.courses.some(course => course.courseId.equals(courseId));
      if (courseExists) {
        return res.status(400).json({ message: 'Course already in cart' });
      }

      cart.courses.push({ courseId });
      await cart.save();
      return res.status(200).json({ message: 'Course added to cart' });
    } else {
      cart = new Cart({ userId, courses: [{ courseId }] });
      await cart.save();
      return res.status(200).json({ message: 'Course added to cart' });
    }
  } catch (error) {
    console.log("🚀 ~ exports.addToCart= ~ error:", error)
    return res.status(500).json({ message: 'Error adding course to cart', error });
  }
};

// Kiểm tra khóa học đã có trong giỏ hàng chưa
exports.isCourseInCart = async (req, res) => {
  const { userId, courseId } = req.query;

  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const courseExists = cart.courses.some(course => course.courseId.equals(courseId));
      return res.status(200).json({ inCart: courseExists });
    }
    return res.status(200).json({ inCart: false });
  } catch (error) {
    return res.status(500).json({ message: 'Error checking course in cart', error });
  }
};
