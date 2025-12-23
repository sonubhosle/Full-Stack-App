const express = require('express');
const router = express.Router();
const authenticate = require('../Middlewares/Authenticate');
const { upload } = require('../Config/cloudinary');


const User_Controller = require('../Controllers/User-Controller');

router.get('/profile', authenticate, User_Controller.getUserProfile);
router.get('/all-users',  User_Controller.getAllUser);
router.put('/update-profile', authenticate, upload.single('photo'),  User_Controller.updateProfile);


module.exports = router;