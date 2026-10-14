export type Language = 'en' | 'ru' | 'pl' | 'cs' | 'de' | 'tr';
export type Currency = 'EUR' | 'USD' | 'TRY' | 'GBP';
export type PricingUnit = 'per_person' | 'per_yacht' | 'per_package' | 'per_group' | 'per_vehicle';
export type TourCategory = 'boat' | 'adventure' | 'nature' | 'family' | 'wellness' | 'excursions' | 'transfer';

export interface TourTranslationContent {
  name: string;
  shortDescription: string;
  description: string;
  operatingDays: string;
  pickupInstructions: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  whatToBring: string[];
  safetyNotes?: string;
  itinerary: { time?: string; title: string; description?: string }[];
}

export interface Tour {
  id: string;
  slug: string;
  category: TourCategory;
  price: number;
  childPrice?: number;
  pricingUnit: PricingUnit;
  showFromPrice: boolean;
  featured: boolean;
  popular: boolean;
  active: boolean;
  duration: string;
  pickupType: 'hotel' | 'meeting_point' | 'both';
  pickupTime: string;
  meetingPointAddress?: string;
  image: string;
  gallery: string[];
  order: number;
  travelersCount?: number;
  translations: Record<Language, TourTranslationContent> | (Partial<Record<Language, TourTranslationContent>> & { en: TourTranslationContent });
  faqs: {
    question: Partial<Record<Language, string>> & { en: string };
    answer: Partial<Record<Language, string>> & { en: string };
  }[];
}

export interface BookingRequest {
  id: string;
  tourId: string;
  tourName: string;
  date: string;
  adults: number;
  children: number;
  customerName: string;
  hotelName: string;
  hotelLocation: string;
  roomNumber?: string;
  phone: string;
  language: Language;
  pickupPreference: string;
  notes?: string;
  estimatedTotal: number;
  currency: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled';
  internalNotes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  tourId?: string;
  tourName?: string;
  customerName: string;
  rating: number;
  date: string;
  text: string;
  language: Language;
  avatar?: string;
  status: 'published' | 'hidden';
  isSample: boolean;
}

export interface SiteSettings {
  whatsappNumber: string;
  telegramUrl: string;
  telegramEnabled: boolean;
  whatsappEnabled: boolean;
  aiAssistantEnabled: boolean;
  aiAssistantName: string;
  aiWelcomeMessage: Record<Language, string>;
  defaultCurrency: Currency;
  defaultLanguage: Language;
  contactPhone: string;
  contactEmail: string;
  officeAddress: string;
  rateLimitPerMinute: number;
  metaTitle: string;
  metaDescription: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedTourId?: string;
  quickActions?: string[];
  bookingDraft?: {
    tourId?: string;
    tourName?: string;
    date?: string;
    adults?: number;
    children?: number;
    hotel?: string;
  };
}
