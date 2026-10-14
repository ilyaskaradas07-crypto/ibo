import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_TOURS } from './src/data/initialTours';
import { Tour, BookingRequest, Review, SiteSettings } from './src/types';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DataStore {
  tours: Tour[];
  settings: SiteSettings;
  adminPasswordHash: string;
  adminSalt: string;
  sessions: string[];
  bookings: BookingRequest[];
  reviews: Review[];
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

function initializeStore(): DataStore {
  const initialSalt = crypto.randomBytes(16).toString('hex');
  const initialHash = hashPassword('1234', initialSalt);

  const defaultSettings: SiteSettings = {
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
      de: "Hallo! Willkommen bei Fix Price Alanya Tours. Ich bin Ihr KI-Reiseassistent. Ich helfe Ihnen, die besten Touren zu finden, Preise zu vergleichen und Ihre Buchung vorzubereiten."
    },
    defaultCurrency: 'EUR',
    defaultLanguage: 'en',
    contactPhone: '+90 536 718 0036',
    contactEmail: 'info@fixpricealanyatours.com',
    officeAddress: 'Alanya Harbour / Damlataş Mevkii, Alanya, Antalya, Turkey',
    rateLimitPerMinute: 30,
    metaTitle: 'FIX PRICE ALANYA TOURS | Best Alanya Boat Trips, Safaris & Excursions',
    metaDescription: 'Explore the best boat trips, adventures, nature excursions, and unforgettable experiences in Alanya with transparent fixed prices.'
  };

  const sampleReviews: Review[] = [
    {
      id: 'rev-1',
      tourId: 'boat-tour',
      tourName: 'Boat Tour',
      customerName: 'Marcus & Elena V.',
      rating: 5,
      date: '2026-09-28',
      text: 'Wonderful boat trip around Alanya peninsula! Clear turquoise water, great swim near the pirate caves, and tasty grilled chicken on deck. Exact fixed price as advertised.',
      language: 'en',
      status: 'published',
      isSample: true
    },
    {
      id: 'rev-2',
      tourId: 'green-canyon',
      tourName: 'Green Canyon',
      customerName: 'Agnieszka K.',
      rating: 5,
      date: '2026-10-02',
      text: 'Zielony Kanion zrobił na nas ogromne wrażenie. Spokojny rejs katamaranem po szmaragdowej wodzie, pyszny obiad nad jeziorem. Żadnych ukrytych opłat.',
      language: 'pl',
      status: 'published',
      isSample: true
    },
    {
      id: 'rev-3',
      tourId: 'jeep-safari',
      tourName: 'Jeep Safari',
      customerName: 'Дмитрий С.',
      rating: 5,
      date: '2026-10-05',
      text: 'Отличное джип-сафари в горы Тавр! Море эмоций, водные баталии и обед над рекой Димчай на топчанах. Огромный плюс — быстрая связь в WhatsApp.',
      language: 'ru',
      status: 'published',
      isSample: true
    }
  ];

  if (fs.existsSync(STORE_FILE)) {
    try {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<DataStore>;
      
      // Ensure all initial tours including transfers are present and not lost
      const tourMap = new Map<string, Tour>();
      INITIAL_TOURS.forEach(t => tourMap.set(t.id, t));
      if (parsed.tours && Array.isArray(parsed.tours)) {
        parsed.tours.forEach(t => tourMap.set(t.id, t));
      }
      // Guarantee transfers are present
      INITIAL_TOURS.filter(t => t.category === 'transfer').forEach(t => {
        if (!tourMap.has(t.id)) {
          tourMap.set(t.id, t);
        }
      });

      const mergedStore: DataStore = {
        tours: Array.from(tourMap.values()).sort((a, b) => a.order - b.order),
        settings: { ...defaultSettings, ...(parsed.settings || {}) },
        adminPasswordHash: parsed.adminPasswordHash || initialHash,
        adminSalt: parsed.adminSalt || initialSalt,
        sessions: parsed.sessions || [],
        bookings: parsed.bookings || [],
        reviews: parsed.reviews || sampleReviews
      };
      saveStore(mergedStore);
      return mergedStore;
    } catch (err) {
      console.error('Error reading store file, resetting to initial state:', err);
    }
  }

  const initialStore: DataStore = {
    tours: INITIAL_TOURS,
    settings: defaultSettings,
    adminPasswordHash: initialHash,
    adminSalt: initialSalt,
    sessions: [],
    bookings: [],
    reviews: sampleReviews
  };

  saveStore(initialStore);
  return initialStore;
}

