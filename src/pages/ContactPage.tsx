import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useTours();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSent(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
          Alanya Office & Operations
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          {t.nav.contact}
        </h1>
        <p className="text-sm text-stone-600 font-light">
          Get in touch with our operations team in Alanya for tour inquiries, custom group departures, or private yacht reservations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-stone-900">
              Direct Contact Channels
            </h3>

            <div className="space-y-4 text-sm text-stone-700">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase block">Office Location</span>
                  <p className="font-semibold text-stone-900">{settings.officeAddress || 'Damlataş Caddesi, No: 14, Alanya, Antalya, Turkey'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase block">WhatsApp Business</span>
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-800 hover:underline"
                  >
                    {settings.whatsappNumber || '+90 536 718 0036'}
                  </a>
                  <span className="text-xs text-stone-400 block mt-0.5">Instant response in EN, RU, PL, CS, DE</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase block">Working Hours</span>
                  <p className="font-medium text-stone-800">Daily: 08:00 – 23:00 (Alanya Local Time, UTC+3)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase block">Email Address</span>
                  <a href={`mailto:${settings.contactEmail}`} className="font-medium text-stone-800 hover:text-emerald-800">
                    {settings.contactEmail || 'info@fixpricealanyatours.com'}
                  </a>
                </div>
              </div>
            </div>

            {settings.telegramEnabled && settings.telegramUrl && (
              <div className="pt-2">
                <a
                  href={settings.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Open Telegram Channel</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
          <h3 className="font-bold text-lg text-stone-900">
            Send an Online Message
          </h3>

          {sent ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
              <h4 className="font-bold text-stone-900 text-base">Message Sent Successfully</h4>
              <p className="text-xs text-stone-600">
                Thank you! Our Alanya team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">
                  Email / WhatsApp Contact *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase">
                  Your Inquiry / Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Which tour are you interested in? Any special pickup requests?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-600 focus:bg-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-bold text-sm shadow-md transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
