// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
} = require("../controllers/Auth")
const { auth } = require("../middleware/auth")
// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)
module.exports = router
