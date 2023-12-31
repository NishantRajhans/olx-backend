const Product = require("../models/product")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
exports.createProduct = async (req, res) => {
  try {
    const userId = req.user.id
    let {
      productDescription,
      price,
    } = req.body
    if (
      !productDescription||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    const sellerDetails = await User.findById(userId)

    if (!sellerDetails) {
      return res.status(404).json({
        success: false,
        message: "Seller Details Not Found",
      })
    }
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)
    const newProduct = await Product.create({
        productDescription,
        price,
        seller:sellerDetails
    })
    await User.findByIdAndUpdate(
      {
        _id:sellerDetails._id,
      },
      {
        $push: {
            product:newProduct._id,
        },
      },
      { new: true }
    )
    res.status(200).json({
      success: true,
      data: newProduct,
      message: "Product Created Successfully",
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    })
  }
}
exports.getAllProduct = async (req, res) => {
  try {
    const allProducts = await Product.find(
      { },
      {
        productDescription:true,
         price:true,
        category:true,
        seller:true,
      }
    ).populate("seller").exec();
    return res.status(200).json({
      success: true,
      data: allProducts,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Product Data`,
      error: error.message,
    })
  }
}
exports.getFullProductDetails=async(req, res) => {
    try {
        const {productId}=req.body;
        const product = await Product.findById({_id:productId}).populate("seller").exec();
        return res.status(200).json({
          success: true,
          data:product,
        })
      } catch (error) {
        console.log(error)
        return res.status(404).json({
          success: false,
          message: `Can't Fetch Product Data`,
          error: error.message,
        })
      }
}
exports.deleteProduct= async (req, res) => {
  try {
    const { productId } = req.body
    const product = await Product.findById({_id:productId})
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    await Product.findByIdAndDelete(productId)
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
