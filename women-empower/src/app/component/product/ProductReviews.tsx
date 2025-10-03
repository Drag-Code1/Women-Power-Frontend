// 'use client';
import React from 'react';
import { Star, StarBorder, Sort, FilterList } from '@mui/icons-material';
import ReviewForm from '../ui/forms/AddProductReviewForm';
import { submitReviewAction } from '@/app/services/productDetailsService';
import { WriteReview } from '../ui/button/WriteReview';

interface Review {
  id: number;
  rating: number;
  title: string;
  description: string;
  timeAgo: string;
  verified?: boolean;
}

const ProductReviews: React.FC = () => {
  // const [sortBy, setSortBy] = useState('Relevance');
  // const [filterBy, setFilterBy] = useState('All Star');
  // const [showWriteReview, setShowWriteReview] = useState(false);
  // const [newReviewRating, setNewReviewRating] = useState(0);
  // const [newReviewTitle, setNewReviewTitle] = useState('');
  // const [newReviewDescription, setNewReviewDescription] = useState('');
  // const [displayCount, setDisplayCount] = useState(4);

  // Sample reviews data - using state to allow adding new reviews
const reviewData=[
    {
      id: 1,
      rating: 5,
      title: "Love these Skincare ! Really amazing",
      description: "I really wanted to love this but it doesn't look quite right on me. The serum that should sit under the bust area feels comfortable and the results are visible within a week.",
      timeAgo: "3 days ago",
      verified: true
    },
    {
      id: 2,
      rating: 5,
      title: "Perfect hydration for my skin",
      description: "This serum has completely transformed my skincare routine. My skin feels so much more hydrated and looks glowing. The texture is lightweight yet deeply moisturizing.",
      timeAgo: "1 week ago",
      verified: true
    },
    {
      id: 3,
      rating: 5,
      title: "Best serum I've ever used",
      description: "Amazing results! My fine lines are less visible and my skin texture has improved significantly. Worth every penny and I'll definitely repurchase.",
      timeAgo: "2 weeks ago"
    },
    {
      id: 4,
      rating: 4,
      title: "Great value for money",
      description: "Quality product at a reasonable price. The packaging is elegant and the serum absorbs quickly without leaving any sticky residue on the skin.",
      timeAgo: "1 month ago",
      verified: true
    }
  ]

  // Function to handle adding new review
  // const handleSubmitReview = () => {
  //   if (newReviewRating > 0 && newReviewTitle.trim() && newReviewDescription.trim()) {
  //     const newReview: Review = {
  //       id: Math.max(...reviews.map(r => r.id)) + 1,
  //       rating: newReviewRating,
  //       title: newReviewTitle.trim(),
  //       description: newReviewDescription.trim(),
  //       timeAgo: "Just now",
  //       verified: true
  //     };
      
  //     // Add new review to the beginning of the array
  //     setReviews([newReview, ...reviews]);
      
  //     // Reset form
  //     setNewReviewRating(0);
  //     setNewReviewTitle('');
  //     setNewReviewDescription('');
  //     setShowWriteReview(false);
      
  //     // Reset display count to show all reviews including the new one
  //     setDisplayCount(4);
  //   }
  // };

  // // Filter reviews based on selected filter
  // const filteredReviews = reviews.filter(review => {
  //   if (filterBy === 'All Star') return true;
  //   const starRating = parseInt(filterBy.split(' ')[0]);
  //   return review.rating === starRating;
  // });

  // Sort filtered reviews
  // const sortedReviews = [...filteredReviews].sort((a, b) => {
  //   switch (sortBy) {
  //     case 'Newest':
  //       return b.id - a.id; // Assuming higher ID means newer
  //     case 'Oldest':
  //       return a.id - b.id;
  //     case 'Highest Rating':
  //       return b.rating - a.rating;
  //     case 'Lowest Rating':
  //       return a.rating - b.rating;
  //     default:
  //       return 0; // Relevance - keep original order
  //   }
  // });

  // // Get reviews to display (limited by displayCount)
  // const displayedReviews = sortedReviews.slice(0, displayCount);
  // const hasMoreReviews = sortedReviews.length > displayCount;

  const ratingDistribution = [
    { stars: 5, count: 43, percentage: 97.7 },
    { stars: 4, count: 1, percentage: 2.3 },
    { stars: 3, count: 0, percentage: 0 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const renderStars = (rating: number, size: 'small' | 'medium' = 'medium', interactive: boolean = false) => {
    const sizeClass = size === 'small' ? 'text-sm' : 'text-lg';
    return (
      <div className={`flex items-center gap-1 ${sizeClass}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star} 
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            // onClick={() => interactive && setNewReviewRating(star)}
          >
            {star <= rating ? <Star fontSize="inherit" /> : <StarBorder fontSize="inherit" />}
          </button>
        ))}
      </div>
    );
  };

  // const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <div className="min-h-screen bg-white rounded-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white ">
          
          {/* Header Section */}
          <div className="px-6 sm:px-8 py-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Product Reviews
                </h1>
              </div>
              {/* <button 

                // onClick={() => setShowWriteReview(!showWriteReview)}
                className="bg-[#685845] hover:bg-[#61503c] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                Write a Review
              </button> */}
              <WriteReview />
            </div>
          </div>

          {/* Rating Overview Section */}
          <div className="px-6 sm:px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Overall Rating */}
              <div className="text-center lg:text-left">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-center lg:justify-start gap-4">
                  <div className="text-6xl font-bold text-gray-900">
                    {/* {averageRating}  */}
                    90
                  </div>
                  <div className="flex flex-col items-center sm:items-start mb-2">
                    <div className="mb-2">
                      {/* {renderStars(Math.round(parseFloat(averageRating)))} */}
                    </div>
                    <p className="text-gray-600 text-sm">
                      Based on {reviewData.length} reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium text-gray-700">{item.stars}</span>
                      <Star className="text-yellow-400 text-sm" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right font-medium">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Write Review Form */}
          {/* {showWriteReview && (
            <div className="px-6 sm:px-8 py-6 bg-blue-50 border-b border-gray-200">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Write Your Review</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {renderStars(newReviewRating, 'medium', true)}
                      <span className="text-sm text-gray-600 ml-2">
                        {newReviewRating > 0 ? `${newReviewRating} out of 5` : 'Click to rate'}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Title
                    </label>
                    <input 
                      type="text" 
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Summarize your experience in a few words"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea 
                      rows={4}
                      value={newReviewDescription}
                      onChange={(e) => setNewReviewDescription(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Share your thoughts about this product. What did you like or dislike about it?"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={handleSubmitReview}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                    >
                      Submit Review
                    </button>
                    <button 
                      onClick={() => setShowWriteReview(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )} */}
{/* form here */}
<ReviewForm submitReview={submitReviewAction} />

          {/* Filters and Sort Section */}
          <div className="px-6 sm:px-8 py-4 bg-white border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Customer Reviews ({76})
              </h3>
              
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <Sort className="text-gray-400" fontSize="small" />
                  <select 
                    // value={sortBy}
                    // onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Relevance">Most Relevant</option>
                    <option value="Newest">Newest First</option>
                    <option value="Oldest">Oldest First</option>
                    <option value="Highest Rating">Highest Rating</option>
                    <option value="Lowest Rating">Lowest Rating</option>
                  </select>
                </div>

                {/* Filter Dropdown */}
                <div className="flex items-center gap-2">
                  <FilterList className="text-gray-400" fontSize="small" />
                  <select 
                    // value={filterBy}
                    // onChange={(e) => setFilterBy(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All Star">All Ratings</option>
                    <option value="5 Star">5 Stars Only</option>
                    <option value="4 Star">4 Stars Only</option>
                    <option value="3 Star">3 Stars Only</option>
                    <option value="2 Star">2 Stars Only</option>
                    <option value="1 Star">1 Star Only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="px-6 sm:px-8 py-6">
            {reviewData.length > 0 ? (
              <div className="space-y-6">
                {reviewData.map((review, index) => (
                  <div key={review.id} className={`${index !== reviewData.length - 1 ? 'border-b border-gray-200' : ''} pb-6`}>
                    <div className="flex flex-col gap-3">
                      
                      {/* Rating and Verification */}
                      <div className="flex items-center gap-3">
                        {renderStars(review.rating, 'small')}
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>

                      {/* Review Title */}
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {review.title}
                      </h4>

                      {/* Review Description */}
                      <p className="text-gray-700 leading-relaxed">
                        {review.description}
                      </p>

                      {/* Review Footer */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-gray-500">
                          {review.timeAgo}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No reviews found for the selected filter.</p>
              </div>
            )}

            {/* Load More Button */}
            {/* {hasMoreReviews && ( */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <button 
                  // onClick={() => setDisplayCount(displayCount + 4)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  Load More Reviews
                </button>
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductReviews;