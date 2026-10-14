import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { useBooking } from '../context/BookingContext';
import { TourCard } from '../components/TourCard';
import { Tour } from '../types';
import { Clock, Calendar, CheckCircle2, XCircle, ShieldAlert, MessageCircle, AlertTriangle, HelpCircle, ChevronRight, ArrowLeft, MapPin } from 'lucide-react';

interface TourDetailPageProps {
  tourId: string;
  navigate: (path: string) => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({ tourId, navigate }) => {
  const { language, t, formatPrice } = useLanguage();
  const { tours, getTourById, settings } = useTours();
  const { openBooking } = useBooking();

  const tour = getTourById(tourId);

  // Local booking calculator state
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);

  if (!tour) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Tour Not Found</h2>
        <p className="text-sm text-stone-500">The excursion you requested could not be located.</p>
        <button
          onClick={() => navigate('/tours')}
          className="px-5 py-2.5 bg-emerald-800 text-white rounded-xl text-sm font-semibold"
        >
          View All Tours
        </button>
      </div>
    );
  }

  const trans = tour.translations[language] || tour.translations.en;
  const priceInfo = formatPrice(tour.price);

  // Price Calculation Logic
  const calculateTotal = (): number => {
    if (tour.pricingUnit === 'per_yacht' || tour.pricingUnit === 'per_vehicle') {
      return tour.price;
    }
    const adultPrice = tour.price * Math.max(1, adults);
    const childRate = tour.childPrice !== undefined ? tour.childPrice : tour.price * 0.6;
    const childrenPrice = childRate * childrenCount;
    return Math.round(adultPrice + childrenPrice);
  };

  const estimatedTotalEur = calculateTotal();
  const totalDisplay = formatPrice(estimatedTotalEur);

  const galleryImages = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image];

  const relatedTours = tours
    .filter(tItem => tItem.id !== tour.id && (tItem.category === tour.category || tItem.popular))
    .slice(0, 3);

  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  const handleBookNow = () => {
    openBooking({
      tour,
      date: selectedDate,
      adults,
      children: childrenCount
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <button onClick={() => navigate('/')} className="hover:text-emerald-800 transition">
          {t.nav.home}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <button onClick={() => navigate('/tours')} className="hover:text-emerald-800 transition">
          {t.nav.allTours}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-900 font-semibold truncate max-w-xs">{trans.name}</span>
      </div>

      {/* Main Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Photos, Overview, Details, Highlights, Schedule (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-10">
          
          {/* Main Hero Photo & Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 shadow-md">
              <img
                src={galleryImages[activeGalleryIndex] || tour.image}
                alt={trans.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-500/30">
                Fixed Rate · Alanya, Antalya
              </div>
            </div>

            {/* Gallery Thumbnails (if multiple) */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                      activeGalleryIndex === idx ? 'border-emerald-600 scale-95' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title and Key Facts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span>{tour.category}</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-500 font-normal">Alanya & Surroundings</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {trans.name}
            </h1>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Duration</span>
                <span className="text-xs sm:text-sm font-semibold text-stone-900 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  {tour.duration}
                </span>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Operating Days</span>
                <span className="text-xs sm:text-sm font-semibold text-stone-900 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  {trans.operatingDays}
                </span>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Transfer Type</span>
                <span className="text-xs sm:text-sm font-semibold text-stone-900 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  {tour.pickupType === 'both' ? 'Hotel & Marina' : 'Hotel Pickup'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold text-stone-900">
              {t.tourDetail.overview}
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
              {trans.description}
            </p>
          </div>

          {/* Highlights */}
          {trans.highlights && trans.highlights.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-stone-900">
                {t.tourDetail.highlights}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {trans.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* MANDATORY Security Gate Instruction Notice */}
          <div className="bg-amber-50/90 border-2 border-amber-300/80 rounded-2xl p-5 space-y-2 text-amber-950">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
              <h4 className="font-bold text-sm tracking-tight text-amber-900">
                {t.tourDetail.pickupMeeting}
              </h4>
            </div>
            
            <p className="text-sm font-bold text-amber-950 bg-amber-100/70 p-3 rounded-xl border border-amber-200">
              "{t.tourDetail.securityGateNote}"
            </p>

            <p className="text-xs text-amber-800 leading-relaxed pt-1">
              Indicative pickup window: <strong>{tour.pickupTime}</strong>. Exact pickup time is confirmed via WhatsApp according to your specific hotel route in Alanya.
              {tour.meetingPointAddress && (
                <span className="block mt-1 font-medium">Meeting Point Option: {tour.meetingPointAddress}</span>
              )}
            </p>
          </div>

          {/* Typical Itinerary Schedule */}
          {trans.itinerary && trans.itinerary.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-stone-900">
                {t.tourDetail.itinerary}
              </h3>
              <div className="border-l-2 border-emerald-600/40 pl-4 space-y-5 ml-1">
                {trans.itinerary.map((step, idx) => (
                  <div key={idx} className="relative space-y-0.5">
                    <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-700 border-2 border-white" />
                    <div className="flex items-baseline gap-2">
                      {step.time && (
                        <span className="text-xs font-bold text-emerald-800">{step.time}</span>
                      )}
                      <h4 className="text-sm font-bold text-stone-900">{step.title}</h4>
                    </div>
                    {step.description && (
                      <p className="text-xs text-stone-600">{step.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{t.tourDetail.included}</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
                {trans.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-stone-400" />
                <span>{t.tourDetail.notIncluded}</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                {trans.excluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-stone-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* What to Bring & Safety */}
          {trans.whatToBring && trans.whatToBring.length > 0 && (
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
              <h4 className="text-sm font-bold text-stone-900">
                {t.tourDetail.whatToBring}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {trans.whatToBring.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {trans.safetyNotes && (
                <div className="pt-2 text-xs text-stone-500 border-t border-stone-200 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{trans.safetyNotes}</span>
                </div>
              )}
            </div>
          )}

          {/* Tour FAQs */}
          {tour.faqs && tour.faqs.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-stone-900">
                {t.tourDetail.faqTitle}
              </h3>
              <div className="space-y-3">
                {tour.faqs.map((f, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-stone-200 space-y-1">
                    <h5 className="font-bold text-xs sm:text-sm text-stone-900">
                      {f.question[language] || f.question.en}
                    </h5>
                    <p className="text-xs text-stone-600">
                      {f.answer[language] || f.answer.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Sticky Booking Calculator Card (4-5 Cols) */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-4">
          
          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-800/40 shadow-xl space-y-5">
            
            <div className="space-y-1 pb-3 border-b border-stone-100">
              <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                Transparent Fixed Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-stone-900 tracking-tight">
                  {priceInfo.formatted}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  / {tour.pricingUnit.replace('_', ' ')}
                </span>
              </div>
              {tour.childPrice && tour.childPrice > 0 ? (
                <span className="text-xs text-stone-500 block">
                  Child rate (4-11 yrs): €{tour.childPrice}
                </span>
              ) : null}
            </div>

            {/* Date Selector */}
            <div className="space-y-1.5">
              <label htmlFor="detail-tour-date" className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                {t.tourDetail.selectDate}
              </label>
              <input
                id="detail-tour-date"
                type="date"
                min={todayStr}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full h-11 px-3.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
              />
            </div>

            {/* Adults and Children Counters */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="detail-adults-input" className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {t.tourDetail.adultsLabel}
                </label>
                <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-2 h-11">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-7 h-7 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold flex items-center justify-center transition"
                  >
                    -
                  </button>
                  <input
                    id="detail-adults-input"
                    type="text"
                    readOnly
                    aria-label={t.tourDetail.adultsLabel}
                    value={adults}
                    className="w-full text-center font-bold text-xs sm:text-sm bg-transparent border-0 focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-7 h-7 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="detail-children-input" className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {t.tourDetail.childrenLabel}
                </label>
                <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-2 h-11">
                  <button
                    type="button"
                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                    className="w-7 h-7 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold flex items-center justify-center transition"
                  >
                    -
                  </button>
                  <input
                    id="detail-children-input"
                    type="text"
                    readOnly
                    aria-label={t.tourDetail.childrenLabel}
                    value={childrenCount}
                    className="w-full text-center font-bold text-xs sm:text-sm bg-transparent border-0 focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setChildrenCount(childrenCount + 1)}
                    className="w-7 h-7 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Total Estimated Price Display */}
            <div className="pt-2 bg-stone-50 rounded-xl p-3 border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-500 block">
                  {t.tourDetail.totalEstimate}
                </span>
                <span className="text-xl font-black text-stone-900">
                  {totalDisplay.formatted}
                </span>
              </div>
              <span className="text-[10px] text-stone-500 text-right">
                {adults} Adult(s){childrenCount > 0 ? `, ${childrenCount} Child` : ''}
              </span>
            </div>

            {/* Prominent WhatsApp Booking CTA */}
            <button
              onClick={handleBookNow}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>{t.tourDetail.bookOnWhatsappBtn}</span>
            </button>

            {/* Honest WhatsApp Disclaimer */}
            <p className="text-[11px] text-stone-500 text-center leading-normal">
              {t.tourDetail.whatsappDisclaimer}
            </p>

          </div>

          {/* Quick Contact Box */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-600 space-y-2 text-center">
            <span className="font-bold text-stone-800 block">Need custom coordination?</span>
            <p>Our Alanya operations desk is on standby for queries.</p>
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 font-bold hover:underline inline-block"
            >
              Direct Chat: {settings.whatsappNumber}
            </a>
          </div>

        </div>

      </div>

      {/* Related Tours Section */}
      {relatedTours.length > 0 && (
        <div className="pt-12 border-t border-stone-200 space-y-6">
          <h3 className="text-xl font-extrabold text-stone-900">
            {t.tourDetail.relatedTours}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((rTour) => (
              <TourCard
                key={rTour.id}
                tour={rTour}
                onSelectTour={(item) => {
                  navigate(`/tour/${item.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
