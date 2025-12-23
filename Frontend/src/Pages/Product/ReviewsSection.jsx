import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Card } from './Image';
import { Button } from '../../UI/Button';



export const ReviewsSection = () => {
  const [reviews, setReviews] = useState([
    {
      id: '1',
      userName: 'Sarah Johnson',
      userImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      date: '2025-10-05',
      comment: 'This course exceeded my expectations! The instructors are incredibly knowledgeable and the content is well-structured. I learned so much and can already apply it to my projects.',
      helpful: 24
    },
    {
      id: '2',
      userName: 'Michael Chen',
      userImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      date: '2025-10-03',
      comment: 'Amazing course with practical examples. The hands-on projects really helped solidify my understanding. Highly recommend to anyone looking to level up their skills!',
      helpful: 18
    },
    {
      id: '3',
      userName: 'Emily Rodriguez',
      userImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4,
      date: '2025-09-28',
      comment: 'Great content and very informative. The pace is perfect for beginners. Would love to see more advanced topics in a follow-up course.',
      helpful: 12
    },
    {
      id: '4',
      userName: 'David Thompson',
      userImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      date: '2025-09-25',
      comment: 'Best investment I made this year! The instructors break down complex concepts into easy-to-understand lessons. The community support is excellent too.',
      helpful: 31
    }
  ]);

  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 0,
    comment: ''
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.userName && newReview.rating > 0 && newReview.comment) {
      const review = {
        id: Date.now().toString(),
        userName: newReview.userName,
        userImage: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200',
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        comment: newReview.comment,
        helpful: 0
      };
      setReviews([review, ...reviews]);
      setNewReview({ userName: '', rating: 0, comment: '' });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className=" px-5 py-12 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-2xl md:text-3xl text-gray-700 font-extrabold">
          Student Reviews & Ratings
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
            <div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{reviews.length} reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6  rounded-lg bg-white">
                <div className="flex gap-4">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover ring-4 ring-purple-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900">{review.userName}</h4>
                        <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                      <ThumbsUp size={16} />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-30 bg-white rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="text-emerald-600 w-6 h-6" />
              Write a Review
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newReview.userName}
                  onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                      onMouseEnter={() => setHoveredRating(i + 1)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={
                          i < (hoveredRating || newReview.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your experience with this course..."
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  required
                />
              </div>

              <Button title={'Submit Review'} />
                
           
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};
