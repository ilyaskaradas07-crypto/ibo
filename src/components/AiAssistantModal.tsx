import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTours } from '../context/TourContext';
import { useBooking } from '../context/BookingContext';
import { X, Send, Bot, Sparkles, MessageCircle, AlertCircle, RefreshCw, Compass } from 'lucide-react';
import { AiChatMessage } from '../types';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t, formatPrice } = useLanguage();
  const { tours, settings } = useTours();
  const { openBooking } = useBooking();

  const welcomeText = settings.aiWelcomeMessage?.[language] || t.aiAssistant.welcomeMsg;

  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: welcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        t.aiAssistant.quickActions.findTour,
        t.aiAssistant.quickActions.bestTours,
        t.aiAssistant.quickActions.boatTrips,
        t.aiAssistant.quickActions.adventureTours,
        t.aiAssistant.quickActions.familyActivities,
        t.aiAssistant.quickActions.helpChoose,
        t.aiAssistant.quickActions.bookWhatsapp,
        t.aiAssistant.quickActions.changeLanguage
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (userText?: string) => {
    const textToSend = (userText || input).trim();
    if (!textToSend || loading) return;

    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!userText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
          history: messages.slice(-6).map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || t.aiAssistant.offlineNotice;

        setMessages(prev => [
          ...prev,
          {
            id: `reply-${Date.now()}`,
            sender: 'assistant',
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error('Chat API returned error');
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `reply-err-${Date.now()}`,
          sender: 'assistant',
          text: t.aiAssistant.offlineNotice,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    if (action === t.aiAssistant.quickActions.bookWhatsapp) {
      openBooking();
      onClose();
      return;
    }
    if (action === t.aiAssistant.quickActions.changeLanguage) {
      const nextLang = language === 'en' ? 'ru' : language === 'ru' ? 'pl' : language === 'pl' ? 'de' : language === 'de' ? 'cs' : 'en';
      setLanguage(nextLang);
      return;
    }
    handleSend(action);
  };

  const cleanPhone = (settings.whatsappNumber || '+905367180036').replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 z-50 w-full sm:w-[420px] h-full sm:h-[620px] max-h-full sm:max-h-[85vh] bg-white sm:rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 border border-emerald-600 flex items-center justify-center text-amber-300">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-950 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm tracking-tight">
                {settings.aiAssistantName || t.aiAssistant.title}
              </h3>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <p className="text-[11px] text-emerald-300">
              {t.aiAssistant.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/80 transition"
          aria-label="Close assistant"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                m.sender === 'user'
                  ? 'bg-emerald-800 text-white rounded-br-xs'
                  : 'bg-white text-stone-800 border border-stone-200/80 rounded-bl-xs'
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>
            </div>

            <span className="text-[10px] text-stone-400 mt-1 px-1">
              {m.timestamp}
            </span>

            {/* Quick Actions (if present) */}
            {m.quickActions && m.quickActions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 max-w-full">
                {m.quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action)}
                    className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 active:scale-95 transition shadow-xs"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-stone-500 text-xs py-2 px-3 bg-white rounded-xl border border-stone-200 w-max shadow-xs">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
            <span>{t.aiAssistant.thinking}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Direct WhatsApp Helper strip inside chat */}
      <div className="bg-emerald-50/70 border-t border-emerald-100 px-3 py-1.5 flex items-center justify-between text-[11px] text-emerald-900">
        <span className="truncate">Need instant human confirmation?</span>
        <a
          href={`https://wa.me/${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 shrink-0 ml-2"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Chat</span>
        </a>
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.aiAssistant.inputPlaceholder}
          className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white disabled:opacity-40 transition shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
