import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { Compass, MessageCircle, Send, MapPin, Phone, Mail, ShieldAlert, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { t } = useLanguage();
  const { settings } = useTours();

  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  const categories = [
    { label: t.nav.transfers, path: '/transfers' },
    { label: t.filters.boat, path: '/category/boat' },
    { label: t.filters.adventure, path: '/category/adventure' },
    { label: t.filters.nature, path: '/category/nature' },
    { label: t.filters.family, path: '/category/family' },
    { label: t.filters.wellness, path: '/category/wellness' },
    { label: t.filters.excursions, path: '/category/excursions' }
  ];

  const quickLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.allTours, path: '/tours' },
    { label: t.nav.transfers, path: '/transfers' },
    { label: t.nav.popularTours, path: '/popular' },
    { label: t.nav.aboutUs, path: '/about' },
    { label: t.nav.reviews, path: '/reviews' },
    { label: t.nav.faq, path: '/faq' },
    { label: t.nav.contact, path: '/contact' }
  ];

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      
      {/* Top Security Reminder Strip */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/60 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-200 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">
              {t.footer.securityReminder}
            </span>
          </div>
          <span className="text-emerald-400 font-semibold tracking-wide">
            Alanya, Antalya, Turkey
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-950 flex items-center justify-center text-amber-300 shadow-md">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-lg tracking-tight uppercase">
                  FIX PRICE ALANYA TOURS
                </span>
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                  Alanya · Antalya · Turkey
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed max-w-md">
              {t.footer.aboutText}
            </p>

            {/* Direct Instant Channels */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {settings.whatsappNumber || '+90 536 718 0036'}</span>
              </a>

              {settings.telegramEnabled && settings.telegramUrl && (
                <a
                  href={settings.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sky-700 hover:bg-sky-600 text-white text-xs font-semibold transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => {
                      navigate(link.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-400 hover:text-white transition flex items-center gap-1"
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.popularCategories}
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat.path}>
                  <button
                    onClick={() => {
                      navigate(cat.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-400 hover:text-white transition flex items-center gap-1"
                  >
                    <span>{cat.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.contactInfo}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.officeAddress || 'Damlataş Caddesi, Alanya, Antalya, Turkey'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{settings.contactPhone || '+90 536 718 0036'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{settings.contactEmail || 'info@fixpricealanyatours.com'}</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => {
                  navigate('/admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[11px] text-stone-500 hover:text-emerald-400 flex items-center gap-1 transition"
              >
                <span>{t.nav.admin} Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                navigate('/privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-stone-300 transition"
            >
              {t.nav.privacy}
            </button>
            <span>·</span>
            <button
              onClick={() => {
                navigate('/terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-stone-300 transition"
            >
              {t.nav.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