function saveStore(data: DataStore) {
  try {
    const tempFile = `${STORE_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, STORE_FILE);
  } catch (err) {
    console.error('Failed to save data store:', err);
  }
}

let store: DataStore = initializeStore();

// Basic IP rate limiter for AI Chat
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 30): boolean {
  const now = Date.now();
  const current = ipRequestCounts.get(ip);
  if (!current || now > current.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  if (current.count >= limit) {
    return false;
  }
  current.count++;
  return true;
}

// Authentication middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: missing token' });
  }
  const token = authHeader.split(' ')[1];
  if (!store.sessions.includes(token)) {
    return res.status(401).json({ error: 'Unauthorized: invalid or expired session' });
  }
  next();
}

app.use(express.json({ limit: '10mb' }));

// -------------------------------------------------------------
// Public Tours API
// -------------------------------------------------------------
app.get('/api/tours', (_req: Request, res: Response) => {
  res.json(store.tours);
});

app.get('/api/tours/:id', (req: Request, res: Response) => {
  const tour = store.tours.find(t => t.id === req.params.id || t.slug === req.params.id);
  if (!tour) {
    return res.status(404).json({ error: 'Tour not found' });
  }
  res.json(tour);
});

// Admin Tour Management
app.post('/api/tours', requireAdmin, (req: Request, res: Response) => {
  const newTour: Tour = req.body;
  if (!newTour.id) {
    newTour.id = `tour-${Date.now()}`;
  }
  if (!newTour.slug) {
    newTour.slug = newTour.id;
  }
  store.tours.push(newTour);
  saveStore(store);
  res.status(201).json(newTour);
});

app.put('/api/tours/:id', requireAdmin, (req: Request, res: Response) => {
  const index = store.tours.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Tour not found' });
  }
  store.tours[index] = { ...store.tours[index], ...req.body, id: req.params.id };
  saveStore(store);
  res.json(store.tours[index]);
});

app.delete('/api/tours/:id', requireAdmin, (req: Request, res: Response) => {
  const initialLength = store.tours.length;
  store.tours = store.tours.filter(t => t.id !== req.params.id);
  if (store.tours.length === initialLength) {
    return res.status(404).json({ error: 'Tour not found' });
  }
  saveStore(store);
  res.json({ success: true, message: 'Tour deleted successfully' });
});

// -------------------------------------------------------------
// Bookings API
// -------------------------------------------------------------
app.post('/api/bookings', (req: Request, res: Response) => {
  const {
    tourId,
    tourName,
    date,
    adults,
    children = 0,
    customerName,
    hotelName,
    hotelLocation = '',
    roomNumber = '',
    phone,
    language = 'en',
    pickupPreference = 'hotel',
    notes = '',
    estimatedTotal,
    currency = 'EUR'
  } = req.body;

  if (!tourId || !date || !customerName || !phone || !adults) {
    return res.status(400).json({ error: 'Missing required booking fields.' });
  }

  // Validate date is not past
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (bookingDate < today) {
    return res.status(400).json({ error: 'Selected date cannot be in the past.' });
  }

  const newBooking: BookingRequest = {
    id: `BK-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
    tourId,
    tourName: tourName || 'Selected Tour',
    date,
    adults: Number(adults),
    children: Number(children),
    customerName: String(customerName).trim(),
    hotelName: String(hotelName).trim(),
    hotelLocation: String(hotelLocation).trim(),
    roomNumber: String(roomNumber).trim(),
    phone: String(phone).trim(),
    language,
    pickupPreference,
    notes: String(notes).trim(),
    estimatedTotal: Number(estimatedTotal) || 0,
    currency,
    status: 'new',
    createdAt: new Date().toISOString()
  };

  store.bookings.unshift(newBooking);
  saveStore(store);
  res.status(201).json(newBooking);
});

app.get('/api/bookings', requireAdmin, (_req: Request, res: Response) => {
  res.json(store.bookings);
});

app.put('/api/bookings/:id', requireAdmin, (req: Request, res: Response) => {
  const booking = store.bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  if (req.body.status) booking.status = req.body.status;
  if (req.body.internalNotes !== undefined) booking.internalNotes = req.body.internalNotes;
  saveStore(store);
  res.json(booking);
});

