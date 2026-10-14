import React, { useState } from 'react';
import { Tour } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { MessageCircle, Clock, Calendar, ArrowRight, ShieldCheck, Waves, Compass } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
  onSelectTour?: (tour: Tour) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onSelectTour }) => {
  const { language, t, formatPrice } = useLanguage();
  const { openBooking } = useBooking();
  const [imgError, setImgError] = useState(false);

  const trans = tour.translations[language] || tour.translations.en;
  const priceInfo = formatPrice(tour.price);

  const getPricingUnitLabel = () => {
    switch (tour.pricingUnit) {
      case 'per_vehicle':
        return t.tourCard.perVehicle;
      case 'per_yacht':
        return t.tourCard.perYacht;
      case 'per_package':
        return t.tourCard.perPackage;
      case 'per_person':
      default:
        return t.tourCard.perPerson;
    }
  };

  const fallbackGradient = 'from-emerald-900 to-stone-900';

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-emerald-600/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      
      {/* Tour Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        {!imgError ? (
          <img
            src={tour.image}
            alt={trans.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex flex-col items-center justify-center p-6 text-white text-center`}>
            <Compass className="w-10 h-10 text-emerald-400 mb-2 opacity-80" />
            <span className="font-bold text-sm tracking-wide">{trans.name}</span>
          </div>
        )}

        {/* Top subtle badge without pill clutter */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>{tour.duration}</span>
        </div>

        {tour.featured && (
          <div className="absolute top-3 right-3 bg-amber-600 text-white text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded shadow-sm">
            Top Pick
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2.5">
          {/* Subtle Category & Operating Days metadata line */}
          <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <span>{tour.category}</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500 font-normal normal-case">{trans.operatingDays}</span>
          </div>

          <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-snug">
            {trans.name}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {trans.shortDescription}
          </p>
        </div>

        {/* Pricing and Actions Area */}
        <div className="pt-5 mt-4 border-t border-stone-100 space-y-3.5">
          
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                {tour.showFromPrice ? t.tourCard.from : 'Fixed Price'}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-stone-900 tracking-tight">
                  {priceInfo.formatted}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  / {getPricingUnitLabel()}
                </span>
              </div>
            </div>

            {tour.childPrice && tour.childPrice > 0 ? (
              <span className="text-[11px] text-stone-500">
                Child: €{tour.childPrice}
              </span>
            ) : null}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onSelectTour ? onSelectTour(tour) : null}
              className="w-full py-2.5 px-3 rounded-xl border border-stone-300 hover:border-emerald-700 text-stone-700 hover:text-emerald-850 text-xs font-semibold flex items-center justify-center gap-1 transition"
            >
              <span>{t.tourCard.viewDetails}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => openBooking({ tour })}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-950/20 transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.tourCard.bookWhatsapp}</span>
            </button>
          </div>

        </div>

      </div>

    </article>
  );
};
