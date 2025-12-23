const express = require('express');
const Rating_Controller = require('../Controllers/Rating-Controller');
const authenticated = require('../Middlewares/Authenticate');

const router = express.Router();

// Create a new rating
router.post('/add', authenticated, Rating_Controller.createRating);
router.get('/all/:productId', Rating_Controller.getAllRatings);
router.put('/:ratingId', authenticated, Rating_Controller.updateRating);
router.delete('/:ratingId', authenticated, Rating_Controller.deleteRating);
module.exports = router;