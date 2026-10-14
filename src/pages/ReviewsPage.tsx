import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { Review } from '../types';
import { Star, MessageSquare, Plus, CheckCircle2, AlertCircle, Compass } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { tours } = useTours();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [selectedTourId, setSelectedTourId] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.warn('Could not fetch reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !text.trim()) return;

    const tourObj = tours.find(t => t.id === selectedTourId);
    const tourName = tourObj?.translations[language]?.name || tourObj?.translations.en.name || 'Alanya Excursion';

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: selectedTourId,
          tourName,
          customerName,
          rating,
          text,
          language
        })
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        fetchReviews();
        setTimeout(() => {
          setShowSubmitModal(false);
          setSubmittedSuccess(false);
          setCustomerName('');
          setText('');
        }, 1800);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
            Genuine Tourist Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.reviews.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            {t.reviews.note}
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.reviews.leaveReview}</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-stone-400">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                "{rev.text}"
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="font-bold text-stone-900">{rev.customerName}</div>
              <div className="text-emerald-800 font-medium truncate max-w-[140px]">
                {rev.tourName || 'Alanya Excursion'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Review Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-5">
            <h3 className="text-lg font-bold text-stone-900">
              {t.reviews.leaveReview}
            </h3>

            {submittedSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-stone-900">{t.reviews.thankYou}</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    {t.reviews.yourName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    {t.reviews.selectTour}
                  </label>
                  <select
                    value={selectedTourId}
                    onChange={(e) => setSelectedTourId(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                  >
                    <option value="">General Experience</option>
                    {tours.map((tour) => (
                      <option key={tour.id} value={tour.id}>
                        {tour.translations[language]?.name || tour.translations.en.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    {t.reviews.rating}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center transition ${
                          rating >= num
                            ? 'bg-amber-400 text-stone-950 shadow-xs'
                            : 'bg-stone-100 text-stone-400'
                        }`}
                      >
                        {num}★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    {t.reviews.yourReview} *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold"
                  >
                    {t.reviews.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
