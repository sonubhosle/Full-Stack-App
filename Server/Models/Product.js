const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter variant title"],
  },
  color: {
    type: String,
    required: false,
  },
  sizes: {
    type: [String],
    default: [],
    required: false,
  },
  images: {
    type: [String],
    required: [true, "Please provide at least 1 variant image"],
    validate: {
      validator: function (arr) {
        return arr.length >= 1 && arr.length <= 6; // allow 1–6 images
      },
      message: "Each variant must have between 1 and 6 images.",
    },
  },
  price: {
    type: Number,
    required: [true, "Please enter variant price"],
  },
  discountedPrice: {
    type: Number,
    required: [true, "Please enter variant discounted price"],
  },
  discountPercent: {
    type: Number,
    required: [true, "Please enter variant discount percent"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter variant stock quantity"],
    default: 0,
  },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "ratings" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
  numRatings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
});


const productSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please Enter Product Title"] },
  brand: { type: String, required: [true, "Please Enter Product Brand"] },
  images: {
    type: [String],
    required: [true, "Please upload product images"],
    validate: {
      validator: function (arr) {
        return arr.length >= 1 && arr.length <= 5;
      },
      message: "Product must have between 1 and 5 images.",
    },
  },
  price: { type: Number, required: [true, "Please Enter Product Price"] },
  discountedPrice: { type: Number, required: [true, "Please Enter Product Discounted Price"] },
  discountPercent: { type: Number, required: [true, "Please Enter Product Discount Percent"] },
  quantity: { type: Number, required: [true, "Please Enter Product Stock"] },
  category: { type: String, required: [true, "Please Enter Product Category"] },
  description: { type: String, required: [true, "Please Enter Product Description"] },
  color: { type: String, required: [true, "Please enter product color"] },
  sizes: { type: [String], default: [], required: [true, "Please enter available sizes for product"] },
  offers: [{ type: String }],
  variants: [variantSchema],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "ratings" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
  numRatings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});


const Product = mongoose.model("products", productSchema);
module.exports = Product;
