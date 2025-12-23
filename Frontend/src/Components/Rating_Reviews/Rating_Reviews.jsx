import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews, createReview } from '../../State/Reviews/Action';
import { getAllRatings, createRating } from '../../State/Rating/Action';
import { findProductsById } from '../../State/Products/Action';

const Rating_Reviews = () => {
    const { productId } = useParams();
    const [searchParams] = useSearchParams();
    const variantId = searchParams.get('variant'); // optional variant
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const product = useSelector((state) => state.products.product);
    const ratingsRedux = useSelector((state) => state.ratings.ratings) || [];
    const reviewsRedux = useSelector((state) => state.reviews.reviews) || [];
    const [ratingError, setRatingError] = useState('');

    const [displayedProduct, setDisplayedProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    // Load product, ratings, reviews
    useEffect(() => {
        if (productId) {
            dispatch(findProductsById({ productId }));
            dispatch(getAllRatings(productId, variantId));
            dispatch(getAllReviews(productId, variantId));
        }
    }, [dispatch, productId, variantId]);

    // Determine displayed product/variant info
    useEffect(() => {
        if (!product) return;

        if (variantId && product.variants) {
            const variant = product.variants.find(v => v._id === variantId);
            if (variant) {
                setDisplayedProduct({
                    ...product,
                    title: variant.title || product.title,
                    images: variant.images || product.images,
                    color: variant.color || product.color,
                    discountedPrice: variant.discountedPrice || product.discountedPrice,
                    price: variant.price || product.price,
                    discountPercent: variant.discountPercent || product.discountPercent,
                    ratings: variant.ratings || [],
                    reviews: variant.reviews || [],
                });
                return;
            }
        }

        setDisplayedProduct(product);
    }, [product, variantId]);

    const displayRatings = displayedProduct?.ratings || ratingsRedux;
    const displayReviews = displayedProduct?.reviews || reviewsRedux;

    // Calculate average rating
    const calculateAverageRating = (ratingsArray) => {
        if (!ratingsArray || ratingsArray.length === 0) return 0;
        const total = ratingsArray.reduce((acc, r) => acc + r.rating, 0);
        return (total / ratingsArray.length).toFixed(1);
    };
    const averageRating = calculateAverageRating(displayRatings);


    // Submit Rating
    const handleSubmitRating = async () => {
        if (!rating) return alert('Select a rating first'); // Ensure user selects a star

        try {
            await dispatch(createRating(productId, rating, variantId));
            // Only runs if backend returns success
            dispatch(getAllRatings(productId, variantId)); // refresh ratings
            alert('Rating submitted!'); // show alert only on success
            setRating(0);
            setRatingError(''); // clear previous errors
        } catch (err) {
            // Show backend error (like duplicate rating)
            setRatingError(err.message || 'Failed to submit rating');
        }
    };


    // Submit Review
    const handleSubmitReview = () => {
        if (!reviewText.trim()) return alert('Write something first');
        dispatch(createReview(productId, reviewText, variantId))
            .then(() => {
                dispatch(getAllReviews(productId, variantId));
                alert('Review submitted!');
                setReviewText('');
            })
            .catch(err => console.error(err));
    };
    const userAlreadyRated = displayRatings.some(
        r => r.user?._id === user?._id && (variantId ? r.variant === variantId : !r.variant)
    );

    if (!displayedProduct) return <div>Loading...</div>;

    return (
        <div className="w-full px-5 py-5 space-y-5">
            <div className="w-full">
                <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-600">
                    Ratings & Reviews
                </h1>
            </div>

            {/* Product/Variant Info */}
            <div className="w-full flex gap-4 bg-white p-4 rounded-xl border border-gray-200">
                <div className="w-32 h-32 rounded-xl overflow-hidden">
                    <img
                        src={displayedProduct?.images?.[0]}
                        alt={displayedProduct?.title}
                        className="w-full h-full object-top object-cover"
                    />
                </div>
                <div className="rate-review space-y-1">
                    <div className="text-lg font-semibold text-gray-800">{displayedProduct?.title}</div>
                    <p className="text-sm font-semibold text-gray-600">{displayedProduct?.color}</p>
                    <div className="flex gap-5 items-center">
                        <p className="text-2xl font-semibold">₹{displayedProduct?.discountedPrice}</p>
                        <p className="text-lg font-semibold text-gray-600 line-through">₹{displayedProduct?.price}</p>
                        <p className="text-emerald-700 font-semibold text-lg">{displayedProduct?.discountPercent}% Off</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <p className="px-3 py-1 flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500">
                            {averageRating} <FaStar size={14} />
                        </p>
                        <div className="px-3 py-1 flex items-center bg-gray-100 border border-gray-200 rounded-xl">
                            ({displayReviews.length} reviews)
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Rating */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                <h2 className="text-lg font-semibold">Submit Your Rating</h2>
                <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                        <FaStar
                            key={star}
                            size={24}
                            className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            onClick={() => !userAlreadyRated && setRating(star)}
                        />
                    ))}

                    {userAlreadyRated ? (
                        <span className="ml-4 text-red-500 font-semibold">
                            You have already rated this
                        </span>
                    ) : ratingError ? (
                        <span className="ml-4 text-red-500 font-semibold">{ratingError}</span>
                    ) : (
                        <button
                            onClick={handleSubmitRating}
                            className="ml-4 px-3 py-1 bg-yellow-500 text-white rounded-lg"
                        >
                            Submit Rating
                        </button>
                    )}
                </div>

            </div>

            {/* Submit Review */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                <h2 className="text-lg font-semibold">Write a Review</h2>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    rows={4}
                    placeholder="Write your review..."
                />
                <button
                    onClick={handleSubmitReview}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                >
                    Submit Review
                </button>
            </div>

        </div>
    );
};

export default Rating_Reviews;
