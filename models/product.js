const mongoose = require("mongoose")

// Define the Courses schema
const coursesSchema = new mongoose.Schema({
  productDescription: { type: String },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  price: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now },
})

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema)
