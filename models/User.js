// Import the Mongoose library
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNumber:{
      type:Number,
      required: true,
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    token: {
      type: String,
    },
    image: {
      type: String,
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model("user", userSchema)
