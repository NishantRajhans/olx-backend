
const express = require("express")
const router = express.Router()
const {
    createProduct,
    getAllProduct,
  getFullProductDetails,
  deleteProduct
} = require("../controllers/products")
const { auth} = require("../middleware/auth")
router.post("/createProduct",auth,createProduct)
router.get("/getAllProduct", auth,getAllProduct)
// Get Details for a Specific Courses
router.get("/getFullProductDetais/:id", auth, getFullProductDetails)
// Delete a Course
router.delete("/deleteProduct", deleteProduct)
module.exports = router
