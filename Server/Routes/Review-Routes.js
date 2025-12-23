const express = require('express');
const router = express.Router();
const Review_Controller = require('../Controllers/Review-Controller');
const authenticate = require('../Middlewares/Authenticate')



// Create a new review
router.post('/add', authenticate, Review_Controller.createReview);
router.get('/all/:productId',  Review_Controller.getAllReviews);
router.put('/:reviewId', authenticate, Review_Controller.updateReview);
router.delete('/:reviewId', authenticate, Review_Controller.deleteReview);
module.exports = router;