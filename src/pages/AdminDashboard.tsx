import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { Tour, BookingRequest, Review, SiteSettings, Language, PricingUnit, TourCategory } from '../types';
import {
  Compass, Lock, Key, LogOut, LayoutDashboard, Compass as TourIcon,
  CalendarCheck, Star, Settings, MessageSquare, Bot, Plus, Trash2,
  Edit3, CheckCircle2, XCircle, Download, ExternalLink, RefreshCw,
  Search, ShieldAlert, AlertTriangle, Eye, EyeOff
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { language, formatPrice } = useLanguage();
  const { tours, refreshTours, settings, refreshSettings } = useTours();

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('fixprice_admin_token');
  });

  // Login Form
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'tours' | 'bookings' | 'reviews' | 'settings' | 'ai'>('overview');

  // Stats
  const [stats, setStats] = useState<{
    totalBookings: number;
    statusCounts: { new: number; contacted: number; confirmed: number; cancelled: number };
    popularTours: { name: string; count: number }[];
    totalTours: number;
    totalReviews: number;
  } | null>(null);

  // Bookings list
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');
  const [bookingSearch, setBookingSearch] = useState<string>('');

  // Reviews list
  const [adminReviews, setAdminReviews] = useState<Review[]>([]);

  // Tour Edit Modal
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isCreatingTour, setIsCreatingTour] = useState(false);
  const [tourFormLang, setTourFormLang] = useState<Language>('en');

  // Settings Form
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState<string | null>(null);

  // Password Change Form
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMessage, setPassMessage] = useState<string | null>(null);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  // Load Admin Data when authenticated
  const loadAdminData = async (authToken: string) => {
    try {
      // 1. Stats
      const statsRes = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // 2. Bookings
      const bookRes = await fetch('/api/bookings', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (bookRes.ok) {
        const bookData = await bookRes.json();
        setBookings(bookData);
      }

      // 3. Reviews
      const revRes = await fetch('/api/admin/reviews', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (revRes.ok) {
        const revData = await revRes.json();
        setAdminReviews(revData);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  useEffect(() => {
    if (token) {
      loadAdminData(token);
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        localStorage.setItem('fixprice_admin_token', data.token);
        setPasswordInput('');
        loadAdminData(data.token);
      } else {
        const errData = await res.json();
        setLoginError(errData.error || 'Invalid password');
      }
    } catch {
      setLoginError('Could not connect to authentication service.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('fixprice_admin_token');
  };

  // -----------------------------------------------------------------
  // Tour CRUD
  // -----------------------------------------------------------------
  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTour || !token) return;

    try {
      const method = isCreatingTour ? 'POST' : 'PUT';
      const endpoint = isCreatingTour ? '/api/tours' : `/api/tours/${editingTour.id}`;

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editingTour)
      });

      if (res.ok) {
        await refreshTours();
        setEditingTour(null);
        setIsCreatingTour(false);
      } else {
        alert('Failed to save tour. Please check server logs.');
      }
    } catch (err) {
      console.error('Save tour error:', err);
    }
  };

  const handleDeleteTour = async (tourId: string) => {
    if (!token) return;
    if (!window.confirm(`Are you sure you want to permanently delete tour "${tourId}"?`)) return;

    try {
      const res = await fetch(`/api/tours/${tourId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        await refreshTours();
      }
    } catch (err) {
      console.error('Delete tour error:', err);
    }
  };

  // -----------------------------------------------------------------
  // Booking Status & Notes
  // -----------------------------------------------------------------
  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setBookings(prev => prev.map(b => b.id === id ? updated : b));
      }
    } catch (err) {
      console.error('Update booking error:', err);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID,Date,Tour,Customer,Phone,Hotel,Adults,Children,EstimatedTotal,Status,CreatedAt'];
    const rows = bookings.map(b => {
      return `"${b.id}","${b.date}","${b.tourName.replace(/"/g, '""')}","${b.customerName.replace(/"/g, '""')}","${b.phone}","${b.hotelName.replace(/"/g, '""')}","${b.adults}","${b.children}","${b.estimatedTotal}","${b.status}","${b.createdAt}"`;
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fixprice_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -----------------------------------------------------------------
  // Settings Update
  // -----------------------------------------------------------------
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSettingsSavedMessage(null);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        await refreshSettings();
        setSettingsSavedMessage('Settings successfully saved and live!');
        setTimeout(() => setSettingsSavedMessage(null), 3000);
      }
    } catch (err) {
      console.error('Save settings error:', err);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setPassMessage(null);

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
      });
      const data = await res.json();
      if (res.ok) {
        setPassMessage('Password updated successfully!');
        setCurrentPass('');
        setNewPass('');
      } else {
        setPassMessage(`Error: ${data.error}`);
      }
    } catch {
      setPassMessage('Failed to change password.');
    }
  };

  // -----------------------------------------------------------------
  // IF NOT AUTHENTICATED -> SHOW LOGIN SCREEN
  // -----------------------------------------------------------------
  if (!token) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-amber-300 flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-stone-900 tracking-tight">
              FIX PRICE ALANYA TOURS
            </h2>
            <p className="text-xs text-stone-500">
              Administrative Management Console
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password (default: 1234)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white outline-none transition"
              />
              <span className="text-[10px] text-stone-400 block pt-0.5">
                Initial setup password is <strong>1234</strong>. You can change it inside Settings.
              </span>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg transition"
            >
              {loggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -----------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-950 text-white p-6 rounded-3xl shadow-lg border border-emerald-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300 border border-emerald-700">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight">
              Fix Price Admin Control Center
            </h1>
            <p className="text-xs text-emerald-300">
              Alanya Operations & WhatsApp Reservations Desk
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadAdminData(token)}
            className="p-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-200 transition"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-900/80 hover:bg-red-900/80 text-white text-xs font-semibold transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'overview' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('tours')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'tours' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <TourIcon className="w-4 h-4" />
          <span>Tour Management ({tours.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'bookings' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Booking Requests ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'reviews' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Reviews ({adminReviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'settings' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Website Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 ${
            activeTab === 'ai' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-stone-600 hover:bg-stone-50'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Communication & AI</span>
        </button>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* TAB A: OVERVIEW */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Booking Requests</span>
              <div className="text-3xl font-black text-stone-900">{bookings.length}</div>
              <span className="text-xs text-emerald-700 font-semibold">Saved in real database</span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">New Pending Requests</span>
              <div className="text-3xl font-black text-amber-600">
                {bookings.filter(b => b.status === 'new').length}
              </div>
              <span className="text-xs text-stone-400">Needs WhatsApp reply</span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Active Catalog Tours</span>
              <div className="text-3xl font-black text-emerald-800">{tours.length}</div>
              <span className="text-xs text-stone-400">With 5-language data</span>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Customer Reviews</span>
              <div className="text-3xl font-black text-stone-900">{adminReviews.length}</div>
              <span className="text-xs text-stone-400">Published or moderated</span>
            </div>
          </div>

          {/* Quick Actions & Recent Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recent Bookings (2 Cols) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-stone-900">
                  Recent WhatsApp Booking Requests
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-semibold text-emerald-800 hover:underline"
                >
                  View All
                </button>
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-stone-900 text-sm">{b.customerName}</div>
                        <div className="text-stone-500">{b.tourName} · {b.date} · {b.hotelName}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-stone-900 text-sm">€{b.estimatedTotal}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          b.status === 'new' ? 'bg-amber-100 text-amber-800' :
                          b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400 py-6 text-center">
                  No booking requests received yet.
                </p>
              )}
            </div>

            {/* Quick Actions (1 Col) */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-stone-900">
                Quick Actions
              </h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    setActiveTab('tours');
                    setIsCreatingTour(true);
                    setEditingTour({
                      id: `tour-${Date.now()}`,
                      slug: `custom-tour-${Date.now()}`,
                      category: 'boat',
                      price: 25,
                      childPrice: 15,
                      pricingUnit: 'per_person',
                      showFromPrice: false,
                      featured: false,
                      popular: false,
                      active: true,
                      duration: 'Approx. 5h',
                      pickupType: 'hotel',
                      pickupTime: '09:00',
                      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
                      gallery: [],
                      order: tours.length + 1,
                      translations: {
                        en: {
                          name: 'New Alanya Tour',
                          shortDescription: 'Short summary',
                          description: 'Full tour itinerary description',
                          operatingDays: 'Daily',
                          pickupInstructions: 'Please wait outside at the security gate 10 minutes before your tour time.',
                          highlights: ['Highlights'],
                          included: ['Transfer', 'Guide', 'Insurance'],
                          excluded: ['Drinks'],
                          whatToBring: ['Sunscreen'],
                          itinerary: []
                        },
                        ru: {
                          name: 'Новая экскурсия',
                          shortDescription: 'Краткое описание',
                          description: 'Полное описание',
                          operatingDays: 'Ежедневно',
                          pickupInstructions: 'Пожалуйста, ожидайте снаружи у ворот охраны за 10 минут до начала экскурсии.',
                          highlights: ['Главное'],
                          included: ['Трансфер'],
                          excluded: ['Напитки'],
                          whatToBring: ['Панама'],
                          itinerary: []
                        },
                        pl: {
                          name: 'Nowa wycieczka',
                          shortDescription: 'Krótki opis',
                          description: 'Pełny opis',
                          operatingDays: 'Codziennie',
                          pickupInstructions: 'Prosimy o oczekiwanie na zewnątrz przy bramie ochrony 10 minut przed rozpoczęciem wycieczki.',
                          highlights: ['Atrakcje'],
                          included: ['Transfer'],
                          excluded: ['Napoje'],
                          whatToBring: ['Krem'],
                          itinerary: []
                        },
                        cs: {
                          name: 'Nový výlet',
                          shortDescription: 'Stručný popis',
                          description: 'Detailní popis',
                          operatingDays: 'Denně',
                          pickupInstructions: 'Prosím, vyčkejte venku u bezpečnostní brány 10 minut před časem výletu.',
                          highlights: ['Body'],
                          included: ['Transfer'],
                          excluded: ['Nápoje'],
                          whatToBring: ['Obuv'],
                          itinerary: []
                        },
                        de: {
                          name: 'Neue Tour',
                          shortDescription: 'Kurzbeschreibung',
                          description: 'Ausführliche Beschreibung',
                          operatingDays: 'Täglich',
                          pickupInstructions: 'Bitte warten Sie 10 Minuten vor Tourbeginn draußen am Sicherheitstor.',
                          highlights: ['Highlights'],
                          included: ['Transfer'],
                          excluded: ['Getränke'],
                          whatToBring: ['Sonnenbrille'],
                          itinerary: []
                        }
                      },
                      faqs: []
                    });
                  }}
                  className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Tour</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Bookings to CSV</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
                >
                  <Settings className="w-4 h-4" />
                  <span>Update WhatsApp / Phone</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB B: TOUR MANAGEMENT */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'tours' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-stone-900">
              Active Tour Catalog ({tours.length} Tours)
            </h3>
            <button
              onClick={() => {
                setIsCreatingTour(true);
                setEditingTour({
                  id: `tour-${Date.now()}`,
                  slug: `custom-tour-${Date.now()}`,
                  category: 'boat',
                  price: 25,
                  childPrice: 15,
                  pricingUnit: 'per_person',
                  showFromPrice: false,
                  featured: false,
                  popular: false,
                  active: true,
                  duration: 'Approx. 5h',
                  pickupType: 'hotel',
                  pickupTime: '09:00',
                  image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
                  gallery: [],
                  order: tours.length + 1,
                  translations: {
                    en: {
                      name: 'New Alanya Tour',
                      shortDescription: 'Short summary',
                      description: 'Full tour itinerary description',
                      operatingDays: 'Daily',
                      pickupInstructions: 'Please wait outside at the security gate 10 minutes before your tour time.',
                      highlights: ['Highlights'],
                      included: ['Transfer', 'Guide', 'Insurance'],
                      excluded: ['Drinks'],
                      whatToBring: ['Sunscreen'],
                      itinerary: []
                    },
                    ru: {
                      name: 'Новая экскурсия',
                      shortDescription: 'Краткое описание',
                      description: 'Полное описание',
                      operatingDays: 'Ежедневно',
                      pickupInstructions: 'Пожалуйста, ожидайте снаружи у ворот охраны за 10 минут до начала экскурсии.',
                      highlights: ['Главное'],
                      included: ['Трансфер'],
                      excluded: ['Напитки'],
                      whatToBring: ['Панама'],
                      itinerary: []
                    },
                    pl: {
                      name: 'Nowa wycieczka',
                      shortDescription: 'Krótki opis',
                      description: 'Pełny opis',
                      operatingDays: 'Codziennie',
                      pickupInstructions: 'Prosimy o oczekiwanie na zewnątrz przy bramie ochrony 10 minut przed rozpoczęciem wycieczki.',
                      highlights: ['Atrakcje'],
                      included: ['Transfer'],
                      excluded: ['Napoje'],
                      whatToBring: ['Krem'],
                      itinerary: []
                    },
                    cs: {
                      name: 'Nový výlet',
                      shortDescription: 'Stručný popis',
                      description: 'Detailní popis',
                      operatingDays: 'Denně',
                      pickupInstructions: 'Prosím, vyčkejte venku u bezpečnostní brány 10 minut před časem výletu.',
                      highlights: ['Body'],
                      included: ['Transfer'],
                      excluded: ['Nápoje'],
                      whatToBring: ['Obuv'],
                      itinerary: []
                    },
                    de: {
                      name: 'Neue Tour',
                      shortDescription: 'Kurzbeschreibung',
                      description: 'Ausführliche Beschreibung',
                      operatingDays: 'Täglich',
                      pickupInstructions: 'Bitte warten Sie 10 Minuten vor Tourbeginn draußen am Sicherheitstor.',
                      highlights: ['Highlights'],
                      included: ['Transfer'],
                      excluded: ['Getränke'],
                      whatToBring: ['Sonnenbrille'],
                      itinerary: []
                    }
                  },
                  faqs: []
                });
              }}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Tour</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Tour Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price (EUR)</th>
                    <th className="py-3 px-4">Pricing Unit</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {tours.map((tour, idx) => (
                    <tr key={tour.id} className="hover:bg-stone-50/60 transition">
                      <td className="py-3 px-4 font-mono text-stone-400">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-stone-900">
                        {tour.translations.en?.name || tour.id}
                      </td>
                      <td className="py-3 px-4 capitalize text-stone-600">{tour.category}</td>
                      <td className="py-3 px-4 font-bold text-emerald-900">€{tour.price}</td>
                      <td className="py-3 px-4 text-stone-500">{tour.pricingUnit}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          tour.active !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                        }`}>
                          {tour.active !== false ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setIsCreatingTour(false);
                            setEditingTour({ ...tour });
                          }}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTour(tour.id)}
                          className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* EDIT TOUR MODAL */}
      {/* ----------------------------------------------------------- */}
      {editingTour && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  {isCreatingTour ? 'Add New Tour' : `Edit Tour: ${editingTour.translations.en?.name}`}
                </h3>
                <span className="text-xs text-stone-400 font-mono">ID: {editingTour.id}</span>
              </div>
              <button
                onClick={() => setEditingTour(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTour} className="space-y-6">
              
              {/* Language Switcher for Tour Translations */}
              <div className="bg-stone-100 p-2 rounded-xl flex items-center gap-1">
                {(['en', 'ru', 'pl', 'cs', 'de'] as Language[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setTourFormLang(l)}
                    className={`flex-1 py-1.5 text-xs font-bold uppercase rounded-lg transition ${
                      tourFormLang === l ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {l} Translation
                  </button>
                ))}
              </div>

              {/* Translation Inputs for Active Lang */}
              <div className="space-y-3.5 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Tour Name ({tourFormLang.toUpperCase()}) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTour.translations[tourFormLang]?.name || ''}
                    onChange={(e) => {
                      const updated = { ...editingTour };
                      if (!updated.translations[tourFormLang]) {
                        updated.translations[tourFormLang] = { ...updated.translations.en };
                      }
                      updated.translations[tourFormLang].name = e.target.value;
                      setEditingTour(updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Short Description ({tourFormLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={2}
                    value={editingTour.translations[tourFormLang]?.shortDescription || ''}
                    onChange={(e) => {
                      const updated = { ...editingTour };
                      if (!updated.translations[tourFormLang]) {
                        updated.translations[tourFormLang] = { ...updated.translations.en };
                      }
                      updated.translations[tourFormLang].shortDescription = e.target.value;
                      setEditingTour(updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Full Description ({tourFormLang.toUpperCase()})
                  </label>
                  <textarea
                    rows={4}
                    value={editingTour.translations[tourFormLang]?.description || ''}
                    onChange={(e) => {
                      const updated = { ...editingTour };
                      if (!updated.translations[tourFormLang]) {
                        updated.translations[tourFormLang] = { ...updated.translations.en };
                      }
                      updated.translations[tourFormLang].description = e.target.value;
                      setEditingTour(updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* General Technical Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Price (€ EUR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editingTour.price}
                    onChange={(e) => setEditingTour({ ...editingTour, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Child Price (€ EUR)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editingTour.childPrice || 0}
                    onChange={(e) => setEditingTour({ ...editingTour, childPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Pricing Model
                  </label>
                  <select
                    value={editingTour.pricingUnit}
                    onChange={(e) => setEditingTour({ ...editingTour, pricingUnit: e.target.value as PricingUnit })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm"
                  >
                    <option value="per_person">Per Person</option>
                    <option value="per_vehicle">Per Vehicle (Airport VIP Transfer)</option>
                    <option value="per_yacht">Per Yacht (Private Charter)</option>
                    <option value="per_package">Per Package</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">Category</label>
                  <select
                    value={editingTour.category}
                    onChange={(e) => setEditingTour({ ...editingTour, category: e.target.value as TourCategory })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm capitalize"
                  >
                    <option value="transfer">Airport Transfers</option>
                    <option value="boat">Boat Trips</option>
                    <option value="adventure">Adventure & Safaris</option>
                    <option value="nature">Nature & Sightseeing</option>
                    <option value="family">Family Friendly</option>
                    <option value="wellness">Hamam & Spa</option>
                    <option value="excursions">Excursions & History</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">Duration</label>
                  <input
                    type="text"
                    value={editingTour.duration}
                    onChange={(e) => setEditingTour({ ...editingTour, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase">Pickup Time</label>
                  <input
                    type="text"
                    value={editingTour.pickupTime}
                    onChange={(e) => setEditingTour({ ...editingTour, pickupTime: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">
                  Main Photograph URL
                </label>
                <input
                  type="url"
                  value={editingTour.image}
                  onChange={(e) => setEditingTour({ ...editingTour, image: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm"
                />
              </div>

              {/* Mandatory Security Gate Note check */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 inline mr-1 text-amber-600" />
                <span>Pickup instruction requirement: "Please wait outside at the security gate 10 minutes before your tour time."</span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingTour(null)}
                  className="px-4 py-2.5 text-xs font-bold text-stone-500 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Save Changes to Database
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB C: BOOKING REQUESTS */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-stone-900">
                Customer Booking Requests ({bookings.length})
              </h3>
              <p className="text-xs text-stone-500">
                Manage incoming WhatsApp booking requests, update statuses, and contact guests.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Tour Name</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Hotel / Location</th>
                    <th className="py-3 px-4">Guests</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {bookings.map((b) => {
                    const cleanCustPhone = b.phone.replace(/[^0-9]/g, '');
                    return (
                      <tr key={b.id} className="hover:bg-stone-50/60 transition">
                        <td className="py-3 px-4 font-mono font-bold text-stone-900">{b.id}</td>
                        <td className="py-3 px-4 font-medium text-stone-800">{b.date}</td>
                        <td className="py-3 px-4 font-semibold text-stone-900">{b.tourName}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-stone-900">{b.customerName}</div>
                          <div className="text-[10px] text-stone-400 font-mono">{b.phone}</div>
                        </td>
                        <td className="py-3 px-4 text-stone-600">
                          {b.hotelName} {b.roomNumber ? `(Room ${b.roomNumber})` : ''}
                        </td>
                        <td className="py-3 px-4 font-medium">
                          {b.adults}A {b.children > 0 ? `+ ${b.children}C` : ''}
                        </td>
                        <td className="py-3 px-4 font-black text-emerald-900">
                          €{b.estimatedTotal}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                            className="text-[11px] font-bold uppercase rounded-lg border border-stone-200 bg-white px-2 py-1 outline-none"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <a
                            href={`https://wa.me/${cleanCustPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-[11px] font-bold"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB D: REVIEWS MODERATION */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-stone-900">
              Reviews Management ({adminReviews.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adminReviews.map((rev) => (
              <div key={rev.id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-stone-900 text-sm">{rev.customerName}</div>
                  <div className="text-amber-500 font-bold text-xs">{rev.rating} ★</div>
                </div>
                <p className="text-xs text-stone-600 italic">"{rev.text}"</p>
                <div className="text-[10px] text-stone-400">{rev.tourName} · {rev.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB E: WEBSITE SETTINGS */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-8 max-w-3xl">
          
          <h3 className="font-bold text-lg text-stone-900 border-b border-stone-200 pb-3">
            General Website Settings
          </h3>

          {settingsSavedMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{settingsSavedMessage}</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">
                  WhatsApp Business Number *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={settingsForm.contactPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settingsForm.contactEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">
                  Office Address
                </label>
                <input
                  type="text"
                  value={settingsForm.officeAddress}
                  onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Save Website Settings
            </button>
          </form>

          {/* Change Password Sub-Section */}
          <div className="pt-8 border-t border-stone-200 space-y-4">
            <h4 className="font-bold text-base text-stone-900">
              Change Admin Password
            </h4>

            {passMessage && (
              <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-800">
                {passMessage}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">New Password</label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs rounded-xl"
              >
                Update Password
              </button>
            </form>
          </div>

        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* TAB F: COMMUNICATION & AI SETTINGS */}
      {/* ----------------------------------------------------------- */}
      {activeTab === 'ai' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-8 max-w-3xl">
          
          <div className="border-b border-stone-200 pb-3">
            <h3 className="font-bold text-lg text-stone-900">
              Communication & AI Assistant Configuration
            </h3>
            <p className="text-xs text-stone-500">
              Manage WhatsApp, Telegram integration, and Gemini-powered travel assistant parameters.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            {/* Telegram Channel / URL Setting */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">Telegram Contact Channel</h4>
                  <p className="text-xs text-stone-500">
                    Will display floating button on public website when valid link is provided.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.telegramEnabled}
                    onChange={(e) => setSettingsForm({ ...settingsForm, telegramEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                </label>
              </div>

              <input
                type="text"
                placeholder="https://t.me/yourusername (Leave empty until configured)"
                value={settingsForm.telegramUrl}
                onChange={(e) => setSettingsForm({ ...settingsForm, telegramUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm"
              />
            </div>

            {/* AI Assistant Toggle & Display Name */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">AI Travel Assistant</h4>
                  <p className="text-xs text-stone-500">
                    Powered by Gemini 3.8 Flash, grounded in live tour catalog and prices.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.aiAssistantEnabled}
                    onChange={(e) => setSettingsForm({ ...settingsForm, aiAssistantEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">
                  Assistant Display Name
                </label>
                <input
                  type="text"
                  value={settingsForm.aiAssistantName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, aiAssistantName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">
                  Rate Limit per IP (Requests / min)
                </label>
                <input
                  type="number"
                  min={5}
                  max={120}
                  value={settingsForm.rateLimitPerMinute || 30}
                  onChange={(e) => setSettingsForm({ ...settingsForm, rateLimitPerMinute: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Save Communication & AI Settings
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
