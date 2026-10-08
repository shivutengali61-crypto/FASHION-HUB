import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { CustomerReview, Product } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onSubmitReview: (review: CustomerReview) => void;
  defaultCustomerName?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubmitReview,
  defaultCustomerName = '',
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState(defaultCustomerName || '');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!comment.trim() || comment.length < 10) {
      setError('Please share at least 10 characters in your review feedback');
      return;
    }

    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      customerName: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      isVerifiedPurchase: true,
      location: location.trim() || 'Verified Customer',
    };

    onSubmitReview(newReview);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white max-w-lg w-full rounded-sm shadow-2xl overflow-hidden border border-gray-200">
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-[#FBFBFA]">
          <div>
            <h3 className="text-base font-bold text-gray-900">Write a Product Review</h3>
            <p className="text-xs text-gray-500 mt-0.5">{product.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded border border-red-200">
              {error}
            </div>
          )}

          {/* Star Rating Select */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Overall Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-gray-500 font-medium ml-2">
                {rating === 5 && 'Outstanding'}
                {rating === 4 && 'Very Good'}
                {rating === 3 && 'Average'}
                {rating === 2 && 'Below Average'}
                {rating === 1 && 'Poor'}
              </span>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full text-xs p-2.5 border border-gray-300 rounded-none focus:border-black focus:outline-none"
            />
          </div>

          {/* City / Location */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              City / Location (Optional)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bengaluru"
              className="w-full text-xs p-2.5 border border-gray-300 rounded-none focus:border-black focus:outline-none"
            />
          </div>

          {/* Review comment */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Review & Experience *
            </label>
            <textarea
              rows={4}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe the fabric quality, fitting, comfort and finish..."
              className="w-full text-xs p-2.5 border border-gray-300 rounded-none focus:border-black focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 p-2.5 border border-emerald-200">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Review will be tagged with "Verified Purchase" status.</span>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-xs font-semibold hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
