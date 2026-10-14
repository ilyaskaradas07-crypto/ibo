import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { useBooking } from '../context/BookingContext';
import { Hero } from '../components/Hero';
import { TourCard } from '../components/TourCard';
import { Tour, TourCategory } from '../types';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Waves, Mountain, Sun, Users, Award, HelpCircle, Car } from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { language, t } = useLanguage();
  const { tours, settings } = useTours();
  const { openBooking } = useBooking();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.filters.all, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'boat', label: t.filters.boat, icon: <Waves className="w-4 h-4" /> },
    { id: 'adventure', label: t.filters.adventure, icon: <Mountain className="w-4 h-4" /> },
    { id: 'nature', label: t.filters.nature, icon: <Sun className="w-4 h-4" /> },
    { id: 'family', label: t.filters.family, icon: <Users className="w-4 h-4" /> },
    { id: 'transfer', label: t.filters.transfer, icon: <Car className="w-4 h-4" /> }
  ];

  const featuredTours = tours.filter(t => t.featured).slice(0, 6);
  const popularTours = tours.filter(t => t.popular).slice(0, 6);

  const filteredTours = activeCategory === 'all'
    ? tours.slice(0, 8)
    : tours.filter(t => t.category === activeCategory).slice(0, 8);

  const handleSelectTour = (tour: Tour) => {
    navigate(`/tour/${tour.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* Hero Section */}
      <Hero
        navigate={navigate}
        onSearchSubmit={({ tourId }) => {
          if (tourId) {
            navigate(`/tour/${tourId}`);
          } else {
            navigate('/tours');
          }
        }}
      />

      {/* Popular Tours Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
              Top Rated Excursions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {t.nav.popularTours}
            </h2>
          </div>
          <button
            onClick={() => {
              navigate('/tours');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition"
          >
            <span>{t.filters.all}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onSelectTour={handleSelectTour}
            />
          ))}
        </div>
      </section>

      {/* Airport Transfers Highlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white p-8 sm:p-12 shadow-xl border border-emerald-800">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                <span>{t.transfersPage?.badge || 'Airport VIP Transfers · 24/7 Service'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {t.transfersPage?.title || 'Private Mercedes Vito Airport Transfers'}
              </h2>

              <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed max-w-2xl">
                {t.transfersPage?.subtitle || 'Arrive smoothly at your Alanya hotel or residence. Fixed transparent price per vehicle with zero hidden night fees, free flight delay tracking, and meet & greet service.'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/15">
                  <span className="text-[10px] text-emerald-300 font-bold uppercase block">{t.transfersPage?.aytBadge || 'Antalya Airport (AYT)'}</span>
                  <span className="text-xl font-black text-white">€80 <span className="text-xs font-normal text-stone-300">{t.transfersPage?.aytPriceNote || '/ vehicle'}</span></span>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/15">
                  <span className="text-[10px] text-emerald-300 font-bold uppercase block">{t.transfersPage?.gzpBadge || 'Gazipaşa Airport (GZP)'}</span>
                  <span className="text-xl font-black text-white">€45 <span className="text-xs font-normal text-stone-300">{t.transfersPage?.gzpPriceNote || '/ vehicle'}</span></span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => {
                  navigate('/transfers');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-lg transition active:scale-95 text-center"
              >
                {t.nav.transfers} (Antalya €80 · Gazipaşa €45)
              </button>

              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  language === 'ru'
                    ? 'Здравствуйте! Я хочу заказать VIP трансфер из аэропорта в Аланью (Antalya €80 / Gazipaşa €45).'
                    : language === 'pl'
                    ? 'Dzień dobry! Chciałbym zapytać o transfer VIP z lotniska do Alanyi (Antalya 80 € / Gazipaşa 45 €).'
                    : language === 'de'
                    ? 'Hallo! Ich möchte einen VIP Flughafentransfer nach Alanya buchen (Antalya 80 € / Gazipasa 45 €).'
                    : language === 'cs'
                    ? 'Dobrý den! Rád bych si objednal VIP letištní transfer do Alanye (Antalya 80 € / Gazipaşa 45 €).'
                    : 'Hello Fix Price Alanya Tours! I would like to book a VIP airport transfer (Antalya €80 / Gazipaşa €45).'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Booking</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Category Explorer Section */}
      <section className="bg-stone-100/60 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Explore Alanya by Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Curated Mediterranean Activities
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  activeCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-950/20'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Tours Grid for Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {filteredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onSelectTour={handleSelectTour}
              />
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              onClick={() => {
                navigate('/tours');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 hover:border-emerald-700 text-stone-800 hover:text-emerald-900 text-sm font-bold shadow-sm transition"
            >
              View Full Catalog (All 24 Tours)
            </button>
          </div>

        </div>
      </section>

      {/* Special Highlights: Tur Günü Öde & Ücretsiz Transfer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Tur Günü Öde */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 text-xs font-black uppercase tracking-wider">
                <span>💳 {language === 'tr' ? 'Sıfır Risk' : 'Zero Risk'}</span>
                <span>·</span>
                <span>{language === 'tr' ? 'Tur Günü Öde' : 'Pay on Tour Day'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                {language === 'tr' ? 'Ön Ödeme Yok! Tur Günü Ödeyin' : 'Zero Prepayment! Pay on the Day of the Tour'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'tr'
                  ? 'Kredi kartı bilgilerinizi internete girmeden rezervasyonunuzu WhatsApp üzerinden 1 dakikada tamamlayın. Ödemenizi tur günü sabah otel transfer aracında veya rehberinize nakit (TL, Euro, Dolar, GBP) ya da kart ile rahatça yapabilirsiniz.'
                  : 'Book in 1 minute via WhatsApp without entering credit card details online. Pay conveniently in cash or by card directly to your transfer driver or guide on the day of the tour.'}
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-amber-200/60 flex items-center gap-2 text-xs font-bold text-amber-950">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>{language === 'tr' ? 'Ücretsiz İptal & Değişiklik Garantisi' : 'Free Cancellation & Flexible Dates'}</span>
            </div>
          </div>

          {/* Card 2: Bütün Turlarda Gidiş-Dönüş Transfer Bedava */}
          <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-white border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-950 text-xs font-black uppercase tracking-wider">
                <span>🚌 {language === 'tr' ? '100% Dahil' : '100% Included'}</span>
                <span>·</span>
                <span>{language === 'tr' ? 'Gidiş-Dönüş Transfer Bedava' : 'Free Roundtrip Transfer'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                {language === 'tr' ? 'Bütün Turlarımızda Transfer Tamamen Ücretsiz!' : 'Free Hotel Roundtrip Transfer on Every Single Tour!'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'tr'
                  ? 'Alanya Merkez, Mahmutlar, Oba, Tosmur, Kestel, Kargıcak, Konaklı, Avsallar, Türkler, İncekum ve Okurcalar — Tüm otellerden kapıda karşılama ve tur bitimi otele dönüş transferi fiyata dahildir. Gizli transfer ücreti yok!'
                  : 'From Alanya Center, Mahmutlar, Oba, Tosmur, Kestel, Konaklı, Avsallar, Türkler to Okurcalar — door-to-door pickup from your hotel security gate and return transfer is fully included in the price.'}
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-emerald-200/60 flex items-center gap-2 text-xs font-bold text-emerald-950">
              <Car className="w-4 h-4 text-emerald-700" />
              <span>{language === 'tr' ? 'Klimalı Konforlu Araçlar & Güvenli Seyahat' : 'Modern Air-Conditioned Fleet & Safe Travel'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose FIX PRICE ALANYA TOURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              {language === 'tr' ? 'Dürüst Turizm Felsefesi' : 'The Fix Price Philosophy'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'tr'
                ? 'Sokak Pazarlığı Yok. Sürpriz Ek Masraf Yok. En İyi Alanya Turları.'
                : 'No Street Haggle. No Hidden Surcharges. Just Exceptional Alanya Experiences.'}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
              {language === 'tr'
                ? 'Geleneksel tatil bölgelerinde tur fiyatları acenteden acenteye büyük farklılıklar gösterir. FIX PRICE ALANYA TOURS olarak tüm 26 tur ve transferimizde şeffaf, sabit ve net fiyatlar sunuyoruz. Lisanslı profesyonel rehberler, modern transfer filosu ve Alanya\'da doğrudan WhatsApp iletişim desteğiyle yanınızdayız.'
                : 'In traditional resort tourism, excursion prices vary widely depending on where you book. FIX PRICE ALANYA TOURS provides transparent, standardized rates across all 26 adventures and transfers. You receive licensed guides, modern transfer vehicles, and direct WhatsApp contact with our resident team in Alanya.'}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openBooking()}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition active:scale-95"
              >
                {language === 'tr' ? 'Sabit Fiyatla Hemen Ayırt' : 'Book with Fixed Price'}
              </button>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{language === 'tr' ? 'WhatsApp\'tan Bilgi Al' : 'Ask on WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Reviews Section (Enriched with 6 verified reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">
              {language === 'tr' ? 'Doğrulanmış Misafir Yorumları' : 'Guest Impressions'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {t.reviews.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t.reviews.note}
            </p>
          </div>
          <button
            onClick={() => {
              navigate('/reviews');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition"
          >
            <span>{language === 'tr' ? 'Tüm Yorumları Gör' : 'Read All Reviews'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Review 1 - Turkish */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-4 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              {'★'.repeat(5)}
            </div>
            <p className="text-sm text-stone-700 italic leading-relaxed">
              "Korsan Tekne Turu ve Sapadere Kanyonu\'na katıldık. Hiçbir ön ödeme yapmadan WhatsApp üzerinden ayırttık ve tur günü transfer aracında nakit ödedik. Otelimizin önünden tam vaktinde aldılar, yemekler ve kanyon ortamı harikaydı!"
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Caner & Melis Y. (TR)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Alanya Tekne Turu</span>
            </div>
          </div>

          {/* Review 2 - English */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-4 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              {'★'.repeat(5)}
            </div>
            <p className="text-sm text-stone-700 italic leading-relaxed">
              "We booked the Green Canyon catamaran tour via WhatsApp in 5 minutes. The driver picked us up right at our hotel gate on time. No hidden fees, paid in cash on the bus, great lunch, and beautiful emerald water."
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">David & Sarah M. (UK)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Green Canyon</span>
            </div>
          </div>

          {/* Review 3 - Russian */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-4 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              {'★'.repeat(5)}
            </div>
            <p className="text-sm text-stone-700 italic leading-relaxed">
              "Брали Джип-сафари и хамам. Всё четко по фиксированной цене, как написано на сайте. Оплата в день тура водителю без предоплаты. Водные битвы на джипах просто супер! Отличный сервис в WhatsApp."
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Елена и Артем (RU)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Jeep Safari</span>
            </div>
          </div>

          {/* Review 4 - Polish */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-4 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              {'★'.repeat(5)}
            </div>
            <p className="text-sm text-stone-700 italic leading-relaxed">
              "Rejs statkiem wokół zamku Alanyi był niesamowity. Pływanie przy jaskiniach, pyszny obiad na statku. Bardzo profesjonalna obsługa, bezpłatny transfer z hotelu w obie strony i stała cena 18 euro bez żadnych dopłat."
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Krzysztof B. (PL)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Boat Tour</span>
            </div>
          </div>

          {/* Review 5 - Turkish / German */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-4 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              {'★'.repeat(5)}
            </div>
            <p className="text-sm text-stone-700 italic leading-relaxed">
              "Yamaç paraşütü (Paragliding) ve Antalya Havalimanı VIP transferini Fix Price üzerinden aldık. 80 € VIP Vito transfer uçağımız rötar yapmasına rağmen bizi çıkışta bekliyordu. Uçuş pilotları çok tecrübeliydi."
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Serkan & Anna T. (DE/TR)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Paragliding & VIP Transfer</span>
            </div>
          </div>

          {/* Review 6 - Czech */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-4 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              {'★'.repeat(5)}
            </div>
            <p className="text-sm text-stone-700 italic leading-relaxed">
              "Skvělý výlet do kaňonu Sapadere a rafting v Köprülü. Vyzvednutí přímo před hotelem zdarma, žádná platba předem, zaplatili jsme až v den výletu. Doporučujeme všem turistům v Alanyi!"
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Jakub a Lenka (CZ)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Sapadere Canyon</span>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Quick Highlights */}
      <section className="bg-stone-50 py-16 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {t.nav.faq}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-2">
              <h4 className="font-bold text-sm text-stone-900">
                How does WhatsApp booking work? Do I pay online?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                When you click "Book on WhatsApp", a prefilled message is prepared with your tour, preferred date, hotel, and guest count. Our resident team replies immediately to confirm pickup availability. Payment is handled conveniently when you join the tour or as confirmed on WhatsApp.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-2">
              <h4 className="font-bold text-sm text-stone-900">
                Where will the transfer pick me up?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                For safety and timely departures, our official policy applies to all tours: <em>"Please wait outside at the security gate 10 minutes before your tour time."</em> If your accommodation is an apartment or private villa, we confirm the exact pickup point on WhatsApp.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-2">
              <h4 className="font-bold text-sm text-stone-900">
                Are the listed tour prices guaranteed?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Yes! Every tour price displayed on FIX PRICE ALANYA TOURS is fixed and transparent. We do not engage in aggressive street sales or arbitrary pricing.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                navigate('/faq');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition underline"
            >
              View All Frequently Asked Questions
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
