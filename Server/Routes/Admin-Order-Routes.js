const express = require('express');

const router = express.Router();


// Import Order Controller
const Order_Controller = require('../Controllers/Admin-Order-Controller');

// Import Authentication Middleware
const authenticate = require('../Middlewares/Authenticate');



router.get('/', authenticate, Order_Controller.getAllAdminOrders);
router.put('/:orderId/confirmed', authenticate, Order_Controller.confirmedOrders);
router.put('/:orderId/ship', authenticate, Order_Controller.shippOrders);
router.put('/:orderId/deliver', authenticate, Order_Controller.deliverOrders);
router.put('/:orderId/cancel', authenticate, Order_Controller.cancelOrders);
router.delete('/:orderId/delete', authenticate, Order_Controller.deleteOrders);

module.exports = router;