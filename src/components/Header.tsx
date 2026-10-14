import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { useBooking } from '../context/BookingContext';
import { Language, Currency } from '../types';
import { Compass, Menu, X, Globe, MessageCircle, ChevronDown, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const { language, setLanguage, currency, setCurrency, t } = useLanguage();
  const { settings } = useTours();
  const { openBooking } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
    { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' }
  ];

  const currencies: Currency[] = ['EUR', 'USD', 'TRY', 'GBP'];

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/tours', label: t.nav.allTours },
    { path: '/transfers', label: t.nav.transfers },
    { path: '/popular', label: t.nav.popularTours },
    { path: '/about', label: t.nav.aboutUs },
    { path: '/reviews', label: t.nav.reviews },
    { path: '/faq', label: t.nav.faq },
    { path: '/contact', label: t.nav.contact }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 hidden sm:block border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Alanya, Antalya · Direct WhatsApp booking with fixed transparent prices · No street haggle</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-300">
            <span>WhatsApp: {settings.whatsappNumber || '+90 536 718 0036'}</span>
            <span className="text-emerald-500">|</span>
            <button 
              onClick={() => handleNavClick('/admin')} 
              className="hover:text-emerald-100 underline decoration-emerald-600 transition"
            >
              {t.nav.admin}
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md ${
          scrolled ? 'shadow-md border-b border-stone-200/80 py-2.5' : 'border-b border-stone-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-amber-300 shadow-sm shadow-emerald-900/20 border border-emerald-700/50 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-stone-900 text-base sm:text-lg tracking-tight leading-none uppercase">
                    FIX PRICE
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Alanya
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 tracking-wider uppercase leading-tight mt-0.5">
                  Tours & Excursions
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-emerald-800 font-semibold bg-emerald-50/80'
                        : 'text-stone-700 hover:text-emerald-850 hover:bg-stone-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    setCurrencyDropdownOpen(!currencyDropdownOpen);
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition"
                  title="Change Currency"
                >
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 text-stone-500" />
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-24 bg-white rounded-lg shadow-lg border border-stone-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {currencies.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCurrency(c);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-emerald-50 ${
                          currency === c ? 'text-emerald-800 font-bold bg-emerald-50/60' : 'text-stone-700'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    setLangDropdownOpen(!langDropdownOpen);
                    setCurrencyDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition"
                  title="Select Language"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="uppercase">{language}</span>
                  <ChevronDown className="w-3 h-3 text-stone-500" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition ${
                          language === l.code
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Header WhatsApp Booking CTA Button */}
              <button
                onClick={() => openBooking()}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-900/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-100/30" />
                <span>{t.nav.whatsappBooking}</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-5 shadow-xl animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg ${
                      isActive
                        ? 'text-emerald-800 font-bold bg-emerald-50'
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="pt-3 mt-2 border-t border-stone-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.nav.whatsappBooking}</span>
                </button>

                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center text-xs text-stone-500 py-1.5 hover:text-emerald-700"
                >
                  Direct chat: {settings.whatsappNumber}
                </a>

                <button
                  onClick={() => handleNavClick('/admin')}
                  className="text-center text-xs text-stone-400 hover:text-stone-600 py-1"
                >
                  {t.nav.admin} Portal
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
