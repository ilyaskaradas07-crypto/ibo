import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, FileText } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      
      <div className="space-y-2 border-b border-stone-200 pb-4">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          {type === 'privacy' ? <Shield className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
          <span>Official Terms</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          {type === 'privacy' ? t.nav.privacy : t.nav.terms}
        </h1>
        <p className="text-xs text-stone-400">
          Last updated: October 2026 · FIX PRICE ALANYA TOURS
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm text-stone-700 text-sm leading-relaxed space-y-6">
        {type === 'privacy' ? (
          <>
            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-base">1. Information We Collect</h3>
              <p>
                FIX PRICE ALANYA TOURS collects basic reservation details needed to coordinate hotel transfers and excursions: customer full name, contact WhatsApp phone number, hotel name, room number (optional), and preferred tour date.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-base">2. How Your Information is Used</h3>
              <p>
                Your contact details are used solely to confirm tour availability, dispatch your transfer vehicle, and provide urgent schedule updates (e.g., weather-related departure shifts). We never sell, rent, or distribute personal information to third-party marketing companies.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-base">3. WhatsApp Communication</h3>
              <p>
                Our primary communication is conducted via WhatsApp. Information you send to our official business number (+905367180036) is handled securely by our operations desk in Alanya.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-base">4. Contact & Data Removal</h3>
              <p>
                You may request complete removal of your booking records at any time by contacting our data coordinator via email at info@fixpricealanyatours.com or on WhatsApp.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-base">1. Booking Requests & Confirmation</h3>
              <p>
                Submitting a booking form on this website generates a reservation inquiry delivered via WhatsApp. A tour is considered confirmed once our dispatch desk verifies vehicle and seating availability and replies with your confirmation details.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-base">2. Pickup Punctuality & Security Gate Instruction</h3>
              <p>
                All hotel pickups require guests to be waiting outside at their hotel security gate 10 minutes prior to the estimated pickup time. Transfer drivers cannot wait indefinitely past the scheduled window due to scheduled departures for other guests.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-base">3. Fixed Pricing Policy</h3>
              <p>
                Tour prices published on the website are fixed in Euros (€). Any additional personal spending on the tour (e.g. souvenir photos, extra drinks outside included menus) is optional and clearly outlined under the "What's Not Included" section of each tour.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-base">4. Cancellation & Weather Rescheduling</h3>
              <p>
                If an excursion is postponed due to severe weather, maritime warnings, or civil aviation rules, you will be offered a full reschedule or hassle-free cancellation. Notice of cancellation by the guest should be provided at least 12 hours prior to departure via WhatsApp.
              </p>
            </section>
          </>
        )}
      </div>

    </div>
  );
};
