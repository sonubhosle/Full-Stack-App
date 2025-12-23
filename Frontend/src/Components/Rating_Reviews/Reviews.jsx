import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getAllReviews,
  deleteReview,
  updateReview,
} from '../../State/Reviews/Action';
import { getAllRatings, updateRating } from '../../State/Rating/Action';
import { toast } from 'react-toastify';
import { FaStar, FaTimes } from 'react-icons/fa';
import { EllipsisVertical, SquarePen, Trash, X } from 'lucide-react';

const Reviews = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState('');

  // Modal state
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [currentRatingObj, setCurrentRatingObj] = useState(null);
  const [tempRating, setTempRating] = useState(0);

  const { reviews } = useSelector((state) => state.reviews);
  const { ratings } = useSelector((state) => state.ratings);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (productId) {
      dispatch(getAllReviews(productId));
      dispatch(getAllRatings(productId));
    }
  }, [dispatch, productId]);

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId))
      .then(() => {
        toast.success('Review deleted successfully');
        dispatch(getAllReviews(productId));
      })
      .catch(() => toast.error('Failed to delete review'));
  };

  const handleEditReview = (review) => {
    setEditingReviewId(review._id);
    setUpdatedDescription(review.description);
  };

  // Open rating modal
  const openRatingModal = (ratingObj) => {
    setCurrentRatingObj(ratingObj);
    setTempRating(ratingObj?.rating || 0);
    setRatingModalOpen(true);
  };

  // Submit updated rating
  const submitRatingUpdate = () => {
    if (!currentRatingObj) return;
    dispatch(updateRating(currentRatingObj._id, tempRating))
      .then(() => {
        toast.success('Rating updated successfully');
        setRatingModalOpen(false);
        dispatch(getAllRatings(productId));
      })
      .catch(() => toast.error('Failed to update rating'));
  };

  const handleUpdateReview = (reviewId) => {
    if (!updatedDescription.trim()) return toast.error('Review cannot be empty');

    dispatch(updateReview(reviewId, updatedDescription))
      .then(() => {
        toast.success('Review updated successfully');
        setEditingReviewId(null);
        setUpdatedDescription('');
        dispatch(getAllReviews(productId));
      })
      .catch(() => toast.error('Failed to update review'));
  };

  return (
    <div className="mb-15 px-5 relative">
      {reviews.length === 0 ? (
        <div className="w-full h-50 flex items-center justify-center">
          <div className="bg-white text-center rounded-xl px-5 py-5 border border-gray-200 space-y-2">
            <h1 className='text-4xl font-semibold text-gray-600'>Ohh No!</h1>
            <p className='text-lg font-semibold text-gray-700'>Rating & Reviews</p>
            <p className='bg-red-600/10 text-red-600 font-semibold border border-red-600/20 px-3 py-2 rounded-xl'>Not Found</p>
          </div>
        </div>
      ) : (
        reviews.map((review) => {
          const ratingObj = ratings.find(
            (r) => r.user?._id === review.user?._id && r.product === productId
          );

          return (
            <div key={review._id} className="bg-white  rounded-xl border border-gray-200 p-4 relative"
            >
              <div className="flex gap-3 border-b border-gray-200 pb-5">
                <div className="w-20 h-20 rounded-xl  overflow-hidden">
                  <img
                    src={review.user?.photo || '/default-avatar.png'}
                    alt={review.user?.name}
                    className="  object-contain "
                  />
                </div>
                <div className="">
                  <div className="font-semibold text-gray-800">
                    {review.user?.name} {review.user?.surname}
                  </div>

                  <div className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </div>

                  <div className="mt-2">
                    {ratingObj && (
                      <div className="flex items-center gap-1 mt-1   py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            size={20}
                            className={`${star <= ratingObj.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}

                        {/* Pencil icon */}
                        {user?._id === review.user?._id && (
                          <SquarePen
                            className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
                            size={20}
                            onClick={() => openRatingModal(ratingObj)}
                            title="Edit rating"
                          />
                        )}
                      </div>
                    )}

                  </div>


                </div>
              </div>

              <div className="flex items-center justify-between pt-5 w-full" >
                {editingReviewId === review._id ? (
                  <div className="flex flex-col space-y-2 mb-2">
                    <textarea
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                      rows={3}
                      className="border border-gray-200 rounded p-2 !w-100 resize-none outline-none focus:border-emerald-700 transition ease-in duration-200"
                    />
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleUpdateReview(review._id)}
                        className="cursor-pointer bg-emerald-700/10  text-emerald-700 px-3 py-1 rounded-xl border border-emerald-700/20"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setEditingReviewId(null)}
                        className="cursor-pointer flex items-center justify-center bg-red-500/10  text-red-500 w-10 h-10 rounded-full border border-red-500/20 absolute top-2 right-2"
                      >
                        <X className='w-5 h-5 ' />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 ">{review.description}</p>
                )}

                {user && user._id === review.user?._id &&
                  editingReviewId !== review._id && (
                    <div className="">
                      <button
                        onClick={() =>
                          setOpenMenuId(openMenuId === review._id ? null : review._id)
                        }
                        className="w-10 h-10 cursor-pointer rounded-full bg-gray-100 border text-gray-700 border-gray-200  flex items-center justify-center absolute top-2 right-2 "
                      >
                        <EllipsisVertical />
                      </button>

                      <div
                        className={`absolute top-10 overflow-hidden w-40  right-13 mt-1 bg-white border border-gray-200 rounded-xl shadow-md flex flex-col z-10 transition-all duration-200 ease-in-out transform origin-top-right
                          ${openMenuId === review._id
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-95 pointer-events-none'
                          }`}
                      >
                        <button
                          onClick={() => handleEditReview(review)}
                          className="px-3 py-1.5 flex gap-2 items-center cursor-pointer   hover:bg-emerald-700/10 hover:text-emerald-700 text-left transition ease-in duration-300 "
                        >
                          <SquarePen className='w-5 h-5 ' /> Edit Review
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="px-3 py-1.5 flex gap-2 items-center cursor-pointer   hover:bg-red-500/10 hover:text-red-500 text-left transition ease-in duration-300"
                        >
                          <Trash className='w-5 h-5 ' />  Delete Review
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          );
        })
      )}

      {/* Rating Modal */}
      {/* Modal */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-md flex justify-center items-center z-50 transition-opacity duration-300 ${ratingModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className={`bg-white rounded-xl p-5 w-100 relative transform transition-transform duration-300 ${ratingModalOpen ? 'scale-100' : 'scale-95'
            }`}
        >
          <button
            className="absolute w-10 h-10 flex items-center justify-center cursor-pointer rounded-full border border-gray-200 bg-gray-100 top-2 right-2 text-gray-600 "
            onClick={() => setRatingModalOpen(false)}
          >
            <X className='w-5 h-5' />
          </button>
          <div className="space-y-[2px]">
            <h1 className='text-2xl font-semibold text-gray-600'>Update Your Rating</h1>
            <p className='text-lg font-semibold text-emerald-700'>{user.name} {user.surname}</p>
          </div>
          <div className="flex mt-4 gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                className={`${star <= tempRating ? 'text-yellow-400' : 'text-gray-300'
                  } cursor-pointer transition-colors duration-150`}
                onClick={() => setTempRating(star)}
              />
            ))}
          </div>
          <div className="flex mt-7">

            <button
              className="px-3 py-1 rounded-xl bg-emerald-700/10 border border-emerald-700/20 text-emerald-800 cursor-pointer"
              onClick={submitRatingUpdate}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Reviews;
