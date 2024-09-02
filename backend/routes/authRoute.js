const express = require("express");
const {
  register,
  login,
  updateUser,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/profile/:userId", auth, updateUser);

module.exports = router;
