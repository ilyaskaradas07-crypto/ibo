import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Currency } from '../types';
import { UI_TRANSLATIONS, UiTranslations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  t: UiTranslations;
  formatPrice: (amountInEur: number) => { formatted: string; symbol: string; value: number };
}

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string }> = {
  EUR: { rate: 1.0, symbol: '€' },
  USD: { rate: 1.08, symbol: '$' },
  TRY: { rate: 38.0, symbol: '₺' },
  GBP: { rate: 0.85, symbol: '£' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('fixprice_lang');
    return (saved as Language) || 'en';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('fixprice_currency');
    return (saved as Currency) || 'EUR';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fixprice_lang', lang);
    document.documentElement.lang = lang;
  };

  const setCurrency = (cur: Currency) => {
    setCurrencyState(cur);
    localStorage.setItem('fixprice_currency', cur);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const formatPrice = (amountInEur: number) => {
    const { rate, symbol } = CURRENCY_RATES[currency] || CURRENCY_RATES.EUR;
    const value = Math.round(amountInEur * rate);
    return {
      formatted: `${symbol}${value}`,
      symbol,
      value
    };
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
