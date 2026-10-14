import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tour, SiteSettings } from '../types';
import { INITIAL_TOURS } from '../data/initialTours';

interface TourContextType {
  tours: Tour[];
  settings: SiteSettings;
  loading: boolean;
  refreshTours: () => Promise<void>;
  refreshSettings: () => Promise<void>;
  getTourById: (id: string) => Tour | undefined;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tours, setTours] = useState<Tour[]>(INITIAL_TOURS);
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<SiteSettings>({
    whatsappNumber: '+905367180036',
    telegramUrl: '',
    telegramEnabled: false,
    whatsappEnabled: true,
    aiAssistantEnabled: true,
    aiAssistantName: 'Fix Price AI Travel Assistant',
    aiWelcomeMessage: {
      en: "Hello! Welcome to Fix Price Alanya Tours. I'm your AI travel assistant. I can help you find the best tours, compare prices, check available information, and prepare your booking.",
      ru: "Здравствуйте! Добро пожаловать в Fix Price Alanya Tours. Я ваш AI тревел-ассистент. Я помогу выбрать лучшую экскурсию, сравнить цены и быстро подготовить бронирование.",
      pl: "Dzień dobry! Witamy w Fix Price Alanya Tours. Jestem Twoim wirtualnym asystentem podróży. Chętnie pomogę wybrać najlepszą wycieczkę, sprawdzić ceny i przygotować rezerwację.",
      cs: "Dobrý den! Vítejte u Fix Price Alanya Tours. Jsem váš virtuální cestovní rádce. Rád vám pomohu vybrat výlet, porovnat ceny a připravit rezervaci.",
      de: "Hallo! Willkommen bei Fix Price Alanya Tours. Ich bin Ihr KI-Reiseassistent. Ich helfe Ihnen, die besten Touren zu finden, Preise zu vergleichen und Ihre Buchung vorzubereiten.",
      tr: "Merhaba! Fix Price Alanya Tours'a hoş geldiniz. Ben yapay zeka seyahat asistanınızım. En iyi turları bulmanıza, fiyatları karşılaştırmanıza ve rezervasyonunuzu hazırlamanıza yardımcı olabilirim."
    },
    defaultCurrency: 'EUR',
    defaultLanguage: 'en',
    contactPhone: '+90 536 718 0036',
    contactEmail: 'info@fixpricealanyatours.com',
    officeAddress: 'Alanya Port / Damlataş, Alanya, Turkey',
    rateLimitPerMinute: 30,
    metaTitle: 'FIX PRICE ALANYA TOURS',
    metaDescription: 'Best tours in Alanya at fixed prices'
  });

  const fetchTours = async () => {
    try {
      const res = await fetch('/api/tours');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTours(data);
        }
      }
    } catch (err) {
      console.warn('Using local tours cache:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.warn('Failed to fetch settings:', err);
    }
  };

  useEffect(() => {
    fetchTours();
    fetchSettings();
  }, []);

  const getTourById = (id: string) => {
    return tours.find(t => t.id === id || t.slug === id);
  };

  return (
    <TourContext.Provider
      value={{
        tours,
        settings,
        loading,
        refreshTours: fetchTours,
        refreshSettings: fetchSettings,
        getTourById
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTours = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTours must be used within a TourProvider');
  }
  return context;
};
