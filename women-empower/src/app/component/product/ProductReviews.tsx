'use client';
import React, { useState } from 'react';
import { Star, StarBorder, Sort, FilterList, Add } from '@mui/icons-material';

interface Review {
  id: number;
  rating: number;
  title: string;
  description: string;
  timeAgo: string;
  verified?: boolean;
}

const ProductReviews: React.FC = () => {
  const [sortBy, setSortBy] = useState('Relevance');
  const [filterBy, setFilterBy] = useState('All Star');
  const [showWriteReview, setShowWriteReview] = useState(false);

  // Sample reviews data
  const reviews: Review[] = [
    {
      id: 1,
      rating: 5,
      title: "Love these Skincare ! Really amazing",
      description: "I really wanted to love this but it doesn't look quite right on me. The serum that should sit under the bust",
      timeAgo: "3 days ago",
      verified: true
    },
    {
      id: 2,
      rating: 5,
      title: "Perfect hydration for my skin",
      description: "This serum has completely transformed my skincare routine. My skin feels so much more hydrated and looks glowing.",
      timeAgo: "1 week ago",
      verified: true
    },
    {
      id: 3,
      rating: 5,
      title: "Best serum I've ever used",
      description: "Amazing results! My fine lines are less visible and my skin texture has improved significantly. Highly recommend!",
      timeAgo: "2 weeks ago"
    },
    {
      id: 4,
      rating: 5,
      title: "Great value for money",
      description: "Quality product at a reasonable price. The packaging is elegant and the serum absorbs quickly without leaving residue.",
      timeAgo: "1 month ago",
      verified: true
    }
  ];

  // Filter reviews based on selected filter
  const filteredReviews = reviews.filter(review => {
    if (filterBy === 'All Star') return true;
    const starRating = parseInt(filterBy.split(' ')[1]);
    return review.rating === starRating;
  });

  // Sort filtered reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
      case 'Oldest':
        return new Date(a.timeAgo).getTime() - new Date(b.timeAgo).getTime();
      case 'Highest Rating':
        return b.rating - a.rating;
      case 'Lowest Rating':
        return a.rating - b.rating;
      default:
        return 0; // Relevance - keep original order
    }
  });

  const ratingDistribution = [
    { stars: 5, count: 44, percentage: 100 },
    { stars: 4, count: 0, percentage: 0 },
    { stars: 3, count: 0, percentage: 0 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const renderStars = (rating: number, size: 'small' | 'medium' = 'medium') => {
    const sizeClass = size === 'small' ? 'text-sm' : 'text-base';
    return (
      <div className={`flex items-center ${sizeClass}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-yellow-400">
            {star <= rating ? <Star fontSize="inherit" /> : <StarBorder fontSize="inherit" />}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-sm">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-2">
            Ratings & Reviews of Lumēra Hydrating Renewal Serum
          </h2>
        </div>
        <button 
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base transition-colors duration-200"
        >
          Write a review
        </button>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Overall Rating */}
        <div className="flex items-start space-x-4">
          <div className="text-left">
            <div className="text-4xl md:text-5xl font-light text-gray-800 mb-2">5.0</div>
            <div className="text-gray-500 text-sm">/ 5</div>
            <div className="flex items-center mt-2">
              {renderStars(5)}
            </div>
            <div className="text-gray-500 text-sm mt-1">44 Reviews</div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-12">
                {renderStars(item.stars, 'small')}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

          {/* Write Review Modal/Form */}
          {showWriteReview && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-base font-medium mb-3">Write a Review</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Rating</div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-gray-300 hover:text-yellow-400 transition-colors">
                        <Star fontSize="small" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Review Title</div>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Give your review a title"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Review</div>
                  <textarea 
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Tell others about your experience"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Submit Review
                  </button>
                  <button 
                    onClick={() => setShowWriteReview(false)}
                    className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters and Sort - Compact Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-800">Product Reviews</h3>
            
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1">
                <Sort className="text-gray-500" fontSize="small" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs bg-transparent border-none focus:outline-none text-gray-600 cursor-pointer"
                >
                  <option value="Relevance">Sort: Relevance</option>
                  <option value="Newest">Sort: Newest</option>
                  <option value="Oldest">Sort: Oldest</option>
                  <option value="Highest Rating">Sort: Highest Rating</option>
                  <option value="Lowest Rating">Sort: Lowest Rating</option>
                </select>
              </div>

              {/* Filter Dropdown */}
              <div className="flex items-center gap-1">
                <FilterList className="text-gray-500" fontSize="small" />
                <select 
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="text-xs bg-transparent border-none focus:outline-none text-gray-600 cursor-pointer"
                >
                  <option value="All Star">Filter: All Star</option>
                  <option value="5 Star">Filter: 5 Star</option>
                  <option value="4 Star">Filter: 4 Star</option>
                  <option value="3 Star">Filter: 3 Star</option>
                  <option value="2 Star">Filter: 2 Star</option>
                  <option value="1 Star">Filter: 1 Star</option>
                </select>
              </div>
            </div>
          </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                {/* Rating Stars */}
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(review.rating, 'small')}
                  {review.verified && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>

                {/* Review Title */}
                <h4 className="font-medium text-gray-800 mb-2 text-sm md:text-base">
                  {review.title}
                </h4>

                {/* Review Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
                  {review.description}
                </p>

                {/* Time and Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-400">
                    {review.timeAgo}
                  </span>
                  
                  <div className="flex items-center space-x-4">
                    <button className="text-xs md:text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      Helpful
                    </button>
                    <button className="text-xs md:text-sm text-gray-500 hover:text-gray-700 transition-colors">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium">
          Load More Reviews
        </button>
      </div>
    </div>
    </div>
  );
};

export default ProductReviews;