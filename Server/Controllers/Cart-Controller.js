const Cart_Service = require("../Services/Cart-Services");

// ===== Get user's cart =====
const findUserCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const cart = await Cart_Service.findUserCart(user._id);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ===== Add item to cart =====
const addItemToCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const { productId, variantId, size, color } = req.body;

    if (!productId && !variantId)
      return res.status(400).json({ error: "Product ID or Variant ID required" });

    const cartItem = await Cart_Service.addCartItem(user._id, { productId, variantId, size, color });

    return res.status(200).json(cartItem); // populated cart item
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  findUserCart,
  addItemToCart
};
