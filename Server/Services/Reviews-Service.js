const Review = require('../Models/Review');
const Product = require('../Models/Product');
const User = require('../Models/User');
const Product_Service = require('../Services/Product-Service');

// ====================== CREATE REVIEW ======================
// Reviews-Service.js
const createReview = async (reqData, user) => {
    // Use Product.findById directly
    const product = await Product.findById(reqData.productId); // <-- must be Mongoose doc
    if (!product) throw new Error('Product not found');

    const variantId = reqData.variantId || reqData.varientId || null;

    const review = new Review({
        user: user._id,
        product: product._id,
        variant: variantId, 
        description: reqData.description,
        createdAt: new Date(),
    });

    const savedReview = await review.save();

    // Update reviews array
    if (variantId) {
        const variant = product.variants.id(variantId);
        if (!variant) throw new Error('Variant not found');
        variant.reviews.push(savedReview._id);
        variant.numReviews = variant.reviews.length;
    } else {
        product.reviews.push(savedReview._id);
        product.numReviews = product.reviews.length;
    }

    await product.save(); // now works because product is Mongoose doc

    await User.findByIdAndUpdate(user._id, { $push: { reviews: savedReview._id } });

    return savedReview;
};


// ====================== GET ALL REVIEWS ======================
const getAllReviews = async (productId, variantId = null) => {
    const product = await Product_Service.findProductById(productId);
    if (!product) throw new Error('Product not found');

    const query = { product: productId };
    if (variantId) query.variant = variantId;

    return await Review.find(query)
        .populate('user', 'name surname photo')
        .exec();
};

// ====================== UPDATE REVIEW ======================
const updateReview = async (reviewId, userId, updateData) => {
    const review = await Review.findById(reviewId);
    if (!review) throw new Error('Review not found');

    if (review.user.toString() !== userId.toString()) throw new Error('Unauthorized');

    review.description = updateData.description ?? review.description;
    await review.save();

    return await Review.findById(review._id).populate('user', 'name surname photo');
};

// ====================== DELETE REVIEW ======================
const deleteReview = async (reviewId, userId) => {
    const review = await Review.findById(reviewId);
    if (!review) throw new Error('Review not found');

    if (review.user.toString() !== userId.toString()) throw new Error('Unauthorized');

    const product = await Product.findById(review.product);
    if (product) {
        if (review.variant) {
            const variant = product.variants.id(review.variant);
            if (variant) {
                variant.reviews = variant.reviews.filter(r => r.toString() !== review._id.toString());
                variant.numReviews = variant.reviews.length;
            }
        } else {
            product.reviews = product.reviews.filter(r => r.toString() !== review._id.toString());
            product.numReviews = product.reviews.length;
        }
        await product.save();
    }

    // Remove from user
    await User.findByIdAndUpdate(userId, { $pull: { reviews: review._id } });

    await Review.findByIdAndDelete(reviewId);

    return { message: 'Review deleted successfully' };
};

module.exports = {
    createReview,
    getAllReviews,
    updateReview,
    deleteReview
};
