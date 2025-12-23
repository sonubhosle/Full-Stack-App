const express = require('express');
const router = express.Router();
const Auth_Controller = require('../Controllers/Auth-Controller');
const { upload } = require('../Config/cloudinary');



router.post('/signup',  upload.single('photo'), Auth_Controller.register);
router.post('/signin', Auth_Controller.login);
router.post('/forgot-password',Auth_Controller.forgotPassword);
router.post('/reset-password',Auth_Controller.resetPassword);



module.exports = router;