const express = require('express');

const router = express.Router();



const Order_Controller = require('../Controllers/Order-Controller');

const authenticate = require('../Middlewares/Authenticate');



router.post('/create', authenticate, Order_Controller.createOrder);
router.get('/user', authenticate, Order_Controller.orderHistory);
router.get('/:id', authenticate, Order_Controller.findOrderById);
router.get('/', authenticate, Order_Controller.getAllOrders);
router.delete('/:id', authenticate, Order_Controller.deleteOrderById);

module.exports = router;