"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";

// Validation schema
const reviewSchema = z.object({
  rating: z.number().min(1, "Please give a rating between 1 and 5"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Review must be at least 10 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function ReviewForm({ submitReview }: { submitReview: (data: ReviewFormData) => Promise<void> }) {
  const [rating, setRating] = useState(0);
  const searchParams=useSearchParams();
  const formState=searchParams.get('review-frm')
const url=new URLSearchParams(searchParams.toString())
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data: ReviewFormData) => {
    await submitReview({ ...data, rating });
    setRating(0);
  };

  return (
  formState &&  <form onSubmit={handleSubmit(onSubmit)} className="px-6 sm:px-8 py-6 bg-blue-50 border-b border-gray-200">
      <div className="max-w-2xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Write Your Review</h3>
        <div className="space-y-4">

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex items-center gap-2">
              {/* Simple stars (replace with your renderStars function if you want) */}
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    setValue("rating", star, { shouldValidate: true });
                  }}
                  className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
              <span className="text-sm text-gray-600 ml-2">
                {rating > 0 ? `${rating} out of 5` : "Click to rate"}
              </span>
            </div>
            {errors.rating && <p className="text-sm text-red-500 mt-1">{errors.rating.message}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Summarize your experience in a few words"
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              rows={4}
              {...register("description")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Share your thoughts about this product. What did you like or dislike about it?"
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
      onClick={()=>{

url.delete('review-frm')
   history.pushState(null, '', `?${url.toString()}`);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
