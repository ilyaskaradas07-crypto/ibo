import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { HelpCircle, ShieldAlert, MessageCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useTours();

  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  const faqs = [
    {
      q: 'How does the WhatsApp booking process work?',
      a: 'Select your desired tour, preferred date, and number of guests. Clicking "Book on WhatsApp" prepares a prefilled message with your hotel information and estimated total price. Once you send it, our local Alanya desk reviews seat availability and confirms your booking and pickup details promptly.'
    },
    {
      q: 'Why are prices fixed and displayed in Euros (€)?',
      a: 'Tourism in the Mediterranean involves visitors from across the globe. Standardizing prices in EUR avoids fluctuating street rates and haggling. You can view prices in USD, TRY, or GBP using the currency switcher at the top.'
    },
    {
      q: 'Where do transfers pick up guests?',
      a: 'We pick up from hotel security gates across Alanya (from Mahmutlar, Oba, City Center, Konaklı, Avsallar, to Okurcalar). Please remember our mandatory safety guideline: "Please wait outside at the security gate 10 minutes before your tour time."'
    },
    {
      q: 'Do I need to pay online with a credit card right now?',
      a: 'No upfront credit card payment is required on this website. Reservations are coordinated honestly over WhatsApp, and payments are handled upon pickup or as coordinated directly with our dispatch team.'
    },
    {
      q: 'What happens if the weather is bad (e.g. Paragliding, Boat Tour, Skydiving)?',
      a: 'Safety is the paramount priority. If coast guard or civil aviation authorities postpone activities due to strong winds or rough seas, your tour can be rescheduled to the next available sunny day or cancelled without penalties.'
    },
    {
      q: 'What languages do your tour guides speak?',
      a: 'Our tours feature multilingual professional guides proficient in English, Russian, Polish, Czech, and German. When booking on WhatsApp, please specify your preferred language so we place you in the best group.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
          Everything You Need to Know
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {t.nav.faq}
        </h1>
        <p className="text-sm text-stone-600 max-w-xl mx-auto font-light">
          Clear answers about pickups, fixed pricing, payments, and reservation policies in Alanya.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-2"
          >
            <h3 className="text-base font-bold text-stone-900 flex items-start gap-2.5">
              <span className="text-emerald-700 font-extrabold">{index + 1}.</span>
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 pl-6 leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      {/* WhatsApp Help Box */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
        <h4 className="font-bold text-emerald-950 text-base">
          Have a question not listed here?
        </h4>
        <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
          Our team is active on WhatsApp to answer questions regarding custom pickup zones, private yachts, or group bookings.
        </p>
        <div className="pt-2">
          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
};
