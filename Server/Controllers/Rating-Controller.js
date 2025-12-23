const Rating_Service = require('../Services/Rating-Service');

// ====================== CREATE RATING ======================
const createRating = async (req, res) => {
    try {
        const rating = await Rating_Service.createRating(req.body, req.user);
        res.status(201).json(rating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ====================== GET ALL RATINGS ======================
const getAllRatings = async (req, res) => {
    try {
        const { productId } = req.params;
        const ratings = await Rating_Service.getAllRatings(productId);
        res.status(200).json(ratings);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ====================== UPDATE RATING ======================
const updateRating = async (req, res) => {
    try {
        const { ratingId } = req.params;
        const { rating } = req.body;
        const updatedRating = await Rating_Service.updateRating(ratingId, req.user._id, rating);
        res.status(200).json(updatedRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ====================== DELETE RATING ======================
const deleteRating = async (req, res) => {
    try {
        const { ratingId } = req.params;
        const result = await Rating_Service.deleteRating(ratingId, req.user._id);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { createRating, getAllRatings, updateRating, deleteRating };
