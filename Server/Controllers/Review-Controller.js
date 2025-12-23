const Review_Service = require('../Services/Reviews-Service');

// ====================== CREATE REVIEW ======================
const createReview = async (req, res) => {
    try {
        const user = req.user; // authenticated user
        const review = await Review_Service.createReview(req.body, user);
        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: error.message });
    }
};

// ====================== GET ALL REVIEWS FOR A PRODUCT ======================
const getAllReviews = async (req, res) => {
    const { productId } = req.params;
  
    try {
        const reviews = await Review_Service.getAllReviews(productId);
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: 'Error fetching reviews', error: err.message });
    }
};

// ====================== UPDATE REVIEW ======================
const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const user = req.user; // authenticated user

    try {
        const updatedReview = await Review_Service.updateReview(reviewId, user._id, req.body);
        res.status(200).json(updatedReview);
    } catch (err) {
        console.error('Error updating review:', err);
        res.status(500).json({ message: 'Error updating review', error: err.message });
    }
};

// ====================== DELETE REVIEW ======================
const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const user = req.user; // authenticated user

    try {
        const result = await Review_Service.deleteReview(reviewId, user._id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error deleting review:', err);
        res.status(500).json({ message: 'Error deleting review', error: err.message });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    updateReview,
    deleteReview
};
