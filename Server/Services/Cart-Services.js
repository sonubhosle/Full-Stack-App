const CartItem = require("../Models/Cart_Items");
const Cart = require("../Models/Cart");
const Product = require("../Models/Product");

// ===== Create new cart =====
const createCart = async (userId) => {
  const cart = new Cart({ user: userId });
  return await cart.save();
};

// ===== Get user's cart with totals =====
const findUserCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  const cartItems = await CartItem.find({ cart: cart._id })
    .populate("product", "title brand price discountedPrice discountPercent images") // product info
    .populate("variant", "title brand price discountedPrice discountPercent color sizes images") // variant info
    .exec();

  // calculate totals
  let totalPrice = 0;
  let totalItems = 0;
  let totalDiscountedPrice = 0;
  for (const item of cartItems) {
    totalPrice += item.price;
    totalItems += item.quantity;
    totalDiscountedPrice += item.discountedPrice;
  }

  cart.cartItems = cartItems;
  cart.totalPrice = totalPrice;
  cart.totalItem = totalItems;
  cart.totalDiscountPrice = totalDiscountedPrice;
  cart.discount = totalPrice - totalDiscountedPrice;

  return cart;
};


// ===== Add product/variant to cart =====
const addCartItem = async (userId, req) => {
  const { productId, variantId, size, color } = req;

  let product;
  let variant;

  if (variantId) {
    product = await Product.findOne({ "variants._id": variantId });
    if (!product) throw new Error("Product not found for this variant");

    variant = product.variants.id(variantId);
    if (!variant) throw new Error("Variant not found");
  } else if (productId) {
    product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");
  } else {
    throw new Error("Product ID or Variant ID is required");
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  const existingItem = await CartItem.findOne({
    cart: cart._id,
    product: product._id,
    userId,
    size: size || (variant ? variant.sizes[0] : null),
    color: color || (variant ? variant.color : product.color),
    variant: variant ? variant._id : null
  });

  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.price = (variant ? variant.price : product.price) * existingItem.quantity;
    existingItem.discountedPrice = (variant ? variant.discountedPrice : product.discountedPrice) * existingItem.quantity;
    return await existingItem.save();
  }

  const cartItem = new CartItem({
    cart: cart._id,
    product: product._id,
    variant: variant ? variant._id : null,
    color: color || (variant ? variant.color : product.color),
    size: size || (variant ? variant.sizes[0] : null),
    quantity: 1,
    price: variant ? variant.price : product.price,
    discountedPrice: variant ? variant.discountedPrice : product.discountedPrice,
    discountPercent: variant ? variant.discountPercent : product.discountPercent,
    userId,
    image: variant?.images?.[0] || product.images?.[0] // ✅ this is the fix
  });

  const createdItem = await cartItem.save();
  cart.cartItems.push(createdItem);
  await cart.save();

  return createdItem;
};


module.exports = {
  createCart,
  findUserCart,
  addCartItem
};
