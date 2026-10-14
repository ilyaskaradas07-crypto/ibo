import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { Compass, ShieldCheck, HeartHandshake, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';

interface AboutUsPageProps {
  navigate: (path: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ navigate }) => {
  const { t } = useLanguage();
  const { settings } = useTours();

  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Title */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
          Local Alanya Expertise
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          About FIX PRICE ALANYA TOURS
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
          Redefining tour reservations in Alanya, Antalya with upfront fixed prices, professional local drivers, and sincere hospitality.
        </p>
      </div>

      {/* Main Philosophy Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-stone-900">
          Our Story & Purpose
        </h2>
        
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          For years, visitors to the Turkish Riviera experienced the stress of negotiating excursion prices on tourist avenues, dealing with inconsistent inclusions, and wondering if they were overpaying.
        </p>

        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          <strong>FIX PRICE ALANYA TOURS</strong> was founded with a straightforward mission: publish honest, standardized tour rates upfront for everyone. Whether you book in advance from home or while lounging on Cleopatra Beach, your price is guaranteed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">Fixed & Fair</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Transparent per-person rates on all 24 adventures. What you see is what you pay.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">Alanya Locals</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              We live and operate here in Alanya, coordinating daily departures directly with captains and transfer teams.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-stone-900">Direct WhatsApp</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              No robotic booking engines. You speak directly with a dedicated travel coordinator in your native language.
            </p>
          </div>
        </div>
      </div>

      {/* Safety & Pickup Promise */}
      <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-10 space-y-4">
        <h3 className="text-xl font-bold text-amber-300">
          Our Punctual Transfer Policy
        </h3>
        <p className="text-sm text-emerald-100 leading-relaxed max-w-2xl font-light">
          Hotel security gates are the designated departure points across all Alanya resorts. We ask all our guests to follow our golden rule: <em>"Please wait outside at the security gate 10 minutes before your tour time."</em> This ensures the transfer vehicle never delays you or other passengers.
        </p>
        <div className="pt-2">
          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly with Operations</span>
          </a>
        </div>
      </div>

    </div>
  );
};
