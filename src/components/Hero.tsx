import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { useBooking } from '../context/BookingContext';
import { MessageCircle, Search, Calendar, Users, ShieldCheck, Compass, CheckCircle2, Headphones, Tag } from 'lucide-react';

interface HeroProps {
  navigate: (path: string) => void;
  onSearchSubmit?: (filters: { tourId: string; date: string; adults: number; children: number }) => void;
}

export const Hero: React.FC<HeroProps> = ({ navigate, onSearchSubmit }) => {
  const { t, language } = useLanguage();
  const { tours, settings } = useTours();
  const { openBooking } = useBooking();

  const [selectedTourId, setSelectedTourId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  // Minimum allowed date is today
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTourId) {
      const tour = tours.find(t => t.id === selectedTourId);
      if (tour) {
        openBooking({
          tour,
          date: selectedDate,
          adults,
          children: childrenCount
        });
        return;
      }
    }
    if (onSearchSubmit) {
      onSearchSubmit({
        tourId: selectedTourId,
        date: selectedDate,
        adults,
        children: childrenCount
      });
    } else {
      navigate('/tours');
    }
  };

  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  return (
    <section className="relative bg-stone-900 text-white overflow-hidden">
      
      {/* Background Hero Image with Mediterranean Aesthetic */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85"
          alt="Alanya Mediterranean coastline and turquoise waters"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform motion-safe:transition-transform duration-1000"
          loading="eager"
        />
        {/* Gradients to ensure WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-900/60" />
        <div className="absolute inset-0 bg-emerald-950/30 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 lg:pb-24">
        
        {/* Main Hero Copy */}
        <div className="max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-sm">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            {t.hero.headline}
          </h1>

          <p className="text-base sm:text-xl text-stone-200 leading-relaxed max-w-2xl font-light">
            {t.hero.subtitle}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                navigate('/tours');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-900/40 transition active:scale-95"
            >
              {t.hero.exploreBtn}
            </button>

            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-sm transition active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>{t.hero.whatsappBtn}</span>
            </a>
          </div>

        </div>

        {/* Compact Booking Search Interface */}
        <div className="mt-12 lg:mt-16 bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-stone-200 text-stone-900">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 lg:gap-4 items-end">
            
            {/* Tour Select */}
            <div className="space-y-1.5">
              <label htmlFor="hero-tour-select" className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                {t.hero.searchTour}
              </label>
              <div className="relative">
                <select
                  id="hero-tour-select"
                  value={selectedTourId}
                  onChange={(e) => setSelectedTourId(e.target.value)}
                  className="w-full h-11 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                >
                  <option value="">{t.hero.allToursOption}</option>
                  {tours.map((tour) => {
                    const tourName = tour.translations[language]?.name || tour.translations.en.name;
                    return (
                      <option key={tour.id} value={tour.id}>
                        {tourName} — €{tour.price}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Date Select */}
            <div className="space-y-1.5">
              <label htmlFor="hero-date-select" className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                {t.hero.selectDate}
              </label>
              <div className="relative">
                <input
                  id="hero-date-select"
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full h-11 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Adults Counter */}
            <div className="space-y-1.5">
              <label htmlFor="hero-adults-input" className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                {t.hero.adults}
              </label>
              <div className="flex items-center h-11 bg-stone-50 border border-stone-300 rounded-xl px-2">
                <button
                  type="button"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-8 h-8 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold flex items-center justify-center transition"
                >
                  -
                </button>
                <input
                  id="hero-adults-input"
                  type="text"
                  readOnly
                  aria-label={t.hero.adults}
                  value={adults}
                  className="w-full text-center font-bold text-sm bg-transparent border-0 focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setAdults(adults + 1)}
                  className="w-8 h-8 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold flex items-center justify-center transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children Counter */}
            <div className="space-y-1.5">
              <label htmlFor="hero-children-input" className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                {t.hero.children}
              </label>
              <div className="flex items-center h-11 bg-stone-50 border border-stone-300 rounded-xl px-2">
                <button
                  type="button"
                  onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                  className="w-8 h-8 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold flex items-center justify-center transition"
                >
                  -
                </button>
                <input
                  id="hero-children-input"
                  type="text"
                  readOnly
                  aria-label={t.hero.children}
                  value={childrenCount}
                  className="w-full text-center font-bold text-sm bg-transparent border-0 focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setChildrenCount(childrenCount + 1)}
                  className="w-8 h-8 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold flex items-center justify-center transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Search CTA */}
            <div>
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20 transition"
              >
                <Search className="w-4 h-4" />
                <span>{selectedTourId ? t.hero.whatsappBtn : t.hero.searchBtn}</span>
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Trust Indicators Bar directly below Hero */}
      <div className="relative z-10 bg-white border-y border-stone-200 text-stone-800 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 leading-snug">
                {t.trust.whatsappBooking}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                {t.trust.whatsappBookingSub}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 leading-snug">
                {t.trust.localAssistance}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                {t.trust.localAssistanceSub}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 leading-snug">
                {t.trust.clearPrices}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                {t.trust.clearPricesSub}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900 leading-snug">
                {t.trust.friendlySupport}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                {t.trust.friendlySupportSub}
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
