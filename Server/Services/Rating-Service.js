const Rating = require('../Models/Rating');
const Product = require('../Models/Product');
const User = require('../Models/User');
const Product_Service = require('../Services/Product-Service');

// ====================== CREATE RATING ======================
const createRating = async (reqData, user) => {
    const product = await Product_Service.findProductById(reqData.productId);
    if (!product) throw new Error('Product not found');

    const variantId = reqData.variantId || reqData.varientId || null;

    if (!reqData.rating || reqData.rating < 1 || reqData.rating > 5)
        throw new Error('Rating must be a number between 1 and 5');

    const existingRatingQuery = { 
        user: user._id, 
        product: product._id,
        variant: variantId 
    };

    const existingRating = await Rating.findOne(existingRatingQuery);
    if (existingRating) throw new Error('You have already rated this product/variant');

    // Create new rating
    const rating = new Rating({
        user: user._id,
        product: product._id,
        variant: variantId,
        rating: reqData.rating,
        createdAt: new Date(),
    });

    const savedRating = await rating.save();

    // Update product or variant ratings array and numRatings
    if (variantId) {
        const variant = product.variants.id(variantId);
        if (!variant) throw new Error('Variant not found');
        variant.ratings.push(savedRating._id);
        variant.numRatings = variant.ratings.length;
    } else {
        product.ratings.push(savedRating._id);
        product.numRatings = product.ratings.length;
    }

    await product.save();

    // Update user ratings
    await User.findByIdAndUpdate(user._id, { $push: { ratings: savedRating._id } });

    // Return saved rating with populated user info
    return await savedRating.populate('user', 'userName email');
};

// ====================== GET ALL RATINGS ======================
const getAllRatings = async (productId, variantId = null) => {
    const product = await Product_Service.findProductById(productId);
    if (!product) throw new Error('Product not found');

    const query = { product: productId };
    if (variantId) query.variant = variantId;

    return await Rating.find(query).populate('user', 'userName email');
};

// ====================== UPDATE RATING ======================
const updateRating = async (ratingId, userId, newRatingValue) => {
    const rating = await Rating.findById(ratingId);
    if (!rating) throw new Error('Rating not found');

    if (rating.user.toString() !== userId.toString()) throw new Error('Unauthorized');

    rating.rating = newRatingValue;
    await rating.save();

    return rating;
};

// ====================== DELETE RATING ======================
const deleteRating = async (ratingId, userId) => {
    const rating = await Rating.findById(ratingId);
    if (!rating) throw new Error('Rating not found');

    if (rating.user.toString() !== userId.toString()) throw new Error('Unauthorized');

    // Remove from user
    await User.findByIdAndUpdate(userId, { $pull: { ratings: rating._id } });

    // Remove from product or variant
    const product = await Product.findById(rating.product);
    if (product) {
        if (rating.variant) {
            const variant = product.variants.id(rating.variant);
            if (variant) {
                variant.ratings = variant.ratings.filter(r => r.toString() !== rating._id.toString());
                variant.numRatings = variant.ratings.length;
            }
        } else {
            product.ratings = product.ratings.filter(r => r.toString() !== rating._id.toString());
            product.numRatings = product.ratings.length;
        }
        await product.save();
    }

    // Delete rating document
    await Rating.findByIdAndDelete(ratingId);

    return { message: 'Rating deleted successfully' };
};

module.exports = {
    createRating,
    getAllRatings,
    updateRating,
    deleteRating
};
