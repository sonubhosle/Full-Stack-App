const express = require('express');
const router = express.Router();
const Product_Controller = require('../Controllers/Product-Controller');


router.get('/', Product_Controller.getAllProducts);
router.get('/id/:id', Product_Controller.findProductById);
router.get('/:id/related', Product_Controller.getRelatedProducts);
router.get("/category/:category", Product_Controller.filterProductsByCategory);


module.exports = router;