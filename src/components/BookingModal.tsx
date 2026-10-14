import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { useBooking } from '../context/BookingContext';
import { generateWhatsAppMessage } from '../i18n/translations';
import { Tour } from '../types';
import { X, MessageCircle, Calendar, Users, Hotel, Phone, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { language, t, formatPrice } = useLanguage();
  const { tours, settings } = useTours();
  const { isOpen, closeBooking, activeTour, initialDate, initialAdults, initialChildren } = useBooking();

  const [selectedTour, setSelectedTour] = useState<Tour | null>(activeTour || tours[0] || null);
  const [date, setDate] = useState<string>(initialDate || '');
  const [adults, setAdults] = useState<number>(initialAdults || 2);
  const [childrenCount, setChildrenCount] = useState<number>(initialChildren || 0);
  const [customerName, setCustomerName] = useState<string>('');
  const [hotelName, setHotelName] = useState<string>('');
  const [hotelLocation, setHotelLocation] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [pickupPreference, setPickupPreference] = useState<string>('Hotel Security Gate');
  const [notes, setNotes] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHonestNotice, setShowHonestNotice] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (activeTour) {
      setSelectedTour(activeTour);
    } else if (tours.length > 0 && !selectedTour) {
      setSelectedTour(tours[0]);
    }
  }, [activeTour, tours]);

  useEffect(() => {
    if (initialDate) setDate(initialDate);
    if (initialAdults) setAdults(initialAdults);
    if (initialChildren !== undefined) setChildrenCount(initialChildren);
  }, [initialDate, initialAdults, initialChildren]);

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  // Price Calculation Logic
  const calculateTotal = (): number => {
    if (!selectedTour) return 0;
    if (selectedTour.pricingUnit === 'per_yacht' || selectedTour.pricingUnit === 'per_vehicle') {
      return selectedTour.price;
    }
    const adultPrice = selectedTour.price * Math.max(1, adults);
    const childRate = selectedTour.childPrice !== undefined ? selectedTour.childPrice : selectedTour.price * 0.6;
    const childrenPrice = childRate * childrenCount;
    return Math.round(adultPrice + childrenPrice);
  };

  const estimatedTotalEur = calculateTotal();
  const priceDisplay = formatPrice(estimatedTotalEur);

  const cleanBusinessPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Date validation
    if (!date) {
      setErrorMessage(t.bookingForm.errors.noDate);
      return;
    }
    const chosenDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosenDate < today) {
      setErrorMessage(t.bookingForm.errors.pastDate);
      return;
    }

    if (adults < 1) {
      setErrorMessage(t.bookingForm.errors.noAdults);
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage(t.bookingForm.errors.noName);
      return;
    }

    if (!hotelName.trim()) {
      setErrorMessage(t.bookingForm.errors.noHotel);
      return;
    }

    if (!phone.trim() || phone.trim().length < 6) {
      setErrorMessage(t.bookingForm.errors.noPhone);
      return;
    }

    setSubmitting(true);

    const activeTrans = selectedTour?.translations[language] || selectedTour?.translations.en;
    const tourName = activeTrans?.name || selectedTour?.id || 'Alanya Tour';

    // 1. Save booking request to server
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: selectedTour?.id,
          tourName,
          date,
          adults,
          children: childrenCount,
          customerName,
          hotelName,
          hotelLocation,
          roomNumber,
          phone,
          language,
          pickupPreference,
          notes,
          estimatedTotal: estimatedTotalEur,
          currency: 'EUR'
        })
      });
    } catch (err) {
      console.warn('Booking recorded locally, continuing to WhatsApp:', err);
    }

    // 2. Prepare prefilled message
    const msg = generateWhatsAppMessage({
      tourName,
      date,
      adults,
      children: childrenCount,
      totalPrice: priceDisplay.value,
      currencySymbol: priceDisplay.symbol,
      customerName,
      hotelName: roomNumber ? `${hotelName} (Room: ${roomNumber})` : hotelName,
      pickupPreference,
      phone,
      notes: hotelLocation ? `${notes} (Location: ${hotelLocation})` : notes,
      language
    });

    const whatsappUrl = `https://wa.me/${cleanBusinessPhone}?text=${encodeURIComponent(msg)}`;

    setSubmitting(false);
    setShowHonestNotice(true);

    // Open WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                {t.bookingForm.modalTitle}
              </h3>
              <p className="text-[11px] text-emerald-300">
                Direct WhatsApp reservation · Fixed prices · Official Alanya operator
              </p>
            </div>
          </div>
          <button
            onClick={closeBooking}
            className="p-1 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Honest WhatsApp guidance banner when submitted */}
        {showHonestNotice ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-extrabold text-stone-900">
                {t.bookingForm.whatsappHonestNoticeTitle}
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                {t.bookingForm.whatsappHonestNoticeDesc}
              </p>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 text-xs text-stone-500 border border-stone-200 text-left max-w-md mx-auto space-y-1">
              <div><strong>Tour:</strong> {selectedTour?.translations[language]?.name || selectedTour?.id}</div>
              <div><strong>Date:</strong> {date} · <strong>Guests:</strong> {adults} Adult(s), {childrenCount} Child(ren)</div>
              <div><strong>Estimated Total:</strong> {priceDisplay.formatted}</div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setShowHonestNotice(false);
                  closeBooking();
                }}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl shadow-md transition"
              >
                {t.bookingForm.whatsappHonestNoticeClose}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Tour Selection */}
            <div className="space-y-1.5">
              <label htmlFor="modal-tour-select" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Select Tour
              </label>
              <select
                id="modal-tour-select"
                value={selectedTour?.id || ''}
                onChange={(e) => {
                  const t = tours.find(item => item.id === e.target.value);
                  if (t) setSelectedTour(t);
                }}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
              >
                {tours.map((tItem) => {
                  const name = tItem.translations[language]?.name || tItem.translations.en.name;
                  return (
                    <option key={tItem.id} value={tItem.id}>
                      {name} — €{tItem.price} ({tItem.pricingUnit.replace('_', ' ')})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Date & Guest Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              
              <div className="space-y-1.5">
                <label htmlFor="modal-date-input" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t.bookingForm.step1} (Date)
                </label>
                <input
                  id="modal-date-input"
                  type="date"
                  min={todayStr}
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="modal-adults-input" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Adults (12+)
                </label>
                <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-2 h-[42px]">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold flex items-center justify-center transition"
                  >
                    -
                  </button>
                  <input
                    id="modal-adults-input"
                    type="text"
                    readOnly
                    aria-label="Adults"
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

              <div className="space-y-1.5">
                <label htmlFor="modal-children-input" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Children (4-11)
                </label>
                <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-2 h-[42px]">
                  <button
                    type="button"
                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold flex items-center justify-center transition"
                  >
                    -
                  </button>
                  <input
                    id="modal-children-input"
                    type="text"
                    readOnly
                    aria-label="Children"
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

            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <div className="space-y-1.5">
                <label htmlFor="modal-customer-name" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t.bookingForm.customerName} *
                </label>
                <input
                  id="modal-customer-name"
                  type="text"
                  required
                  placeholder={t.bookingForm.customerNamePlaceholder}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="modal-phone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t.bookingForm.phone} *
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  required
                  placeholder={t.bookingForm.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                />
              </div>

            </div>

            {/* Hotel & Room Number */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              
              <div className="sm:col-span-2 space-y-1.5">
                <label htmlFor="modal-hotel-name" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t.bookingForm.hotelName} *
                </label>
                <input
                  id="modal-hotel-name"
                  type="text"
                  required
                  placeholder={t.bookingForm.hotelNamePlaceholder}
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="modal-room-number" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {t.bookingForm.roomNumber}
                </label>
                <input
                  id="modal-room-number"
                  type="text"
                  placeholder={t.bookingForm.roomNumberPlaceholder}
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                />
              </div>

            </div>

            {/* Pickup Preference */}
            <div className="space-y-1.5">
              <label htmlFor="modal-pickup-pref" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                {t.bookingForm.pickupPreference}
              </label>
              <select
                id="modal-pickup-pref"
                value={pickupPreference}
                onChange={(e) => setPickupPreference(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
              >
                <option value="Hotel Security Gate">{t.bookingForm.pickupHotel}</option>
                <option value="Central Meeting Point / Alanya Harbour">{t.bookingForm.pickupMeetingPoint}</option>
              </select>
            </div>

            {/* Mandatory Security Gate Note */}
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold">Official Tour Pickup Instruction:</span>
                <p className="font-medium text-amber-950">
                  {t.tourDetail.securityGateNote}
                </p>
              </div>
            </div>

            {/* Special Notes */}
            <div className="space-y-1.5">
              <label htmlFor="modal-notes" className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                {t.bookingForm.notes}
              </label>
              <textarea
                id="modal-notes"
                rows={2}
                placeholder={t.bookingForm.notesPlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
              />
            </div>

            {/* Total Estimated Calculation & Submit Button */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  {t.tourDetail.totalEstimate}
                </span>
                <span className="text-2xl font-black text-emerald-900">
                  {priceDisplay.formatted}
                </span>
                <span className="text-[10px] text-stone-400">
                  (Transparent fixed rate · Pay on tour)
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition disabled:opacity-50"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{submitting ? t.bookingForm.validating : t.bookingForm.submitWhatsapp}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
