const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
  variant: { type: mongoose.Schema.Types.ObjectId }, // optional
  color: { type: String },
  size: { type: String },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discountPercent: { type: Number },
  quantity: { type: Number, required: true, default: 1 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  image: { type: String } 
});

const CartItem = mongoose.model("cartItems", cartItemSchema);
module.exports = CartItem;
