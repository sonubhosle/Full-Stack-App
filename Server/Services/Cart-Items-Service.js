const CartItem = require('../Models/Cart_Items');
const Cart = require('../Models/Cart');
const User_Service = require('../Services/User-Service');
const Product = require('../Models/Product');

// ===== Helper: Update Cart Totals =====
const updateCartTotals = async (cartId) => {
  const cartItems = await CartItem.find({ cart: cartId });
  let totalPrice = 0;
  let totalDiscountPrice = 0;
  let totalItem = 0;

  cartItems.forEach(item => {
    totalPrice += item.price;
    totalDiscountPrice += item.discountedPrice;
    totalItem += item.quantity;
  });

  await Cart.findByIdAndUpdate(cartId, {
    totalPrice,
    totalDiscountPrice,
    totalItem,
    discount: totalPrice - totalDiscountPrice
  });
};

// ===== Find Cart Item =====
const findCartItemById = async (cartItemId) => {
  const cartItem = await CartItem.findById(cartItemId)
    .populate("product")
    .populate("variant");

  if (!cartItem) throw new Error(`Cart Item not found with ID: ${cartItemId}`);
  return cartItem;
};

// ===== Update Cart Item =====

const updateCartItem = async (userId, cartItemId, cartItemData) => {
  const item = await CartItem.findById(cartItemId)
    .populate('product')
    .populate('variant'); // populate variant if exists

  const user = await User_Service.findUserById(item.userId);
  if (!user) throw new Error("User not found");
  if (user._id.toString() !== userId.toString()) throw new Error("Unauthorized");

  if (cartItemData.quantity !== undefined) {
    item.quantity = cartItemData.quantity;
  }

  const unitPrice = item.variant?.price || item.product.price;
  const unitDiscounted = item.variant?.discountedPrice || item.product.discountedPrice;

  item.price = unitPrice * item.quantity;
  item.discountedPrice = unitDiscounted * item.quantity;

  await item.save();
  await updateCartTotals(item.cart);

  return item;
};


// ===== Remove Cart Item =====
const removeCartItem = async (userId, cartItemId) => {
  const item = await findCartItemById(cartItemId);
  const user = await User_Service.findUserById(userId);

  if (user._id.toString() !== item.userId.toString()) throw new Error("Unauthorized");

  await CartItem.findByIdAndDelete(cartItemId);

  // Update Cart totals
  await updateCartTotals(item.cart);

  return { message: "Item removed from cart successfully" };
};

module.exports = {
  findCartItemById,
  updateCartItem,
  removeCartItem,
};
