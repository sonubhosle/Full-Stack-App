const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/Authenticate');
const admin = require('../Middlewares/admin');
const Product_Controller = require('../Controllers/Product-Controller');
const {  uploadProductImages } = require('../Config/cloudinary');

router.post("/", authenticate, admin('ADMIN'), uploadProductImages, Product_Controller.createProduct);
router.put("/:id", authenticate, admin('ADMIN'), uploadProductImages, Product_Controller.updateProduct);
router.delete("/:id",authenticate, admin('ADMIN'), Product_Controller.deleteProduct);

module.exports = router;