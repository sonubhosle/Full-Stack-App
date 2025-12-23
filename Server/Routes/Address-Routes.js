const express = require('express');
const router = express.Router();
const Address_Controller = require('../Controllers/Address-Controller');
const authenticate = require('../Middlewares/Authenticate');

router.delete('/address/:id',authenticate,Address_Controller.deleteAddress );
router.put('/address/:id', authenticate, Address_Controller.updateAddress);
router.get('/addresses/:userId',authenticate,  Address_Controller.getAddressesByUser);

module.exports = router;