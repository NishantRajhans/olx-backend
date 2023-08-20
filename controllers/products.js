const Product = require("../models/product")
const User = require("../models/User")
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../utils/imageUploader")
// Function to create a new course
exports.createProduct = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id

    // Get all required fields from request body
    let {
      productDescription,
      price,
    } = req.body
    // Get thumbnail image from request files
    //const thumbnail = req.files.thumbnailImag;

    // Check if any of the required fields are missing
    if (
      !productDescription||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId)

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      })
    }
    // Upload the Thumbnail to Cloudinary
    /*const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)*/
    // Create a new course with the given details
    const newProduct = await Product.create({
        productDescription,
        price,
        seller:instructorDetails
    })

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
            product:newProduct._id,
        },
      },
      { new: true }
    )
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newProduct,
      message: "Product Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    })
  }
}
// Get Course List
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
      message: `Can't Fetch Course Data`,
      error: error.message,
    })
  }
}
exports.getFullProductDetails=async(req, res) => {
    try {
        const productId=req.body;
        console.log(productId);
        const product = await Product.findById({_id:productId}).populate("seller").exec();
        return res.status(200).json({
          success: true,
          data:product,
        })
      } catch (error) {
        console.log(error)
        return res.status(404).json({
          success: false,
          message: `Can't Fetch Course Data`,
          error: error.message,
        })
      }
}
// Delete the Course
exports.deleteProduct= async (req, res) => {
  try {
    const { productId } = req.body

    // Find the course
    const product = await Product.findById({_id:productId})
    if (!product) {
      return res.status(404).json({ message: "Course not found" })
    }
    // Delete the course
    await Course.findByIdAndDelete(productId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
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
