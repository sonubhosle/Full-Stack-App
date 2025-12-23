const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/Authenticate')

const Payment_Controller = require('../Controllers/Payment-Controller');




router.post('/:id',authenticate,Payment_Controller.createPaymentLink);
router.get('/',authenticate,Payment_Controller.updatePaymentInformation);


module.exports = router;