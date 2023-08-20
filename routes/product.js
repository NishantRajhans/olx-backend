// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
    createProduct,
    getAllProduct,
  getFullProductDetails,
  deleteProduct
} = require("../controllers/products")
// Importing Middlewares
const { auth} = require("../middleware/auth")
// Courses can Only be Created by Instructors
router.post("/createProduct",auth,createProduct)
// Get all Registered Courses
router.get("/getAllProduct", auth,getAllProduct)
// Get Details for a Specific Courses
router.get("/getFullProductDetais/:id", auth, getFullProductDetails)
// Delete a Course
router.delete("/deleteProduct", deleteProduct)
module.exports = router
