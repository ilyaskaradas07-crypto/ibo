import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { AiAssistantModal } from './AiAssistantModal';
import { MessageCircle, Send, Bot, Sparkles } from 'lucide-react';

export const FloatingContactButtons: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings } = useTours();
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  const defaultGreeting: Record<string, string> = {
    en: 'Hello Fix Price Alanya Tours! I need information about your tours.',
    ru: 'Здравствуйте, Fix Price Alanya Tours! Я хочу узнать подробнее об экскурсиях.',
    pl: 'Dzień dobry Fix Price Alanya Tours! Chciałbym/chciałabym zapytać o wycieczki.',
    cs: 'Dobrý den Fix Price Alanya Tours! Rád/a bych se zeptal/a na vaše výlety.',
    de: 'Hallo Fix Price Alanya Tours! Ich benötige Informationen zu Ihren Ausflügen.'
  };

  const whatsappText = encodeURIComponent(defaultGreeting[language] || defaultGreeting.en);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappText}`;

  // Telegram is strictly hidden unless valid URL is provided
  const showTelegram = settings.telegramEnabled && settings.telegramUrl && settings.telegramUrl.trim().length > 3;

  return (
    <>
      {/* Floating Container: stacked vertically at bottom-right */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Telegram Button (if configured) */}
        {showTelegram && (
          <div className="pointer-events-auto group relative">
            <span className="hidden group-hover:block absolute right-full mr-2.5 top-1/2 -translate-y-1/2 bg-stone-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap shadow-md pointer-events-none">
              Contact us on Telegram
            </span>
            <a
              href={settings.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on Telegram"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-sky-600 hover:bg-sky-500 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-sky-950/20 transition-all border border-white/20"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </a>
          </div>
        )}

        {/* WhatsApp Floating Button */}
        {settings.whatsappEnabled !== false && (
          <div className="pointer-events-auto group relative">
            <span className="hidden group-hover:block absolute right-full mr-2.5 top-1/2 -translate-y-1/2 bg-stone-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap shadow-md pointer-events-none">
              Chat on WhatsApp
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white flex items-center justify-center shadow-xl shadow-emerald-950/25 transition-all border-2 border-white"
            >
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white/20" />
            </a>
          </div>
        )}

        {/* AI Travel Assistant Floating Button */}
        {settings.aiAssistantEnabled !== false && (
          <div className="pointer-events-auto group relative">
            <span className="hidden group-hover:block absolute right-full mr-2.5 top-1/2 -translate-y-1/2 bg-emerald-950 text-white text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap shadow-md pointer-events-none">
              {settings.aiAssistantName || t.aiAssistant.buttonTooltip}
            </span>
            <button
              onClick={() => setAiModalOpen(true)}
              aria-label="Open AI Travel Assistant"
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-950 to-emerald-800 hover:from-emerald-900 hover:to-emerald-700 active:scale-95 text-white flex items-center justify-center shadow-xl shadow-emerald-950/30 transition-all border-2 border-emerald-400/40"
            >
              <Bot className="w-6 h-6 text-amber-300" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-white items-center justify-center text-[8px] font-black text-emerald-950">
                  AI
                </span>
              </span>
            </button>
          </div>
        )}

      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </>
  );
};
