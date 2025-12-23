const User = require("../Models/User");
const Product = require("../Models/Product");

const addToWishlist = async (userId, productId, variantId = null) => {
  if (!productId) throw new Error("Product ID is required");

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Check for duplicate safely
  const exists = user.wishlist.some(
    (w) =>
      w.productId?.toString() === productId &&
      (variantId ? w.variantId?.toString() === variantId : !w.variantId)
  );

  if (!exists) {
    user.wishlist.push({ productId, variantId });
    await user.save();
  }

  // Populate product & variant
  await user.populate({
    path: "wishlist.productId",
    populate: { path: "variants" },
  });

  return user.wishlist;
};

const removeFromWishlist = async (userId, productId, variantId = null) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.wishlist = user.wishlist.filter((w) => {
    const sameProduct = w.productId.toString() === productId.toString();
    const sameVariant = variantId
      ? w.variantId?.toString() === variantId.toString()
      : !w.variantId; // null variant

    // Keep items that are NOT the one we want to remove
    return !(sameProduct && sameVariant);
  });

  await user.save();
  return user.wishlist;
};


const getWishlist = async (userId) => {
  const user = await User.findById(userId).populate({
    path: "wishlist.productId",
    populate: { path: "variants" },
  });
  if (!user) throw new Error("User not found");

  return user.wishlist;
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