// -------------------------------------------------------------
// Reviews API
// -------------------------------------------------------------
app.get('/api/reviews', (_req: Request, res: Response) => {
  const publicReviews = store.reviews.filter(r => r.status === 'published');
  res.json(publicReviews);
});

app.get('/api/admin/reviews', requireAdmin, (_req: Request, res: Response) => {
  res.json(store.reviews);
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { tourId, tourName, customerName, rating, text, language = 'en' } = req.body;
  if (!customerName || !rating || !text) {
    return res.status(400).json({ error: 'Missing review fields.' });
  }

  const review: Review = {
    id: `rev-${Date.now()}`,
    tourId,
    tourName,
    customerName: String(customerName).trim(),
    rating: Math.min(5, Math.max(1, Number(rating))),
    date: new Date().toISOString().split('T')[0],
    text: String(text).trim(),
    language,
    status: 'published',
    isSample: false
  };

  store.reviews.unshift(review);
  saveStore(store);
  res.status(201).json(review);
});

app.put('/api/reviews/:id', requireAdmin, (req: Request, res: Response) => {
  const review = store.reviews.find(r => r.id === req.params.id);
  if (!review) return res.status(404).json({ error: 'Review not found' });
  Object.assign(review, req.body);
  saveStore(store);
  res.json(review);
});

app.delete('/api/reviews/:id', requireAdmin, (req: Request, res: Response) => {
  store.reviews = store.reviews.filter(r => r.id !== req.params.id);
  saveStore(store);
  res.json({ success: true });
});

// -------------------------------------------------------------
// Settings API
// -------------------------------------------------------------
app.get('/api/settings', (_req: Request, res: Response) => {
  // Public settings
  const publicSettings = { ...store.settings };
  res.json(publicSettings);
});

app.put('/api/settings', requireAdmin, (req: Request, res: Response) => {
  store.settings = { ...store.settings, ...req.body };
  saveStore(store);
  res.json(store.settings);
});

// -------------------------------------------------------------
// Admin Auth & Stats API
// -------------------------------------------------------------
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  const testHash = hashPassword(password, store.adminSalt);
  if (testHash !== store.adminPasswordHash) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  store.sessions.push(token);
  // Keep last 100 sessions
  if (store.sessions.length > 100) store.sessions.shift();
  saveStore(store);

  res.json({
    token,
    message: 'Login successful'
  });
});

app.post('/api/admin/change-password', requireAdmin, (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || String(newPassword).length < 4) {
    return res.status(400).json({ error: 'New password must be at least 4 characters.' });
  }

  const currentHash = hashPassword(currentPassword, store.adminSalt);
  if (currentHash !== store.adminPasswordHash) {
    return res.status(401).json({ error: 'Current password incorrect' });
  }

  const newSalt = crypto.randomBytes(16).toString('hex');
  store.adminSalt = newSalt;
  store.adminPasswordHash = hashPassword(newPassword, newSalt);
  saveStore(store);

  res.json({ success: true, message: 'Password changed successfully' });
});

