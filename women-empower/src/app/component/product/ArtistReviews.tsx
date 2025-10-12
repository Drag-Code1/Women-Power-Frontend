'use client';
import React, { useState, useEffect } from 'react';
import { Star, ArrowUpDown, Filter, Music, Palette, Camera } from 'lucide-react';
import { getArtistReviewsApi, createArtistReviewApi } from '../../lib/artistReviewApi';
import { ArtistReview } from '../../types/artistReview';
import { useAuth } from '../../contexts/AuthContext';
import { getCurrentToken, getCurrentUser } from '../../lib/authenticatedApi';

interface Review {
  id: string;
  rating: number;
  title: string;
  description: string;
  timeAgo: string;
  verified?: boolean;
  reviewerName?: string;
}

interface ArtistReviewsProps {
  artistId: string;
}

const ArtistReviews: React.FC<ArtistReviewsProps> = ({ artistId }) => {
  const { user, token } = useAuth();
  const [sortBy, setSortBy] = useState('Relevance');
  const [filterBy, setFilterBy] = useState('All Star');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewDescription, setNewReviewDescription] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [displayCount, setDisplayCount] = useState(4);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      if (!artistId) return;
      
      try {
        setLoading(true);
        setError(null);
        const currentToken = token || getCurrentToken();
        const apiReviews = await getArtistReviewsApi(artistId, currentToken || undefined);
        
        // Transform API reviews to component format
        const transformedReviews: Review[] = apiReviews.map((review: ArtistReview) => ({
          id: review.id,
          rating: review.rating,
          title: review.rating_description.substring(0, 50) + (review.rating_description.length > 50 ? '...' : ''),
          description: review.rating_description,
          timeAgo: review.date ? new Date(review.date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : 'Recently',
          verified: true,
          reviewerName: review.user ? `${review.user.firstName} ${review.user.lastName}` : 'Anonymous'
        }));
        
        setReviews(transformedReviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
        // Fallback to empty array
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [artistId]);

  // Function to handle adding new review
  const handleSubmitReview = async () => {
    // Get current user and token from localStorage
    const currentUser = user || getCurrentUser();
    const currentToken = token || getCurrentToken();
    
    // Debug: Log authentication status
    console.log('🔐 User from context:', user);
    console.log('🔐 User from localStorage:', currentUser);
    console.log('🎫 Token from context:', token);
    console.log('🎫 Token from localStorage:', currentToken);
    console.log('✅ Is Authenticated:', !!currentUser && !!currentToken);
    
    if (!currentUser || !currentToken) {
      alert('Please login to write a review');
      return;
    }

    if (newReviewRating > 0 && newReviewDescription.trim()) {
      try {
        setSubmitting(true);
        
        const reviewData = {
          artist_id: artistId,
          user_id: currentUser.id,
          rating: newReviewRating,
          rating_description: newReviewDescription.trim()
        };

        await createArtistReviewApi(reviewData, currentToken || undefined);
        
        // Create new review for immediate UI update
        const newReview: Review = {
          id: Date.now().toString(), // Temporary ID
          rating: newReviewRating,
          title: newReviewDescription.trim().substring(0, 50) + (newReviewDescription.trim().length > 50 ? '...' : ''),
          description: newReviewDescription.trim(),
          timeAgo: "Just now",
          verified: true,
          reviewerName: `${currentUser.firstName} ${currentUser.lastName}`
        };
        
        // Add new review to the beginning of the array
        setReviews([newReview, ...reviews]);
        
        // Reset form
        setNewReviewRating(0);
        setNewReviewTitle('');
        setNewReviewDescription('');
        setReviewerName('');
        setShowWriteReview(false);
        
        // Reset display count to show all reviews including the new one
        setDisplayCount(4);
        
        alert('Review submitted successfully!');
      } catch (err) {
        console.error('Error submitting review:', err);
        alert(err instanceof Error ? err.message : 'Failed to submit review');
      } finally {
        setSubmitting(false);
      }
    } else {
      alert('Please provide a rating and review description');
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
                  {!user ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">Please login to write a review</p>
                      <button 
                        onClick={() => setShowWriteReview(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
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
                          Your Review
                        </label>
                        <textarea 
                          rows={4}
                          value={newReviewDescription}
                          onChange={(e) => setNewReviewDescription(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder="Share your thoughts about this artist's work, performance, or creativity. What impressed you most?"
                        />
                      </div>
                      
                      <div className="flex gap-3 pt-2">
                        <button 
                          onClick={handleSubmitReview}
                          disabled={submitting}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                        >
                          {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                        <button 
                          onClick={() => setShowWriteReview(false)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
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
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#61503c]"></div>
                </div>
              ) : error ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Error loading reviews
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {error}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-[#61503c] text-white px-6 py-2 rounded-md hover:bg-[#7a5b3e] transition-all duration-200 transform hover:scale-105"
                  >
                    Try Again
                  </button>
                </div>
              ) : displayedReviews.length > 0 ? (
                <div className="space-y-6">
                  {displayedReviews.map((review, index) => (
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
                              {review.reviewerName}
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