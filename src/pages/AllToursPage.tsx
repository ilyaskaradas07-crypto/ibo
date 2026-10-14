import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { TourCard } from '../components/TourCard';
import { Tour, TourCategory } from '../types';
import { Search, Filter, ArrowUpDown, Compass } from 'lucide-react';

interface AllToursPageProps {
  navigate: (path: string) => void;
  initialCategory?: string;
}

export const AllToursPage: React.FC<AllToursPageProps> = ({ navigate, initialCategory = 'all' }) => {
  const { language, t } = useLanguage();
  const { tours } = useTours();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  const categories = [
    { id: 'all', label: t.filters.all },
    { id: 'transfer', label: t.filters.transfer },
    { id: 'boat', label: t.filters.boat },
    { id: 'adventure', label: t.filters.adventure },
    { id: 'nature', label: t.filters.nature },
    { id: 'family', label: t.filters.family },
    { id: 'wellness', label: t.filters.wellness },
    { id: 'excursions', label: t.filters.excursions }
  ];

  const filteredTours = useMemo(() => {
    return tours
      .filter((tour) => {
        // Category filter
        if (selectedCategory !== 'all' && tour.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const trans = tour.translations[language] || tour.translations.en;
          const query = searchQuery.toLowerCase();
          const matchName = trans.name.toLowerCase().includes(query);
          const matchDesc = trans.shortDescription.toLowerCase().includes(query);
          const matchHighlights = trans.highlights.some(h => h.toLowerCase().includes(query));
          return matchName || matchDesc || matchHighlights;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'popular') {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return a.order - b.order;
        }
        return 0;
      });
  }, [tours, selectedCategory, searchQuery, sortBy, language]);

  const handleSelectTour = (tour: Tour) => {
    navigate(`/tour/${tour.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest">
          <Compass className="w-4 h-4" />
          <span>Full Excursion Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {t.nav.allTours}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl leading-relaxed">
          Browse all 24 verified excursions in Alanya with transparent fixed prices, licensed guides, and direct WhatsApp reservation assistance.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200/90 shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.filters.searchPlaceholder}
              className="w-full h-11 pl-10 pr-4 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-stone-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full h-11 px-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
            >
              <option value="popular">{t.filters.popularFirst}</option>
              <option value="price-asc">{t.filters.priceLowHigh}</option>
              <option value="price-desc">{t.filters.priceHighLow}</option>
            </select>
          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex items-center flex-wrap gap-1.5 pt-2 border-t border-stone-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-semibold px-1">
        <span>
          {filteredTours.length} {t.filters.toursFound}
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-emerald-800 hover:underline"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Tours Grid */}
      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onSelectTour={handleSelectTour}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <Compass className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-bold text-stone-800">
            No tours matched your criteria
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try clearing your search query or switching categories to explore other Alanya adventures.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-2 px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
