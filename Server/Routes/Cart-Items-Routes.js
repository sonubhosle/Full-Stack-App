const express = require('express');

const router = express.Router();


const Cart_Item_Controller = require('../Controllers/Cart-Items-Controller');
const authenticate = require('../Middlewares/Authenticate')

router.put('/:id', authenticate, Cart_Item_Controller.updateCartItem);
router.delete("/:id", authenticate, Cart_Item_Controller.removeCartItem)

module.exports = router;