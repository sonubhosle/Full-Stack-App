const express = require("express");
const router = express.Router();
const Wishlist_Controller = require("../Controllers/Wishlist-Controller");
const authMiddleware = require("../Middlewares/Authenticate");

router.use(authMiddleware);

router.post("/add", Wishlist_Controller.addToWishlist);
router.post("/remove", Wishlist_Controller.removeFromWishlist);
router.get("/", Wishlist_Controller.getWishlist);

module.exports = router;
