const express = require('express');
const router = express.Router();
const Cart_Controller = require('../Controllers/Cart-Controller');

const authenticate = require('../Middlewares/Authenticate')



router.get('/',authenticate, Cart_Controller.findUserCart);
router.put('/add',authenticate, Cart_Controller.addItemToCart);


module.exports = router;