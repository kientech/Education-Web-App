const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware xác thực

router.post("/add", cartController.addToCart);
router.get('/check', cartController.isCourseInCart);

module.exports = router;
