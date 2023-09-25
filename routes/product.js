
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
router.get("/getFullProductDetais", auth, getFullProductDetails)
router.delete("/deleteProduct", deleteProduct)
module.exports = router
