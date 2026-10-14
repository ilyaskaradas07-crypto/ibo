import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { useBooking } from '../context/BookingContext';
import {
  Car, Plane, ShieldCheck, Clock, Users, Luggage, MapPin,
  CheckCircle2, MessageCircle, AlertCircle, Sparkles, ChevronRight, Compass
} from 'lucide-react';

interface TransfersPageProps {
  navigate: (path: string) => void;
}

export const TransfersPage: React.FC<TransfersPageProps> = ({ navigate }) => {
  const { language, t, formatPrice } = useLanguage();
  const { tours, settings } = useTours();
  const { openBooking } = useBooking();

  const tp = t.transfersPage;

  // Find the two airport transfer tours
  const antalyaTransfer = tours.find(t => t.id === 'antalya-airport-transfer');
  const gazipasaTransfer = tours.find(t => t.id === 'gazipasa-airport-transfer');

  // Dedicated Transfer Quick Request Form State
  const [selectedRoute, setSelectedRoute] = useState<'ayt_to_alanya' | 'alanya_to_ayt' | 'gzp_to_alanya' | 'alanya_to_gzp'>('ayt_to_alanya');
  const [transferDate, setTransferDate] = useState<string>('');
  const [flightTime, setFlightTime] = useState<string>('');
  const [flightNumber, setFlightNumber] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(2);
  const [luggageCount, setLuggageCount] = useState<number>(2);
  const [customerName, setCustomerName] = useState<string>('');
  const [hotelAddress, setHotelAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [childSeat, setChildSeat] = useState<boolean>(false);
  const [extraNotes, setExtraNotes] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const getRoutePrice = (): number => {
    if (selectedRoute === 'ayt_to_alanya' || selectedRoute === 'alanya_to_ayt') {
      return 80;
    }
    return 45;
  };

  const getRouteTitle = (): string => {
    switch (selectedRoute) {
      case 'ayt_to_alanya':
        return tp.routeAytToAlanya;
      case 'alanya_to_ayt':
        return tp.routeAlanyaToAyt;
      case 'gzp_to_alanya':
        return tp.routeGzpToAlanya;
      case 'alanya_to_gzp':
        return tp.routeAlanyaToGzp;
    }
  };

  const currentPrice = getRoutePrice();
  const formattedPrice = formatPrice(currentPrice);
  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  const getValidationErrorMsg = (field: 'date' | 'date_past' | 'name' | 'hotel' | 'phone') => {
    switch (language) {
      case 'ru':
        if (field === 'date') return 'Пожалуйста, выберите дату трансфера.';
        if (field === 'date_past') return 'Дата трансфера не может быть в прошлом.';
        if (field === 'name') return 'Пожалуйста, укажите имя для таблички встречи в аэропорту.';
        if (field === 'hotel') return 'Пожалуйста, укажите название отеля или адрес в Аланье.';
        return 'Пожалуйста, укажите номер WhatsApp для связи.';
      case 'pl':
        if (field === 'date') return 'Proszę wybrać datę transferu.';
        if (field === 'date_past') return 'Data transferu nie może być z przeszłości.';
        if (field === 'name') return 'Proszę podać imię i nazwisko na tabliczkę powitalną.';
        if (field === 'hotel') return 'Proszę podać nazwę hotelu lub adres w Alanyi.';
        return 'Proszę podać numer telefonu WhatsApp.';
      case 'cs':
        if (field === 'date') return 'Prosím, zvolte datum transferu.';
        if (field === 'date_past') return 'Datum transferu nemůže být v minulosti.';
        if (field === 'name') return 'Prosím, zadejte jméno na uvítací cedulku.';
        if (field === 'hotel') return 'Prosím, uveďte název hotelu nebo adresu v Alanyi.';
        return 'Prosím, zadejte kontaktní telefon WhatsApp.';
      case 'de':
        if (field === 'date') return 'Bitte wählen Sie das Transferdatum.';
        if (field === 'date_past') return 'Das Datum kann nicht in der Vergangenheit liegen.';
        if (field === 'name') return 'Bitte geben Sie Ihren Namen für das Namensschild an.';
        if (field === 'hotel') return 'Bitte geben Sie den Hotelnamen oder die Adresse in Alanya an.';
        return 'Bitte geben Sie Ihre WhatsApp-Telefonnummer an.';
      default:
        if (field === 'date') return 'Please select your transfer date.';
        if (field === 'date_past') return 'Transfer date cannot be in the past.';
        if (field === 'name') return 'Please enter your full name for the airport name board.';
        if (field === 'hotel') return 'Please provide your hotel name or address in Alanya.';
        return 'Please enter your contact WhatsApp number.';
    }
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!transferDate) {
      setValidationError(getValidationErrorMsg('date'));
      return;
    }
    const chosen = new Date(transferDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosen < today) {
      setValidationError(getValidationErrorMsg('date_past'));
      return;
    }

    if (!customerName.trim()) {
      setValidationError(getValidationErrorMsg('name'));
      return;
    }
    if (!hotelAddress.trim()) {
      setValidationError(getValidationErrorMsg('hotel'));
      return;
    }
    if (!phone.trim()) {
      setValidationError(getValidationErrorMsg('phone'));
      return;
    }

    const routeName = getRouteTitle();
    const flightInfo = flightNumber ? `Flight: ${flightNumber}` : 'Flight: To be confirmed';
    const seatInfo = childSeat ? 'Child seat requested (Free)' : 'No child seat';

    // WhatsApp Message in active language
    let msg = '';
    if (language === 'ru') {
      msg = `Здравствуйте, FIX PRICE ALANYA TOURS! Я хочу заказать VIP трансфер.

Маршрут: ${routeName}
Стоимость: €${currentPrice} за автомобиль (Mercedes Vito)
Дата: ${transferDate}
Время рейса/выезда: ${flightTime || 'Уточняется'}
${flightInfo}
Пассажиров: ${passengers} | Багаж: ${luggageCount}
Имя для таблички: ${customerName}
Отель/Адрес в Аланье: ${hotelAddress}
Детское кресло: ${seatInfo}
Контактный номер: ${phone}
Примечания: ${extraNotes || 'Нет'}

Пожалуйста, подтвердите трансфер.`;
    } else if (language === 'pl') {
      msg = `Dzień dobry FIX PRICE ALANYA TOURS! Chciałbym/chciałabym zarezerwować transfer VIP.

Trasa: ${routeName}
Cena: €${currentPrice} za samochód (Mercedes Vito)
Data: ${transferDate}
Godzina lotu/odbioru: ${flightTime || 'Do ustalenia'}
${flightInfo}
Liczba pasażerów: ${passengers} | Bagaż: ${luggageCount}
Imię i nazwisko (tabliczka): ${customerName}
Hotel/Adres w Alanyi: ${hotelAddress}
Fotelik dla dziecka: ${seatInfo}
Numer kontaktowy: ${phone}
Uwagi: ${extraNotes || 'Brak'}

Proszę o potwierdzenie transferu.`;
    } else if (language === 'de') {
      msg = `Hallo FIX PRICE ALANYA TOURS! Ich möchte einen VIP Flughafentransfer buchen.

Strecke: ${routeName}
Preis: €${currentPrice} pro Fahrzeug (Mercedes Vito)
Datum: ${transferDate}
Flugzeit/Abholzeit: ${flightTime || 'Wird nachgereicht'}
${flightInfo}
Personen: ${passengers} | Gepäck: ${luggageCount}
Name für Namensschild: ${customerName}
Hotel/Adresse in Alanya: ${hotelAddress}
Kindersitz: ${seatInfo}
Kontakttelefon: ${phone}
Anmerkungen: ${extraNotes || 'Keine'}

Bitte bestätigen Sie meinen Transfer.`;
    } else if (language === 'cs') {
      msg = `Dobrý den FIX PRICE ALANYA TOURS! Rád/a bych si objednal/a VIP letištní transfer.

Trasa: ${routeName}
Cena: €${currentPrice} za vozidlo (Mercedes Vito)
Datum: ${transferDate}
Čas letu/vyzvednutí: ${flightTime || 'Upřesním'}
${flightInfo}
Cestující: ${passengers} | Zavazadla: ${luggageCount}
Jméno na cedulku: ${customerName}
Hotel v Alanyi: ${hotelAddress}
Dětská sedačka: ${seatInfo}
Telefon: ${phone}
Poznámka: ${extraNotes || 'Žádná'}

Prosím o potvrzení transferu.`;
    } else {
      msg = `Hello FIX PRICE ALANYA TOURS! I would like to book a private VIP airport transfer.

Route: ${routeName}
Fixed Price: €${currentPrice} per vehicle (Mercedes Vito)
Date: ${transferDate}
Flight/Pickup Time: ${flightTime || 'Pending'}
${flightInfo}
Passengers: ${passengers} | Luggage: ${luggageCount}
Name on Signboard: ${customerName}
Hotel / Address in Alanya: ${hotelAddress}
Child Seat: ${seatInfo}
Contact Number: ${phone}
Notes: ${extraNotes || 'None'}

Please confirm my transfer booking.`;
    }

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-16 py-8 sm:py-12">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1800&q=85"
            alt="VIP Mercedes Vito Airport Transfer Alanya"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-transparent" />

          <div className="relative z-10 p-8 sm:p-14 lg:p-16 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <Plane className="w-4 h-4 text-emerald-400" />
              <span>{tp.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {tp.title}
            </h1>

            <p className="text-stone-200 text-sm sm:text-base font-light leading-relaxed">
              {tp.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/15">
                <span className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider block">{tp.aytBadge}</span>
                <span className="text-2xl font-black text-white">€80 <span className="text-xs font-normal text-stone-300">{tp.aytPriceNote}</span></span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/15">
                <span className="text-[11px] text-emerald-300 font-bold uppercase tracking-wider block">{tp.gzpBadge}</span>
                <span className="text-2xl font-black text-white">€45 <span className="text-xs font-normal text-stone-300">{tp.gzpPriceNote}</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Dedicated Transfer Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
            {tp.fixedRatesBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {tp.chooseRouteTitle}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            {tp.chooseRouteSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Antalya Airport (€80) */}
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-stone-200 hover:border-emerald-600/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="relative aspect-[16/10] bg-stone-900">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80"
                alt="Antalya Airport VIP Mercedes Vito Transfer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/30">
                Antalya Airport (AYT) ⇄ Alanya
              </div>
              <div className="absolute bottom-4 right-4 bg-emerald-800 text-white font-black text-xl px-4 py-1.5 rounded-xl shadow-lg">
                €80
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-400 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{tp.aytCardDuration}</span>
                  <span>·</span>
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{tp.aytCardCapacity}</span>
                </div>

                <h3 className="text-xl font-bold text-stone-900">
                  {tp.aytCardTitle}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  {tp.aytCardDesc}
                </p>

                <ul className="space-y-2 pt-2 text-xs text-stone-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{tp.aytIncluded1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{tp.aytIncluded2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{tp.aytIncluded3}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (antalyaTransfer) {
                      navigate(`/tour/${antalyaTransfer.id}`);
                    }
                  }}
                  className="flex-1 py-3 rounded-xl border border-stone-300 hover:border-emerald-700 text-stone-800 text-xs font-bold transition text-center"
                >
                  {tp.viewDetails}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRoute('ayt_to_alanya');
                    const formElement = document.getElementById('transfer-booking-form');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{tp.bookForPrice} €80</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Gazipaşa Airport (€45) */}
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-stone-200 hover:border-emerald-600/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="relative aspect-[16/10] bg-stone-900">
              <img
                src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80"
                alt="Gazipasa Airport VIP Mercedes Vito Transfer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/30">
                Gazipaşa Airport (GZP) ⇄ Alanya
              </div>
              <div className="absolute bottom-4 right-4 bg-emerald-800 text-white font-black text-xl px-4 py-1.5 rounded-xl shadow-lg">
                €45
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-400 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{tp.gzpCardDuration}</span>
                  <span>·</span>
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{tp.gzpCardCapacity}</span>
                </div>

                <h3 className="text-xl font-bold text-stone-900">
                  {tp.gzpCardTitle}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  {tp.gzpCardDesc}
                </p>

                <ul className="space-y-2 pt-2 text-xs text-stone-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{tp.gzpIncluded1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{tp.gzpIncluded2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{tp.gzpIncluded3}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (gazipasaTransfer) {
                      navigate(`/tour/${gazipasaTransfer.id}`);
                    }
                  }}
                  className="flex-1 py-3 rounded-xl border border-stone-300 hover:border-emerald-700 text-stone-800 text-xs font-bold transition text-center"
                >
                  {tp.viewDetails}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRoute('gzp_to_alanya');
                    const formElement = document.getElementById('transfer-booking-form');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{tp.bookForPrice} €45</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Transfer Booking Form */}
      <section id="transfer-booking-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-800/30 shadow-2xl space-y-6">
          
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              {tp.formBadge}
            </span>
            <h3 className="text-2xl font-black text-stone-900 tracking-tight">
              {tp.formTitle}
            </h3>
            <p className="text-xs text-stone-500">
              {tp.formSubtitle}
            </p>
          </div>

          {validationError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <form onSubmit={handleTransferSubmit} className="space-y-5">
            
            {/* Route Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                {tp.routeLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedRoute('ayt_to_alanya')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition ${
                    selectedRoute === 'ayt_to_alanya'
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{tp.routeAytToAlanya}</span>
                  <span className="text-emerald-800 font-black text-sm">€80</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRoute('alanya_to_ayt')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition ${
                    selectedRoute === 'alanya_to_ayt'
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{tp.routeAlanyaToAyt}</span>
                  <span className="text-emerald-800 font-black text-sm">€80</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRoute('gzp_to_alanya')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition ${
                    selectedRoute === 'gzp_to_alanya'
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{tp.routeGzpToAlanya}</span>
                  <span className="text-emerald-800 font-black text-sm">€45</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRoute('alanya_to_gzp')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between transition ${
                    selectedRoute === 'alanya_to_gzp'
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{tp.routeAlanyaToGzp}</span>
                  <span className="text-emerald-800 font-black text-sm">€45</span>
                </button>
              </div>
            </div>

            {/* Date, Flight Time, Flight Number */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {tp.dateLabel}
                </label>
                <input
                  type="date"
                  min={todayStr}
                  required
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {tp.flightTimeLabel}
                </label>
                <input
                  type="time"
                  value={flightTime}
                  onChange={(e) => setFlightTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {tp.flightNumLabel}
                </label>
                <input
                  type="text"
                  placeholder={tp.flightNumPlaceholder}
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>
            </div>

            {/* Passengers & Luggage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {tp.passengersLabel}
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-emerald-600 outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {tp.passengersSuffix}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {tp.luggageLabel}
                </label>
                <select
                  value={luggageCount}
                  onChange={(e) => setLuggageCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-emerald-600 outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} {tp.luggageSuffix}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {tp.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={tp.namePlaceholder}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                  {tp.phoneLabel}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+44 7123 456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>
            </div>

            {/* Hotel / Destination in Alanya */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                {tp.hotelLabel}
              </label>
              <input
                type="text"
                required
                placeholder={tp.hotelPlaceholder}
                value={hotelAddress}
                onChange={(e) => setHotelAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-emerald-600 outline-none"
              />
            </div>

            {/* Child Seat Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="child-seat-check"
                type="checkbox"
                checked={childSeat}
                onChange={(e) => setChildSeat(e.target.checked)}
                className="w-4 h-4 text-emerald-800 rounded border-stone-300 focus:ring-emerald-700"
              />
              <label htmlFor="child-seat-check" className="text-xs font-semibold text-stone-700 cursor-pointer">
                {tp.childSeatLabel}
              </label>
            </div>

            {/* Extra notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide">
                {tp.notesLabel}
              </label>
              <textarea
                rows={2}
                placeholder={tp.notesPlaceholder}
                value={extraNotes}
                onChange={(e) => setExtraNotes(e.target.value)}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-emerald-600 outline-none"
              />
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  {tp.totalFixedPrice}
                </span>
                <span className="text-3xl font-black text-emerald-900">
                  {formattedPrice.formatted}
                </span>
                <span className="text-[10px] text-stone-400">
                  {tp.vehicleCapacityNote}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>{tp.bookWhatsappBtn}</span>
              </button>
            </div>

          </form>

        </div>
      </section>

      {/* Trust & Guarantee Strip */}
      <section className="bg-stone-100 py-12 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">{tp.trustDelayTitle}</h4>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                {tp.trustDelayDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">{tp.trustMeetTitle}</h4>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                {tp.trustMeetDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">{tp.trustPrivateTitle}</h4>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                {tp.trustPrivateDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">{tp.trustPriceTitle}</h4>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                {tp.trustPriceDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
