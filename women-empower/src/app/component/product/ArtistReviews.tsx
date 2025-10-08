'use client';
import React, { useEffect, useState } from 'react';
import { Star, ArrowUpDown, Filter, Music, Palette, Camera } from 'lucide-react';
import { getArtistReview } from '@/app/lib/api';

interface Review {
  id: number;
  rating: number;
  title: string;
  rating_description: string;
  date: string;
  verified?: boolean;
  reviewerName?: string;
}

const ArtistReviews: React.FC = () => {
  const [sortBy, setSortBy] = useState('Relevance');
  const [filterBy, setFilterBy] = useState('All Star');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewDescription, setNewReviewDescription] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [displayCount, setDisplayCount] = useState(4);
  const artistID='0667079c-90a9-4e17-a426-bddb8430672c'
  
  const userID= "a55a6087-3c15-415f-a4c3-f1d1d7825846"
    const [reviews, setReviews] = useState<Review[]>([
   
  ]);
  useEffect(() => {
    fetchReviews();
  }, [artistID]);

  const fetchReviews = async () => {
    const data = await getArtistReview(artistID);
    if (data && data.data) setReviews(data.data);
  };

  // Sample reviews data - using state to allow adding new reviews


  // Function to handle adding new review
  // const handleSubmitReview = () => {
  //   if (newReviewRating > 0 && newReviewTitle.trim() && newReviewDescription.trim() && reviewerName.trim()) {
  //     const newReview: Review = {
  //       id: Math.max(...reviews.map(r => r.id)) + 1,
  //       rating: newReviewRating,
  //       title: newReviewTitle.trim(),
  //       description: newReviewDescription.trim(),
  //       timeAgo: "Just now",
  //       verified: true,
  //       reviewerName: reviewerName.trim()
  //     };
      
  //     // Add new review to the beginning of the array
  //     setReviews([newReview, ...reviews]);
      
  //     // Reset form
  //     setNewReviewRating(0);
  //     setNewReviewTitle('');
  //     setNewReviewDescription('');
  //     setReviewerName('');
  //     setShowWriteReview(false);
      
  //     // Reset display count to show all reviews including the new one
  //     setDisplayCount(4);
  //   }
  // };
  const handleSubmitReview = async () => {
  if (!newReviewRating || !newReviewDescription || !artistID || !userID) {
    alert("Please fill all fields and select a rating");
    return;
  }

  const body = {
    artist_id: artistID, // pass as prop
    user_id: userID, // pass as prop
    rating: newReviewRating,
    rating_description: newReviewDescription,
  };

  try {
    const response = await fetch("http://localhost:7000/v1/artist-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      console.log("✅ Review submitted successfully");
      setShowWriteReview(false);
    } else {
      console.error("❌ Failed to submit review", response.status);
    }
  } catch (error) {
    console.error("❌ Error submitting review", error);
  }
};


  // Filter reviews based on selected filter
  const filteredReviews = reviews.filter(review => {
    if (filterBy === 'All Star') return true;
    const starRating = parseInt(filterBy.split(' ')[0]);
    return review.rating === starRating;
  });

  // Sort filtered reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'Newest':
        return b.id - a.id; // Assuming higher ID means newer
      case 'Oldest':
        return a.id - b.id;
      case 'Highest Rating':
        return b.rating - a.rating;
      case 'Lowest Rating':
        return a.rating - b.rating;
      default:
        return 0; // Relevance - keep original order
    }
  });

  // Get reviews to display (limited by displayCount)
  const displayedReviews = sortedReviews.slice(0, displayCount);
  const hasMoreReviews = sortedReviews.length > displayCount;

  const ratingDistribution = [
    { stars: 5, count: 38, percentage: 86.4 },
    { stars: 4, count: 5, percentage: 11.4 },
    { stars: 3, count: 1, percentage: 2.3 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const renderStars = (rating: number, size: 'small' | 'medium' = 'medium', interactive: boolean = false) => {
    const sizeClass = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
    return (
      <div className={`flex items-center gap-1`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star} 
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => interactive && setNewReviewRating(star)}
          >
            {star <= rating ? 
              <Star className={sizeClass} fill="currentColor" /> : 
              <Star className={sizeClass} />
            }
          </button>
        ))}
      </div>
    );
  };

  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="bg-[#f1f2f4] py-2 sm:py-2 px-2 sm:px-4">
      <div className="min-h-screen bg-white rounded-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white">
            
            {/* Header Section */}
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      Artist Reviews
                    </h1>
                  </div>
                </div>
                <button 
                  onClick={() => setShowWriteReview(!showWriteReview)}
                  className="bg-[#685845] hover:bg-[#61503c] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {/* Rating Overview Section */}
            <div className="px-6 sm:px-8 py-6 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                
                {/* Overall Rating */}
                <div className="text-center lg:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-center lg:justify-start gap-4">
                    <div className="text-6xl font-bold text-gray-900">{averageRating}</div>
                    <div className="flex flex-col items-center sm:items-start mb-2">
                      <div className="mb-2">
                        {renderStars(Math.round(parseFloat(averageRating)))}
                      </div>
                      <p className="text-gray-600 text-sm">
                        Based on {reviews.length} reviews
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Music className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500">Performance & Artistry</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium text-gray-700">{item.stars}</span>
                        <Star className="text-yellow-400 w-4 h-4" fill="currentColor" />
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
            {showWriteReview && (
             <div className="px-6 sm:px-8 py-6 bg-blue-50 border-b border-gray-200">
  <div className="max-w-2xl">
    <div className="flex items-center gap-3 mb-4">
      <Camera className="w-6 h-6 text-gray-600" />
      <h3 className="text-xl font-semibold text-gray-900">Write Your Artist Review</h3>
    </div>
    <div className="space-y-4">
      
      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating
        </label>
        <div className="flex items-center gap-2">
          {renderStars(newReviewRating, "medium", true)}
          <span className="text-sm text-gray-600 ml-2">
            {newReviewRating > 0 ? `${newReviewRating} out of 5` : "Click to rate"}
          </span>
        </div>
      </div>

      {/* Your Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your name"
        />
      </div>

      {/* Review Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Review Title
        </label>
        <input
          type="text"
          value={newReviewTitle}
          onChange={(e) => setNewReviewTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Summarize your experience with this artist"
        />
      </div>

      {/* Review Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          rows={4}
          value={newReviewDescription}
          onChange={(e) => setNewReviewDescription(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Share your thoughts about this artist's work, performance, or creativity."
        />
      </div>

      {/* Buttons */}
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

            )}

            {/* Filters and Sort Section */}
            <div className="px-6 sm:px-8 py-4 bg-white border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Fan Reviews ({sortedReviews.length})
                </h3>
                
                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="text-gray-400 w-4 h-4" />
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
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
                    <Filter className="text-gray-400 w-4 h-4" />
                    <select 
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
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
              {displayedReviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={review.id} className={`${index !== displayedReviews.length - 1 ? 'border-b border-gray-200' : ''} pb-6`}>
                      <div className="flex flex-col gap-3">
                        
                        {/* Rating and Verification */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {renderStars(review.rating, 'small')}
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                ✓ Verified Fan
                              </span>
                            )}
                          </div>
                          {review.reviewerName && (
                            <span className="text-sm font-medium text-gray-600">
                              {review.rating_description}
                            </span>
                          )}
                        </div>

                        {/* Review Title */}
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {review.rating_description}
                        </h4>

                        {/* Review Description */}
                        <p className="text-gray-700 leading-relaxed">
                          {review.rating_description}
                        </p>

                        {/* Review Footer */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Palette className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No reviews found for the selected filter.</p>
                  <p className="text-gray-400 text-sm mt-2">Be the first to share your thoughts about this artist!</p>
                </div>
              )}

              {/* Load More Button */}
              {hasMoreReviews && (
                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => setDisplayCount(displayCount + 4)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Load More Reviews
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistReviews;