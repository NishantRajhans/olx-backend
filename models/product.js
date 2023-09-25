const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
  productDescription: { type: String },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  thumbnail:{
    type:String,
 },
  price: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model("product", productSchema)
