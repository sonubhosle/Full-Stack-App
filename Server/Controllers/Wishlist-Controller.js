const WishlistService = require("../Services/Wishlist-Service");

const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, variantId } = req.body;

    const wishlist = await WishlistService.addToWishlist(userId, productId, variantId);
    res.status(200).json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, variantId } = req.body;

    const wishlist = await WishlistService.removeFromWishlist(userId, productId, variantId);
    res.status(200).json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await WishlistService.getWishlist(userId);
    res.status(200).json({ success: true, wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