app.get('/api/admin/stats', requireAdmin, (_req: Request, res: Response) => {
  const totalBookings = store.bookings.length;
  const statusCounts = {
    new: store.bookings.filter(b => b.status === 'new').length,
    contacted: store.bookings.filter(b => b.status === 'contacted').length,
    confirmed: store.bookings.filter(b => b.status === 'confirmed').length,
    cancelled: store.bookings.filter(b => b.status === 'cancelled').length
  };

  // Popular tours ranking
  const tourCounts: Record<string, number> = {};
  store.bookings.forEach(b => {
    tourCounts[b.tourName] = (tourCounts[b.tourName] || 0) + 1;
  });

  const popularTours = Object.entries(tourCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  res.json({
    totalBookings,
    statusCounts,
    popularTours,
    totalTours: store.tours.length,
    totalReviews: store.reviews.length
  });
});

// -------------------------------------------------------------
// AI Assistant API (Gemini with @google/genai)
// -------------------------------------------------------------
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  const clientIp = req.ip || 'default';
  if (!checkRateLimit(clientIp, store.settings.rateLimitPerMinute || 30)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before sending another message or message us directly on WhatsApp.',
      reply: 'You have sent multiple messages in a short period. Please wait a moment or tap the WhatsApp button for direct assistance.'
    });
  }

  const { message, language = 'en', history = [] } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return res.json({
      configured: false,
      reply: language === 'ru'
        ? 'Здравствуйте! AI ассистент работает в автономном режиме. Вы можете напрямую написать нашему менеджеру в WhatsApp по номеру +905367180036 для бронирования и консультации!'
        : language === 'pl'
        ? 'Dzień dobry! Asystent AI działa w trybie informacyjnym. Skontaktuj się bezpośrednio z naszym menedżerem na WhatsApp (+905367180036), aby sprawdzić dostępność i zarezerwować wycieczkę!'
        : language === 'de'
        ? 'Hallo! Der KI-Assistent befindet sich im Offline-Modus. Bitte kontaktieren Sie uns direkt per WhatsApp unter +905367180036 für Fragen und Buchungen!'
        : language === 'cs'
        ? 'Dobrý den! AI asistent je v offline režimu. Pro rezervace a dotazy nás prosím kontaktujte přímo přes WhatsApp na čísle +905367180036!'
        : "Hello! Our AI travel assistant is currently in offline mode. Please contact our team directly on WhatsApp at +905367180036 for instant assistance and bookings!"
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Build database context with exact live tours, prices, and pickup info
    const tourSummaries = store.tours.map(t => {
      const trans = t.translations[language as keyof typeof t.translations] || t.translations.en;
      return `- ID: "${t.id}" | Name: "${trans.name}" | Price: €${t.price} ${t.pricingUnit} | Category: ${t.category} | Duration: ${t.duration} | Days: ${trans.operatingDays} | Highlights: ${trans.highlights.slice(0, 3).join(', ')}`;
    }).join('\n');

    const systemInstruction = `You are the official "Fix Price AI Travel Assistant" for FIX PRICE ALANYA TOURS based in Alanya, Antalya, Turkey.
Your job is to assist international visitors in choosing tours, answering questions accurately based strictly on our tour database, calculating prices, and helping them prepare a WhatsApp reservation.

OFFICIAL TOUR CATALOG AND EXACT CURRENT PRICES:
${tourSummaries}

CORE BUSINESS POLICIES & ACCURACY RULES:
1. All prices come strictly from the catalog above. Never invent, guess, discount, or round prices. VIP Yacht is €400 per yacht charter. Skydiving is €650 per package. VIP Airport Transfers: Antalya Airport (AYT) to/from Alanya is €80 fixed price per vehicle (Mercedes Vito, up to 8 passengers). Gazipaşa Airport (GZP) to/from Alanya is €45 fixed price per vehicle.
2. WhatsApp (+905367180036) is our primary booking and customer communication channel.
3. Every hotel pickup requires guests to follow this exact instruction:
"Please wait outside at the security gate 10 minutes before your tour time." (For airport pickups, the driver meets guests at the terminal exit with a name signboard).
4. If exact pickup times or operating availability depend on hotel area or weather, clearly state: "Please confirm availability and exact pickup details on WhatsApp."
5. Never claim that a booking is immediately confirmed. All requests are sent via WhatsApp for final local confirmation.
6. Speak fluently and politely in the user's selected language (${language}). If they write in another language, reply in that language.
7. Keep answers structured, warm, concise, and helpful. If recommending a tour, mention its price in EUR.
8. Offer quick options or suggest booking via WhatsApp when they show interest.`;

    // Convert history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
    if (Array.isArray(history)) {
      history.slice(-6).forEach((h: { sender: string; text: string }) => {
        contents.push({
          role: h.sender === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.text }]
        });
      });
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600
      }
    });

    const replyText = response.text || "I'm here to help you choose the best tour in Alanya! Feel free to ask about our boat trips, safaris, or prices.";

    res.json({
      configured: true,
      reply: replyText
    });
  } catch (err: unknown) {
    console.error('Gemini API Error:', err);
    res.json({
      configured: false,
      reply: language === 'ru'
        ? 'Произошла временная задержка связи с AI. Пожалуйста, напишите нам в WhatsApp по номеру +905367180036 — мы ответим моментально!'
        : "A temporary connection delay occurred with the AI service. Please contact our team directly on WhatsApp (+905367180036) for immediate answers!"
    });
  }
});

// -------------------------------------------------------------
// Vite middleware in Dev / Static serving in Production
// -------------------------------------------------------------
async function setupVite() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FIX PRICE ALANYA TOURS server running on http://0.0.0.0:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});
