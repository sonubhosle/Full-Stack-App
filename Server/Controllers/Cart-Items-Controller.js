const Cart_Item_Service = require('../Services/Cart-Items-Service');

// ===== Update Cart Item =====
const updateCartItem = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const updatedItem = await Cart_Item_Service.updateCartItem(
      user._id,
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: updatedItem
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// ===== Remove Cart Item =====
const removeCartItem = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const result = await Cart_Item_Service.removeCartItem(user._id, req.params.id);

    return res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
};
