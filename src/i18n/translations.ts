import { Language } from '../types';
import { TURKISH_UI_TRANSLATIONS } from './turkishUiTranslations';

export interface UiTranslations {
  brandName: string;
  tagline: string;
  nav: {
    home: string;
    allTours: string;
    popularTours: string;
    boatTrips: string;
    adventureTours: string;
    natureTours: string;
    familyActivities: string;
    aboutUs: string;
    reviews: string;
    faq: string;
    contact: string;
    privacy: string;
    terms: string;
    admin: string;
    transfers: string;
    whatsappBooking: string;
  };
  hero: {
    badge: string;
    headline: string;
    subtitle: string;
    exploreBtn: string;
    whatsappBtn: string;
    searchTour: string;
    selectDate: string;
    adults: string;
    children: string;
    searchBtn: string;
    allToursOption: string;
  };
  trust: {
    whatsappBooking: string;
    whatsappBookingSub: string;
    localAssistance: string;
    localAssistanceSub: string;
    clearPrices: string;
    clearPricesSub: string;
    friendlySupport: string;
    friendlySupportSub: string;
  };
  filters: {
    all: string;
    boat: string;
    adventure: string;
    nature: string;
    family: string;
    wellness: string;
    excursions: string;
    transfer: string;
    searchPlaceholder: string;
    sortBy: string;
    priceLowHigh: string;
    priceHighLow: string;
    popularFirst: string;
    toursFound: string;
  };
  tourCard: {
    from: string;
    perPerson: string;
    perYacht: string;
    perPackage: string;
    perVehicle: string;
    bookWhatsapp: string;
    viewDetails: string;
    operatingDays: string;
    duration: string;
  };
  tourDetail: {
    overview: string;
    highlights: string;
    itinerary: string;
    included: string;
    notIncluded: string;
    whatToBring: string;
    safetyRequirements: string;
    pickupMeeting: string;
    securityGateNote: string;
    bookingCardTitle: string;
    selectDate: string;
    adultsLabel: string;
    childrenLabel: string;
    totalEstimate: string;
    bookOnWhatsappBtn: string;
    whatsappDisclaimer: string;
    faqTitle: string;
    relatedTours: string;
    confirmOnWhatsappNotice: string;
  };
  bookingForm: {
    modalTitle: string;
    step1: string;
    step2: string;
    customerName: string;
    customerNamePlaceholder: string;
    hotelName: string;
    hotelNamePlaceholder: string;
    roomNumber: string;
    roomNumberPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    pickupPreference: string;
    pickupHotel: string;
    pickupMeetingPoint: string;
    notes: string;
    notesPlaceholder: string;
    submitWhatsapp: string;
    validating: string;
    errors: {
      pastDate: string;
      noDate: string;
      noName: string;
      noHotel: string;
      noPhone: string;
      noAdults: string;
    };
    whatsappHonestNoticeTitle: string;
    whatsappHonestNoticeDesc: string;
    whatsappHonestNoticeClose: string;
  };
  aiAssistant: {
    buttonTooltip: string;
    title: string;
    subtitle: string;
    welcomeMsg: string;
    inputPlaceholder: string;
    send: string;
    thinking: string;
    quickActions: {
      findTour: string;
      bestTours: string;
      adventureTours: string;
      boatTrips: string;
      familyActivities: string;
      helpChoose: string;
      bookWhatsapp: string;
      changeLanguage: string;
    };
    offlineNotice: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    note: string;
    leaveReview: string;
    rating: string;
    yourName: string;
    selectTour: string;
    yourReview: string;
    submit: string;
    thankYou: string;
  };
  footer: {
    aboutText: string;
    quickLinks: string;
    popularCategories: string;
    contactInfo: string;
    securityReminder: string;
    copyright: string;
    address: string;
  };
  transfersPage: {
    badge: string;
    title: string;
    subtitle: string;
    aytBadge: string;
    gzpBadge: string;
    aytPriceNote: string;
    gzpPriceNote: string;
    fixedRatesBadge: string;
    chooseRouteTitle: string;
    chooseRouteSubtitle: string;
    aytCardTitle: string;
    aytCardDuration: string;
    aytCardCapacity: string;
    aytCardDesc: string;
    aytIncluded1: string;
    aytIncluded2: string;
    aytIncluded3: string;
    gzpCardTitle: string;
    gzpCardDuration: string;
    gzpCardCapacity: string;
    gzpCardDesc: string;
    gzpIncluded1: string;
    gzpIncluded2: string;
    gzpIncluded3: string;
    viewDetails: string;
    bookForPrice: string;
    formBadge: string;
    formTitle: string;
    formSubtitle: string;
    routeLabel: string;
    routeAytToAlanya: string;
    routeAlanyaToAyt: string;
    routeGzpToAlanya: string;
    routeAlanyaToGzp: string;
    dateLabel: string;
    flightTimeLabel: string;
    flightNumLabel: string;
    flightNumPlaceholder: string;
    passengersLabel: string;
    passengersSuffix: string;
    luggageLabel: string;
    luggageSuffix: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    hotelLabel: string;
    hotelPlaceholder: string;
    childSeatLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    totalFixedPrice: string;
    vehicleCapacityNote: string;
    bookWhatsappBtn: string;
    trustDelayTitle: string;
    trustDelayDesc: string;
    trustMeetTitle: string;
    trustMeetDesc: string;
    trustPrivateTitle: string;
    trustPrivateDesc: string;
    trustPriceTitle: string;
    trustPriceDesc: string;
  };
}

export const UI_TRANSLATIONS: Record<Language, UiTranslations> = {
  en: {
    brandName: 'FIX PRICE ALANYA TOURS',
    tagline: 'Transparent Fixed Prices · Authentic Mediterranean Tours',
    nav: {
      home: 'Home',
      allTours: 'All Tours',
      popularTours: 'Popular Tours',
      boatTrips: 'Boat Trips',
      adventureTours: 'Adventure Tours',
      natureTours: 'Nature & Sightseeing',
      familyActivities: 'Family Friendly',
      aboutUs: 'About Us',
      reviews: 'Reviews',
      faq: 'FAQs',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      admin: 'Admin',
      transfers: 'Transfers',
      whatsappBooking: 'WhatsApp Booking'
    },
    hero: {
      badge: 'Alanya, Antalya · Fair Fixed Prices',
      headline: 'Discover Alanya. Experience More. Pay a Fair Price.',
      subtitle: 'Explore the best boat trips, adventures, nature excursions, and unforgettable experiences in Alanya — all in one place.',
      exploreBtn: 'Explore Tours',
      whatsappBtn: 'Book on WhatsApp',
      searchTour: 'Select a Tour',
      selectDate: 'Preferred Date',
      adults: 'Adults (12+)',
      children: 'Children (4-11)',
      searchBtn: 'Search Tours',
      allToursOption: 'All 24 Tours'
    },
    trust: {
      whatsappBooking: 'Easy WhatsApp Booking',
      whatsappBookingSub: 'Direct booking requests without complex forms',
      localAssistance: 'Local Alanya Assistance',
      localAssistanceSub: 'Resident team on the ground in Alanya, Antalya',
      clearPrices: 'Clear Fixed Prices',
      clearPricesSub: 'No street negotiations, transparent upfront rates',
      friendlySupport: 'Friendly Customer Support',
      friendlySupportSub: 'Fast replies in your language before & during tours'
    },
    filters: {
      all: 'All Tours',
      boat: 'Boat Trips',
      adventure: 'Adventure & Safaris',
      nature: 'Nature & Sightseeing',
      family: 'Family Friendly',
      wellness: 'Hamam & Spa',
      excursions: 'Excursions & History',
      transfer: 'Airport Transfers',
      searchPlaceholder: 'Search by tour name or keywords...',
      sortBy: 'Sort by',
      priceLowHigh: 'Price: Low to High',
      priceHighLow: 'Price: High to Low',
      popularFirst: 'Most Popular',
      toursFound: 'tours available'
    },
    tourCard: {
      from: 'From',
      perPerson: 'per person',
      perYacht: 'per yacht charter',
      perPackage: 'per package',
      perVehicle: 'per vehicle (VIP Vito)',
      bookWhatsapp: 'Book on WhatsApp',
      viewDetails: 'View Details',
      operatingDays: 'Operating Days',
      duration: 'Duration'
    },
    tourDetail: {
      overview: 'Tour Overview',
      highlights: 'Highlights',
      itinerary: 'Typical Schedule',
      included: "What's Included",
      notIncluded: "What's Not Included",
      whatToBring: 'What to Bring',
      safetyRequirements: 'Requirements & Safety Notes',
      pickupMeeting: 'Pickup & Meeting Instructions',
      securityGateNote: 'Please wait outside at the security gate 10 minutes before your tour time.',
      bookingCardTitle: 'Reserve via WhatsApp',
      selectDate: 'Choose Preferred Date',
      adultsLabel: 'Adults',
      childrenLabel: 'Children (4-11)',
      totalEstimate: 'Estimated Total',
      bookOnWhatsappBtn: 'Request Booking on WhatsApp',
      whatsappDisclaimer: 'Final pickup time, hotel transfer window, and availability are confirmed directly on WhatsApp.',
      faqTitle: 'Frequently Asked Questions',
      relatedTours: 'You Might Also Like',
      confirmOnWhatsappNotice: 'Please confirm availability and pickup details on WhatsApp.'
    },
    bookingForm: {
      modalTitle: 'WhatsApp Tour Reservation',
      step1: 'Tour & Date Details',
      step2: 'Guest & Hotel Pickup Details',
      customerName: 'Full Name',
      customerNamePlaceholder: 'e.g. John Smith',
      hotelName: 'Hotel Name',
      hotelNamePlaceholder: 'e.g. Kleopatra Beach Hotel',
      roomNumber: 'Room Number (optional)',
      roomNumberPlaceholder: 'e.g. 304 or Leave empty if checking in later',
      phone: 'WhatsApp Phone Number',
      phonePlaceholder: '+44 7123 456789',
      pickupPreference: 'Pickup Preference',
      pickupHotel: 'Hotel Gate Pickup (Included for most hotels)',
      pickupMeetingPoint: 'Meet at designated central point / Harbour',
      notes: 'Special Requests / Notes (optional)',
      notesPlaceholder: 'e.g. Dietary preferences, child age, celebration',
      submitWhatsapp: 'Continue to WhatsApp',
      validating: 'Preparing your request...',
      errors: {
        pastDate: 'Tour date cannot be in the past.',
        noDate: 'Please select a preferred tour date.',
        noName: 'Please provide your full name.',
        noHotel: 'Please provide your hotel name or location in Alanya.',
        noPhone: 'Please provide a valid contact phone number with country code.',
        noAdults: 'At least one adult is required.'
      },
      whatsappHonestNoticeTitle: 'Opening WhatsApp',
      whatsappHonestNoticeDesc: 'WhatsApp is opening with your booking details. Please send the message to complete your reservation request. Our team will reply promptly with confirmation.',
      whatsappHonestNoticeClose: 'Understood'
    },
    aiAssistant: {
      buttonTooltip: 'AI Travel Assistant',
      title: 'Fix Price AI Travel Assistant',
      subtitle: 'Alanya tour recommendations & live price calculations',
      welcomeMsg: "Hello! Welcome to Fix Price Alanya Tours. I'm your AI travel assistant. I can help you find the best tours, compare prices, check available information, and prepare your booking.",
      inputPlaceholder: 'Ask about tours, prices, or recommendations...',
      send: 'Send',
      thinking: 'Checking tour database...',
      quickActions: {
        findTour: 'Find a Tour',
        bestTours: 'Best Tours in Alanya',
        adventureTours: 'Adventure Tours',
        boatTrips: 'Boat Trips',
        familyActivities: 'Family Activities',
        helpChoose: 'Help Me Choose',
        bookWhatsapp: 'Book on WhatsApp',
        changeLanguage: 'Change Language'
      },
      offlineNotice: 'AI server connection is running in offline mode. Please contact us directly on WhatsApp for live questions!'
    },
    reviews: {
      title: 'Guest Experiences',
      subtitle: 'Real impressions from travelers exploring Alanya',
      note: 'Verified review platform: only genuine submitted feedback is published.',
      leaveReview: 'Share Your Experience',
      rating: 'Rating',
      yourName: 'Your Name',
      selectTour: 'Tour you attended',
      yourReview: 'Your review notes',
      submit: 'Submit Review',
      thankYou: 'Thank you! Your feedback has been received and sent for verification.'
    },
    footer: {
      aboutText: 'FIX PRICE ALANYA TOURS is a dedicated excursion agency operating in Alanya, Antalya. We believe in clear prices, reliable hotel pickups, and genuine Mediterranean hospitality.',
      quickLinks: 'Quick Links',
      popularCategories: 'Categories',
      contactInfo: 'Contact & Office',
      securityReminder: 'Pickup Policy: Please wait outside at the security gate 10 minutes before your tour time.',
      copyright: '© 2026 FIX PRICE ALANYA TOURS. All rights reserved. Alanya, Antalya, Turkey.',
      address: 'Alanya Port / Damlataş Mevkii, Alanya, Antalya, Turkey'
    },
    transfersPage: {
      badge: 'Official Airport VIP Transfers · Alanya',
      title: 'Direct VIP Airport Transfers to Alanya',
      subtitle: 'Arrive relaxed without waiting for shared tourist buses. Private Mercedes Vito vehicles exclusively for your family or group with live flight tracking, meet & greet service, and transparent fixed prices.',
      aytBadge: 'Antalya Airport (AYT)',
      gzpBadge: 'Gazipaşa Airport (GZP)',
      aytPriceNote: '/ vehicle',
      gzpPriceNote: '/ vehicle',
      fixedRatesBadge: 'Fixed Vehicle Rates',
      chooseRouteTitle: 'Choose Your Airport Route',
      chooseRouteSubtitle: 'One fixed price for your entire party (up to 8 passengers). No hidden night surcharges or luggage fees.',
      aytCardTitle: 'Antalya Airport VIP Transfer (AYT)',
      aytCardDuration: 'Approx. 1h 45m - 2h direct drive',
      aytCardCapacity: 'Up to 8 passengers',
      aytCardDesc: 'Direct private Mercedes Vito transfer between Antalya International Airport (AYT) and all hotels or residences across Alanya, Mahmutlar, Konaklı, Avsallar, and Okurcalar. Includes meet & greet with your name on a signboard and flight delay monitoring.',
      aytIncluded1: 'Fixed price €80 per vehicle (no night surcharges)',
      aytIncluded2: 'Free flight delay tracking & terminal meet & greet',
      aytIncluded3: 'Private Mercedes Vito exclusively for your group',
      gzpCardTitle: 'Gazipaşa Airport VIP Transfer (GZP)',
      gzpCardDuration: 'Fast 35 - 45 min coastal drive',
      gzpCardCapacity: 'Up to 8 passengers',
      gzpCardDesc: 'The quickest and most comfortable way between Gazipaşa-Alanya Airport (GZP) and your hotel. Skip the long lines and shared shuttles. Private air-conditioned Mercedes Vito waiting right at the exit gate.',
      gzpIncluded1: 'Fixed price €45 per vehicle (up to 8 guests)',
      gzpIncluded2: 'Swift 35-45 minute direct journey',
      gzpIncluded3: 'Luggage assistance & door-to-door delivery',
      viewDetails: 'View Details',
      bookForPrice: 'Book for',
      formBadge: 'Direct WhatsApp Dispatch',
      formTitle: 'Reserve Your Airport Transfer',
      formSubtitle: 'Fill in your flight and hotel details below to generate a verified WhatsApp booking request.',
      routeLabel: 'Transfer Route *',
      routeAytToAlanya: 'Antalya Airport (AYT) ➔ Alanya',
      routeAlanyaToAyt: 'Alanya ➔ Antalya Airport (AYT)',
      routeGzpToAlanya: 'Gazipaşa Airport (GZP) ➔ Alanya',
      routeAlanyaToGzp: 'Alanya ➔ Gazipaşa Airport (GZP)',
      dateLabel: 'Date of Transfer *',
      flightTimeLabel: 'Flight Landing / Departure Time',
      flightNumLabel: 'Flight Number (Optional)',
      flightNumPlaceholder: 'e.g. TK2410 / PC2032',
      passengersLabel: 'Passenger Count (Max 8 in VIP Vito)',
      passengersSuffix: 'Passengers',
      luggageLabel: 'Suitcases / Big Luggage',
      luggageSuffix: 'Bags',
      nameLabel: 'Name for Signboard *',
      namePlaceholder: 'e.g. John Doe (Printed on greeting sign)',
      phoneLabel: 'WhatsApp Contact Phone *',
      hotelLabel: 'Hotel Name or Full Address in Alanya *',
      hotelPlaceholder: 'e.g. Kleopatra Atlas Hotel or Mahmutlar Barbaros Cad. No: 12',
      childSeatLabel: 'Baby car seat / child booster required (Provided free of charge)',
      notesLabel: 'Additional Requests (Optional)',
      notesPlaceholder: 'e.g. Extra large luggage, golf equipment, or special instructions',
      totalFixedPrice: 'Total Fixed Price',
      vehicleCapacityNote: 'Private VIP Mercedes Vito · Up to 8 passengers',
      bookWhatsappBtn: 'Book Transfer on WhatsApp',
      trustDelayTitle: 'Flight Delay Tracking',
      trustDelayDesc: 'We monitor your flight status in real time. If your plane is delayed, your driver adjusts pickup time with zero penalty.',
      trustMeetTitle: 'Meet & Greet Service',
      trustMeetDesc: 'Your private chauffeur waits right outside the arrivals terminal holding a signboard with your name.',
      trustPrivateTitle: '100% Private Mercedes Vito',
      trustPrivateDesc: 'Never shared with strangers. Direct route straight to your hotel reception or security gate.',
      trustPriceTitle: 'Transparent Fixed Price',
      trustPriceDesc: 'Antalya €80, Gazipaşa €45. No extra fuel charges, toll charges, or night surcharges.'
    }
  },
  ru: {
    brandName: 'FIX PRICE ALANYA TOURS',
    tagline: 'Честные фиксированные цены · Лучшие экскурсии в Аланье',
    nav: {
      home: 'Главная',
      allTours: 'Все экскурсии',
      popularTours: 'Популярные',
      boatTrips: 'Морские прогулки',
      adventureTours: 'Приключения и сафари',
      natureTours: 'Природа и история',
      familyActivities: 'Для всей семьи',
      aboutUs: 'О нас',
      reviews: 'Отзывы',
      faq: 'Вопросы и ответы',
      contact: 'Контакты',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия бронирования',
      admin: 'Админ-панель',
      transfers: 'Трансферы',
      whatsappBooking: 'Бронь через WhatsApp'
    },
    hero: {
      badge: 'Аланья, Анталья · Фиксированные цены',
      headline: 'Откройте для себя Аланью. Больше впечатлений. Честная цена.',
      subtitle: 'Лучшие морские прогулки, джип-сафари, каньоны и незабываемые приключения в Аланье — все в одном месте.',
      exploreBtn: 'Смотреть экскурсии',
      whatsappBtn: 'Заказать в WhatsApp',
      searchTour: 'Выберите экскурсию',
      selectDate: 'Желаемая дата',
      adults: 'Взрослые (12+)',
      children: 'Дети (4-11)',
      searchBtn: 'Найти экскурсии',
      allToursOption: 'Все 24 экскурсии'
    },
    trust: {
      whatsappBooking: 'Быстрая бронь в WhatsApp',
      whatsappBookingSub: 'Без предоплаты на сайте — быстро и напрямую',
      localAssistance: 'Поддержка в Аланье',
      localAssistanceSub: 'Команда находится прямо здесь, в Аланье',
      clearPrices: 'Прозрачные цены',
      clearPricesSub: 'Никаких скрытых наценок и уличных торгов',
      friendlySupport: 'Русскоязычная поддержка',
      friendlySupportSub: 'Быстрые ответы на вашем языке до и во время поездки'
    },
    filters: {
      all: 'Все экскурсии',
      boat: 'Морские прогулки',
      adventure: 'Сафари и адреналин',
      nature: 'Природа и каньоны',
      family: 'Семейный отдых',
      wellness: 'Хамам и спа',
      excursions: 'Исторические туры',
      transfer: 'VIP Трансферы',
      searchPlaceholder: 'Поиск экскурсий по названию...',
      sortBy: 'Сортировка',
      priceLowHigh: 'Сначала дешевле',
      priceHighLow: 'Сначала дороже',
      popularFirst: 'По популярности',
      toursFound: 'экскурсий найдено'
    },
    tourCard: {
      from: 'От',
      perPerson: 'за человека',
      perYacht: 'за аренду яхты',
      perPackage: 'за пакет',
      perVehicle: 'за автомобиль (VIP Vito)',
      bookWhatsapp: 'Бронь в WhatsApp',
      viewDetails: 'Подробнее',
      operatingDays: 'Дни проведения',
      duration: 'Длительность'
    },
    tourDetail: {
      overview: 'Описание экскурсии',
      highlights: 'Главные впечатления',
      itinerary: 'Программа экскурсии',
      included: 'Что входит в стоимость',
      notIncluded: 'Что оплачивается дополнительно',
      whatToBring: 'Что взять с собой',
      safetyRequirements: 'Безопасность и ограничения',
      pickupMeeting: 'Трансфер и инструкции по выезду',
      securityGateNote: 'Пожалуйста, ожидайте снаружи у ворот охраны за 10 минут до начала экскурсии.',
      bookingCardTitle: 'Забронировать через WhatsApp',
      selectDate: 'Выберите дату экскурсии',
      adultsLabel: 'Взрослые',
      childrenLabel: 'Дети (4-11 лет)',
      totalEstimate: 'Ориентировочная сумма',
      bookOnWhatsappBtn: 'Отправить заявку в WhatsApp',
      whatsappDisclaimer: 'Точное время сбора из вашего отеля и наличие мест подтверждаются в чате WhatsApp.',
      faqTitle: 'Часто задаваемые вопросы',
      relatedTours: 'Другие интересные туры',
      confirmOnWhatsappNotice: 'Пожалуйста, уточните наличие мест и детали трансфера в WhatsApp.'
    },
    bookingForm: {
      modalTitle: 'Заявка на бронирование в WhatsApp',
      step1: 'Данные экскурсии и дата',
      step2: 'Контакты и отель',
      customerName: 'Имя и фамилия',
      customerNamePlaceholder: 'Например, Иван Иванов',
      hotelName: 'Название отеля',
      hotelNamePlaceholder: 'Например, Kleopatra Beach Hotel',
      roomNumber: 'Номер комнаты (необязательно)',
      roomNumberPlaceholder: 'Например, 402 или укажите при заселении',
      phone: 'Телефон для WhatsApp',
      phonePlaceholder: '+7 999 123 45 67',
      pickupPreference: 'Место посадки',
      pickupHotel: 'У ворот отеля (включено для большинства отелей)',
      pickupMeetingPoint: 'Встреча в марине / в центре города',
      notes: 'Пожелания или примечания',
      notesPlaceholder: 'Возраст детей, особенности питания и др.',
      submitWhatsapp: 'Перейти в WhatsApp',
      validating: 'Формируем заявку...',
      errors: {
        pastDate: 'Дата экскурсии не может быть в прошлом.',
        noDate: 'Пожалуйста, выберите дату тура.',
        noName: 'Пожалуйста, укажите имя.',
        noHotel: 'Пожалуйста, укажите отель в Аланье.',
        noPhone: 'Пожалуйста, укажите контактный номер WhatsApp.',
        noAdults: 'Требуется как минимум 1 взрослый.'
      },
      whatsappHonestNoticeTitle: 'Открытие WhatsApp',
      whatsappHonestNoticeDesc: 'Открывается приложение WhatsApp с подготовленным текстом вашей заявки. Пожалуйста, нажмите «Отправить», чтобы завершить запрос. Наш менеджер сразу вам ответит.',
      whatsappHonestNoticeClose: 'Понятно'
    },
    aiAssistant: {
      buttonTooltip: 'AI Ассистент',
      title: 'Fix Price AI Travel Assistant',
      subtitle: 'Подбор экскурсий и актуальные цены в Аланье',
      welcomeMsg: 'Здравствуйте! Добро пожаловать в Fix Price Alanya Tours. Я ваш AI тревел-ассистент. Я помогу выбрать лучшую экскурсию, сравнить цены и быстро подготовить бронирование.',
      inputPlaceholder: 'Спросите про экскурсии, цены, трансфер...',
      send: 'Отправить',
      thinking: 'Проверяю базу экскурсий...',
      quickActions: {
        findTour: 'Найти экскурсию',
        bestTours: 'Лучшие экскурсии Аланьи',
        adventureTours: 'Сафари и экстрим',
        boatTrips: 'Морские прогулки',
        familyActivities: 'Для всей семьи',
        helpChoose: 'Помоги выбрать',
        bookWhatsapp: 'Бронь в WhatsApp',
        changeLanguage: 'Сменить язык'
      },
      offlineNotice: 'AI ассистент временно работает в автономном режиме. Вы можете сразу написать нам в WhatsApp!'
    },
    reviews: {
      title: 'Отзывы гостей',
      subtitle: 'Впечатления туристов об экскурсиях в Аланье',
      note: 'Публикуются только реальные проверенные отзывы клиентов.',
      leaveReview: 'Оставить отзыв',
      rating: 'Оценка',
      yourName: 'Ваше имя',
      selectTour: 'Какую экскурсию посетили',
      yourReview: 'Текст отзыва',
      submit: 'Отправить отзыв',
      thankYou: 'Спасибо за отзыв! Он отправлен на модерацию.'
    },
    footer: {
      aboutText: 'FIX PRICE ALANYA TOURS — проверенное агентство экскурсий в Аланье. Мы работаем по прозрачным ценам без уличных наценок с гарантированным трансфером.',
      quickLinks: 'Разделы',
      popularCategories: 'Категории',
      contactInfo: 'Контакты',
      securityReminder: 'Правило трансфера: Пожалуйста, ожидайте снаружи у ворот охраны за 10 минут до начала экскурсии.',
      copyright: '© 2026 FIX PRICE ALANYA TOURS. Все права защищены. Аланья, Анталья, Турция.',
      address: 'Порт Аланьи / Дамлаташ, Аланья, Анталья, Турция'
    },
    transfersPage: {
      badge: 'Официальные VIP Трансферы · Аланья',
      title: 'Индивидуальные VIP трансферы из аэропорта в Аланью',
      subtitle: 'Путешествуйте с комфортом без ожидания групповых автобусов. Индивидуальный Mercedes Vito исключительно для вашей семьи или компании с отслеживанием рейса, встречей с табличкой и фиксированной ценой.',
      aytBadge: 'Аэропорт Анталья (AYT)',
      gzpBadge: 'Аэропорт Газипаша (GZP)',
      aytPriceNote: '/ авто',
      gzpPriceNote: '/ авто',
      fixedRatesBadge: 'Фиксированные тарифы за автомобиль',
      chooseRouteTitle: 'Выберите ваш маршрут трансфера',
      chooseRouteSubtitle: 'Единая фиксированная цена за весь автомобиль (до 8 пассажиров). Без ночных наценок и доплат за багаж.',
      aytCardTitle: 'VIP Трансфер Аэропорт Анталья (AYT)',
      aytCardDuration: 'Около 1ч 45м - 2ч прямой дороги',
      aytCardCapacity: 'До 8 пассажиров',
      aytCardDesc: 'Прямой индивидуальный трансфер на Mercedes Vito между терминалом аэропорта Анталья (AYT) и любыми отелями Аланьи, Махмутлара, Конаклы, Авсаллара и Окурджалара. Встреча с именной табличкой и отслеживание задержек рейса.',
      aytIncluded1: 'Фиксированная цена 80 € за авто (без ночных наценок)',
      aytIncluded2: 'Бесплатное отслеживание задержки рейса и встреча с табличкой',
      aytIncluded3: 'Индивидуальный Mercedes Vito только для вашей компании',
      gzpCardTitle: 'VIP Трансфер Аэропорт Газипаша (GZP)',
      gzpCardDuration: 'Быстрая поездка 35 - 45 минут',
      gzpCardCapacity: 'До 8 пассажиров',
      gzpCardDesc: 'Самый быстрый и комфортный способ добраться из аэропорта Газипаша-Аланья (GZP) до вашего отеля. Без очередей и чужих остановок. Автомобиль с кондиционером ожидает прямо у выхода из терминала.',
      gzpIncluded1: 'Фиксированная цена 45 € за авто (до 8 гостей)',
      gzpIncluded2: 'Быстрая и прямая дорога всего 35-45 минут',
      gzpIncluded3: 'Помощь с багажом и доставка прямо ко входу в отель',
      viewDetails: 'Подробнее',
      bookForPrice: 'Заказать за',
      formBadge: 'Мгновенное бронирование в WhatsApp',
      formTitle: 'Забронировать трансфер из аэропорта',
      formSubtitle: 'Заполните данные рейса и отеля ниже для быстрой отправки заявки в WhatsApp нашему координатору.',
      routeLabel: 'Маршрут трансфера *',
      routeAytToAlanya: 'Аэропорт Анталья (AYT) ➔ Аланья',
      routeAlanyaToAyt: 'Аланья ➔ Аэропорт Анталья (AYT)',
      routeGzpToAlanya: 'Аэропорт Газипаша (GZP) ➔ Аланья',
      routeAlanyaToGzp: 'Аланья ➔ Аэропорт Газипаша (GZP)',
      dateLabel: 'Дата трансфера *',
      flightTimeLabel: 'Время посадки / вылета рейса',
      flightNumLabel: 'Номер рейса (по желанию)',
      flightNumPlaceholder: 'например: TK2410 / PC2032',
      passengersLabel: 'Количество пассажиров (до 8 в VIP Vito)',
      passengersSuffix: 'Пассажиров',
      luggageLabel: 'Количество чемоданов / багажа',
      luggageSuffix: 'Чемоданов',
      nameLabel: 'Имя для таблички встречи *',
      namePlaceholder: 'например: Иван Иванов (будет напечатано на табличке)',
      phoneLabel: 'Контактный номер WhatsApp *',
      hotelLabel: 'Название отеля или адрес в Аланье *',
      hotelPlaceholder: 'например: Kleopatra Atlas Hotel или Mahmutlar Barbaros Cad. 12',
      childSeatLabel: 'Требуется детское кресло / бустер (предоставляется бесплатно)',
      notesLabel: 'Дополнительные пожелания (по желанию)',
      notesPlaceholder: 'например: Негабаритный багаж, коляска или особые указания',
      totalFixedPrice: 'Итоговая фиксированная цена',
      vehicleCapacityNote: 'Индивидуальный Mercedes Vito · До 8 человек',
      bookWhatsappBtn: 'Заказать трансфер в WhatsApp',
      trustDelayTitle: 'Отслеживание рейсов',
      trustDelayDesc: 'Мы отслеживаем статус рейса в реальном времени. При задержке самолета время подачи авто корректируется бесплатно.',
      trustMeetTitle: 'Встреча с табличкой',
      trustMeetDesc: 'Водитель встречает вас на выходе из зоны прилета с табличкой с вашей фамилией.',
      trustPrivateTitle: '100% Индивидуальный автомобиль',
      trustPrivateDesc: 'Без посторонних пассажиров и без заездов в чужие отели. Прямой маршрут до ваших дверей.',
      trustPriceTitle: 'Прозрачная фиксированная цена',
      trustPriceDesc: 'Анталья 80 €, Газипаша 45 €. Никаких доплат за топливо, платные дороги или ночное время.'
    }
  },
  pl: {
    brandName: 'FIX PRICE ALANYA TOURS',
    tagline: 'Przejrzyste stałe ceny · Najlepsze wycieczki w Alanyi',
    nav: {
      home: 'Strona Główna',
      allTours: 'Wszystkie Wycieczki',
      popularTours: 'Popularne Wycieczki',
      boatTrips: 'Rejsy Statkiem',
      adventureTours: 'Przygoda i Safari',
      natureTours: 'Natura i Zwiedzanie',
      familyActivities: 'Dla Rodzin',
      aboutUs: 'O Nas',
      reviews: 'Opinie',
      faq: 'FAQ',
      contact: 'Kontakt',
      privacy: 'Polityka Prywatności',
      terms: 'Regulamin',
      admin: 'Panel Admina',
      transfers: 'Transfery',
      whatsappBooking: 'Rezerwacja WhatsApp'
    },
    hero: {
      badge: 'Alanya, Antalya · Uczciwe Stałe Ceny',
      headline: 'Odkryj Alanyę. Przeżyj więcej. Płać uczciwą cenę.',
      subtitle: 'Najlepsze rejsy, safari w górach Taurus, kaniony i niezapomniane wrażenia w Alanyi — wszystko w jednym miejscu.',
      exploreBtn: 'Zobacz Wycieczki',
      whatsappBtn: 'Rezerwuj na WhatsApp',
      searchTour: 'Wybierz Wycieczkę',
      selectDate: 'Data Wycieczki',
      adults: 'Dorośli (12+)',
      children: 'Dzieci (4-11)',
      searchBtn: 'Szukaj Wycieczek',
      allToursOption: 'Wszystkie 24 wycieczki'
    },
    trust: {
      whatsappBooking: 'Wygodna rezerwacja WhatsApp',
      whatsappBookingSub: 'Brak skomplikowanych formularzy, bezpośredni kontakt',
      localAssistance: 'Lokalna pomoc w Alanyi',
      localAssistanceSub: 'Nasz zespół czuwa na miejscu w Alanyi',
      clearPrices: 'Przejrzyste stałe ceny',
      clearPricesSub: 'Brak targowania się na ulicy, znana cena od początku',
      friendlySupport: 'Przyjazna obsługa',
      friendlySupportSub: 'Szybkie odpowiedzi w Twoim języku'
    },
    filters: {
      all: 'Wszystkie wycieczki',
      boat: 'Rejsy statkiem',
      adventure: 'Przygoda i safari',
      nature: 'Natura i kaniony',
      family: 'Dla rodzin',
      wellness: 'Łaźnia turecka',
      excursions: 'Wycieczki objazdowe',
      transfer: 'Transfery Lotniskowe',
      searchPlaceholder: 'Szukaj wycieczki...',
      sortBy: 'Sortuj według',
      priceLowHigh: 'Cena: rosnąco',
      priceHighLow: 'Cena: malejąco',
      popularFirst: 'Najpopularniejsze',
      toursFound: 'dostępnych wycieczek'
    },
    tourCard: {
      from: 'Od',
      perPerson: 'za osobę',
      perYacht: 'za wynajem jachtu',
      perPackage: 'za pakiet',
      perVehicle: 'za pojazd (VIP Vito)',
      bookWhatsapp: 'Zarezerwuj na WhatsApp',
      viewDetails: 'Szczegóły',
      operatingDays: 'Dni wyjazdów',
      duration: 'Czas trwania'
    },
    tourDetail: {
      overview: 'Opis wycieczki',
      highlights: 'Główne atrakcje',
      itinerary: 'Program wycieczki',
      included: 'Cena zawiera',
      notIncluded: 'Cena nie zawiera',
      whatToBring: 'Co zabrać ze sobą',
      safetyRequirements: 'Wymagania i bezpieczeństwo',
      pickupMeeting: 'Informacje o zbiórce i transferze',
      securityGateNote: 'Prosimy o oczekiwanie na zewnątrz przy bramie ochrony 10 minut przed rozpoczęciem wycieczki.',
      bookingCardTitle: 'Rezerwacja przez WhatsApp',
      selectDate: 'Wybierz datę',
      adultsLabel: 'Dorośli',
      childrenLabel: 'Dzieci (4-11 lat)',
      totalEstimate: 'Szacunkowa kwota',
      bookOnWhatsappBtn: 'Wyślij zapytanie na WhatsApp',
      whatsappDisclaimer: 'Dokładna godzina zbiórki pod Twoim hotelem zostanie potwierdzona na WhatsApp.',
      faqTitle: 'Najczęstsze pytania',
      relatedTours: 'Mogą Cię również zainteresować',
      confirmOnWhatsappNotice: 'Prosimy o potwierdzenie dostępności i szczegółów transferu na WhatsApp.'
    },
    bookingForm: {
      modalTitle: 'Rezerwacja wycieczki przez WhatsApp',
      step1: 'Szczegóły wycieczki',
      step2: 'Dane kontaktowe i hotel',
      customerName: 'Imię i nazwisko',
      customerNamePlaceholder: 'np. Jan Kowalski',
      hotelName: 'Nazwa hotelu',
      hotelNamePlaceholder: 'np. Kleopatra Beach Hotel',
      roomNumber: 'Numer pokoju (opcjonalnie)',
      roomNumberPlaceholder: 'np. 204',
      phone: 'Numer telefonu (WhatsApp)',
      phonePlaceholder: '+48 500 123 456',
      pickupPreference: 'Miejsce odbioru',
      pickupHotel: 'Przy bramie hotelu (w cenie dla większości hoteli)',
      pickupMeetingPoint: 'Zbiórka w porcie / punkcie centralnym',
      notes: 'Uwagi i życzenia',
      notesPlaceholder: 'np. wiek dziecka, wegetariański obiad',
      submitWhatsapp: 'Przejdź do WhatsApp',
      validating: 'Przygotowywanie...',
      errors: {
        pastDate: 'Data wycieczki nie może być w przeszłości.',
        noDate: 'Wybierz datę wycieczki.',
        noName: 'Wpisz imię i nazwisko.',
        noHotel: 'Wpisz nazwę hotelu w Alanyi.',
        noPhone: 'Wpisz poprawny numer telefonu z numerem kierunkowym.',
        noAdults: 'Wymagany jest przynajmniej 1 dorosły.'
      },
      whatsappHonestNoticeTitle: 'Otwieranie WhatsApp',
      whatsappHonestNoticeDesc: 'Aplikacja WhatsApp otwiera się z wypełnioną wiadomością. Kliknij „Wyślij”, aby przekazać zapytanie rezerwacyjne naszemu konsultantowi.',
      whatsappHonestNoticeClose: 'Rozumiem'
    },
    aiAssistant: {
      buttonTooltip: 'Asystent Podróży AI',
      title: 'Fix Price AI Travel Assistant',
      subtitle: 'Rekomendacje wycieczek i aktualne ceny w Alanyi',
      welcomeMsg: 'Dzień dobry! Witamy w Fix Price Alanya Tours. Jestem Twoim wirtualnym asystentem podróży. Chętnie pomogę wybrać najlepszą wycieczkę, sprawdzić ceny i przygotować rezerwację.',
      inputPlaceholder: 'Zapytaj o wycieczki, ceny, terminy...',
      send: 'Wyślij',
      thinking: 'Sprawdzam bazę wycieczek...',
      quickActions: {
        findTour: 'Szukaj wycieczki',
        bestTours: 'Najlepsze w Alanyi',
        adventureTours: 'Przygoda i Safari',
        boatTrips: 'Rejsy statkiem',
        familyActivities: 'Dla rodzin',
        helpChoose: 'Pomóż wybrać',
        bookWhatsapp: 'Rezerwuj na WhatsApp',
        changeLanguage: 'Zmień język'
      },
      offlineNotice: 'Asystent AI działa w trybie offline. Skontaktuj się bezpośrednio przez WhatsApp!'
    },
    reviews: {
      title: 'Opinie Gości',
      subtitle: 'Autentyczne wrażenia z wycieczek po Alanyi',
      note: 'Publikujemy wyłącznie zweryfikowane opinie uczestników.',
      leaveReview: 'Dodaj opinię',
      rating: 'Ocena',
      yourName: 'Twoje imię',
      selectTour: 'W jakiej wycieczce brałeś udział?',
      yourReview: 'Treść opinii',
      submit: 'Wyślij opinię',
      thankYou: 'Dziękujemy! Twoja opinia została przesłana do moderacji.'
    },
    footer: {
      aboutText: 'FIX PRICE ALANYA TOURS to biuro wycieczek w Alanyi stawiające na uczciwe, przejrzyste ceny bez naciągania turystów oraz niezawodną organizację.',
      quickLinks: 'Nawigacja',
      popularCategories: 'Kategorie',
      contactInfo: 'Kontakt',
      securityReminder: 'Zasada transferu: Prosimy o oczekiwanie na zewnątrz przy bramie ochrony 10 minut przed rozpoczęciem wycieczki.',
      copyright: '© 2026 FIX PRICE ALANYA TOURS. Wszelkie prawa zastrzeżone. Alanya, Antalya, Turcja.',
      address: 'Port Alanya / Damlataş, Alanya, Antalya, Turcja'
    },
    transfersPage: {
      badge: 'Oficjalne Transfery VIP z Lotniska · Alanya',
      title: 'Prywatne Transfery VIP z Lotniska do Alanyi',
      subtitle: 'Podróżuj bez stresu i bez czekania na zbiorcze autokary. Prywatny Mercedes Vito wyłącznie dla Twojej rodziny ze śledzeniem opóźnień lotów, powitaniem z tabliczką i stałą, przejrzystą ceną.',
      aytBadge: 'Lotnisko Antalya (AYT)',
      gzpBadge: 'Lotnisko Gazipaşa (GZP)',
      aytPriceNote: '/ pojazd',
      gzpPriceNote: '/ pojazd',
      fixedRatesBadge: 'Stała stawka za cały samochód',
      chooseRouteTitle: 'Wybierz trasę transferu',
      chooseRouteSubtitle: 'Jedna stała cena za cały pojazd (do 8 osób). Bez ukrytych dopłat nocnych i opłat za bagaż.',
      aytCardTitle: 'Transfer VIP Lotnisko Antalya (AYT)',
      aytCardDuration: 'Ok. 1h 45m - 2h bezpośredniej jazdy',
      aytCardCapacity: 'Do 8 pasażerów',
      aytCardDesc: 'Bezpośredni prywatny transfer Mercedesem Vito między lotniskiem w Antalyi (AYT) a wszystkimi hotelami w Alanyi, Mahmutlarze, Konakli, Avsallar i Okurcalar. Zawiera powitanie z tabliczką imienną i monitorowanie lotu.',
      aytIncluded1: 'Stała cena 80 € za auto (bez dopłat nocnych)',
      aytIncluded2: 'Darmowe śledzenie opóźnień i powitanie w terminalu',
      aytIncluded3: 'Prywatny Mercedes Vito wyłącznie dla Waszej grupy',
      gzpCardTitle: 'Transfer VIP Lotnisko Gazipaşa (GZP)',
      gzpCardDuration: 'Szybka trasa 35 - 45 minut',
      gzpCardCapacity: 'Do 8 pasażerów',
      gzpCardDesc: 'Najszybszy i najwygodniejszy sposób dotarcia z lotniska Gazipaşa-Alanya (GZP) prosto do Twojego hotelu. Omiń kolejki i zbiorcze busy. Klimatyzowany Mercedes Vito czeka przy wyjściu z lotniska.',
      gzpIncluded1: 'Stała cena 45 € za auto (do 8 gości)',
      gzpIncluded2: 'Ekspresowy przejazd w 35-45 minut',
      gzpIncluded3: 'Pomoc z bagażami i dojazd pod same drzwi hotelu',
      viewDetails: 'Szczegóły',
      bookForPrice: 'Zarezerwuj za',
      formBadge: 'Bezpośrednia rezerwacja WhatsApp',
      formTitle: 'Zarezerwuj transfer lotniskowy',
      formSubtitle: 'Podaj dane lotu i adres hotelu, aby wygenerować zweryfikowane zgłoszenie rezerwacji na WhatsApp.',
      routeLabel: 'Trasa transferu *',
      routeAytToAlanya: 'Lotnisko Antalya (AYT) ➔ Alanya',
      routeAlanyaToAyt: 'Alanya ➔ Lotnisko Antalya (AYT)',
      routeGzpToAlanya: 'Lotnisko Gazipaşa (GZP) ➔ Alanya',
      routeAlanyaToGzp: 'Alanya ➔ Lotnisko Gazipaşa (GZP)',
      dateLabel: 'Data transferu *',
      flightTimeLabel: 'Godzina lądowania / wylotu',
      flightNumLabel: 'Numer lotu (opcjonalnie)',
      flightNumPlaceholder: 'np. TK2410 / PC2032',
      passengersLabel: 'Liczba pasażerów (maks. 8 w VIP Vito)',
      passengersSuffix: 'Pasażerów',
      luggageLabel: 'Liczba walizek',
      luggageSuffix: 'Walizek',
      nameLabel: 'Imię i nazwisko na tabliczkę *',
      namePlaceholder: 'np. Jan Kowalski (będzie na tabliczce powitalnej)',
      phoneLabel: 'Numer telefonu WhatsApp *',
      hotelLabel: 'Nazwa hotelu lub dokładny adres w Alanyi *',
      hotelPlaceholder: 'np. Kleopatra Atlas Hotel lub Mahmutlar Barbaros Cad. 12',
      childSeatLabel: 'Fotelik dla dziecka / podstawka (bezpłatnie)',
      notesLabel: 'Dodatkowe życzenia (opcjonalnie)',
      notesPlaceholder: 'np. Duży bagaż, wózek dziecięcy lub uwagi',
      totalFixedPrice: 'Łączna stała cena',
      vehicleCapacityNote: 'Prywatny Mercedes Vito · Do 8 pasażerów',
      bookWhatsappBtn: 'Zarezerwuj transfer na WhatsApp',
      trustDelayTitle: 'Śledzenie opóźnień lotów',
      trustDelayDesc: 'Monitorujemy Twój lot w czasie rzeczywistym. W przypadku opóźnienia kierowca czeka bez dodatkowych opłat.',
      trustMeetTitle: 'Powitanie z tabliczką',
      trustMeetDesc: 'Prywatny kierowca czeka przy wyjściu z terminala z tabliczką z Twoim nazwiskiem.',
      trustPrivateTitle: '100% Prywatny Mercedes Vito',
      trustPrivateDesc: 'Żadnych obcych pasażerów ani postojów w innych hotelach. Bezpośrednia podróż do celu.',
      trustPriceTitle: 'Przejrzysta stała cena',
      trustPriceDesc: 'Antalya 80 €, Gazipaşa 45 €. Brak dopłat za paliwo, autostrady czy godziny nocne.'
    }
  },
  cs: {
    brandName: 'FIX PRICE ALANYA TOURS',
    tagline: 'Pevné férové ceny · Nejlepší výlety v Alanyi',
    nav: {
      home: 'Domů',
      allTours: 'Všechny Výlety',
      popularTours: 'Oblíbené Výlety',
      boatTrips: 'Plavby Lodí',
      adventureTours: 'Dobrodružství & Safari',
      natureTours: 'Příroda & Památky',
      familyActivities: 'Pro Rodiny',
      aboutUs: 'O Nás',
      reviews: 'Recenze',
      faq: 'Časté Dotazy',
      contact: 'Kontakt',
      privacy: 'Zásady Soukromí',
      terms: 'Podmínky',
      admin: 'Správa',
      transfers: 'Transfery',
      whatsappBooking: 'Rezervace WhatsApp'
    },
    hero: {
      badge: 'Alanya, Antalya · Férové Pevné Ceny',
      headline: 'Objevte Alanyi. Zažijte více. Plaťte férovou cenu.',
      subtitle: 'Nejlepší plavby lodí, horská safari, kaňony a nezapomenutelné zážitky v Alanyi na jednom místě.',
      exploreBtn: 'Prohlédnout Výlety',
      whatsappBtn: 'Rezervovat na WhatsApp',
      searchTour: 'Vyberte výlet',
      selectDate: 'Vyberte datum',
      adults: 'Dospělí (12+)',
      children: 'Děti (4-11)',
      searchBtn: 'Hledat Výlety',
      allToursOption: 'Všech 24 výletů'
    },
    trust: {
      whatsappBooking: 'Snadná rezervace přes WhatsApp',
      whatsappBookingSub: 'Rychlá komunikace bez zdlouhavých formulářů',
      localAssistance: 'Podpora přímo v Alanyi',
      localAssistanceSub: 'Jsme na místě a připraveni vám pomoci',
      clearPrices: 'Pevné jasné ceny',
      clearPricesSub: 'Žádné pouliční smlouvání a skryté příplatky',
      friendlySupport: 'Ochotná podpora',
      friendlySupportSub: 'Rychlé odpovědi před výletem i během něj'
    },
    filters: {
      all: 'Všechny výlety',
      boat: 'Plavby lodí',
      adventure: 'Dobrodružství a safari',
      nature: 'Příroda a kaňony',
      family: 'Pro rodiny',
      wellness: 'Turecké lázně',
      excursions: 'Poznávací výlety',
      transfer: 'Letištní transfery',
      searchPlaceholder: 'Hledat výlet...',
      sortBy: 'Řadit podle',
      priceLowHigh: 'Cena: od nejnižší',
      priceHighLow: 'Cena: od nejvyšší',
      popularFirst: 'Nejpopulárnější',
      toursFound: 'výletů k dispozici'
    },
    tourCard: {
      from: 'Od',
      perPerson: 'za osobu',
      perYacht: 'za pronájem jachty',
      perPackage: 'za balíček',
      perVehicle: 'za vozidlo (VIP Vito)',
      bookWhatsapp: 'Rezervovat na WhatsApp',
      viewDetails: 'Detail výletu',
      operatingDays: 'Provozní dny',
      duration: 'Délka výletu'
    },
    tourDetail: {
      overview: 'Přehled výletu',
      highlights: 'Hlavní body',
      itinerary: 'Harmonogram',
      included: 'Co je v ceně',
      notIncluded: 'Co není v ceně',
      whatToBring: 'Co si vzít s sebou',
      safetyRequirements: 'Bezpečnostní informace',
      pickupMeeting: 'Vyzvednutí a instrukce',
      securityGateNote: 'Prosím, vyčkejte venku u bezpečnostní brány 10 minut před časem výletu.',
      bookingCardTitle: 'Rezervace přes WhatsApp',
      selectDate: 'Vyberte datum',
      adultsLabel: 'Dospělí',
      childrenLabel: 'Děti (4-11 let)',
      totalEstimate: 'Odhadovaná cena',
      bookOnWhatsappBtn: 'Odeslat rezervaci na WhatsApp',
      whatsappDisclaimer: 'Přesný čas vyzvednutí u hotelu a volná místa budou potvrzeny v chatu WhatsApp.',
      faqTitle: 'Často kladené dotazy',
      relatedTours: 'Doporučené výlety',
      confirmOnWhatsappNotice: 'Prosím potvrďte dostupnost a čas vyzvednutí na WhatsApp.'
    },
    bookingForm: {
      modalTitle: 'Poptávka výletu přes WhatsApp',
      step1: 'Výběr výletu a termínu',
      step2: 'Údaje o hostech a hotelu',
      customerName: 'Jméno a příjmení',
      customerNamePlaceholder: 'např. Jan Novák',
      hotelName: 'Název hotelu',
      hotelNamePlaceholder: 'např. Kleopatra Beach Hotel',
      roomNumber: 'Číslo pokoje (volitelné)',
      roomNumberPlaceholder: 'např. 102',
      phone: 'WhatsApp telefon',
      phonePlaceholder: '+420 777 123 456',
      pickupPreference: 'Místo vyzvednutí',
      pickupHotel: 'U brány hotelu (v ceně pro většinu hotelů)',
      pickupMeetingPoint: 'Sraz v přístavu / centru',
      notes: 'Poznámka / Zvláštní přání',
      notesPlaceholder: 'Věk dětí, dieta, jiné požadavky',
      submitWhatsapp: 'Přejít do WhatsApp',
      validating: 'Příprava zprávy...',
      errors: {
        pastDate: 'Datum výletu nemůže být v minulosti.',
        noDate: 'Vyberte prosím datum výletu.',
        noName: 'Zadejte prosím své jméno.',
        noHotel: 'Zadejte název hotelu v Alanyi.',
        noPhone: 'Zadejte telefonní číslo s předvolbou.',
        noAdults: 'Je vyžadován alespoň 1 dospělý.'
      },
      whatsappHonestNoticeTitle: 'Otevírání aplikace WhatsApp',
      whatsappHonestNoticeDesc: 'Aplikace WhatsApp se otevírá s předvyplněnými údaji. Pro dokončení poptávky prosím zprávu odešlete.',
      whatsappHonestNoticeClose: 'Rozumím'
    },
    aiAssistant: {
      buttonTooltip: 'AI Cestovní Asistent',
      title: 'Fix Price AI Travel Assistant',
      subtitle: 'Doporučení výletů a aktuální ceny v Alanyi',
      welcomeMsg: 'Dobrý den! Vítejte u Fix Price Alanya Tours. Jsem váš virtuální cestovní rádce. Rád vám pomohu vybrat výlet, porovnat ceny a připravit rezervaci.',
      inputPlaceholder: 'Zeptejte se na výlety, ceny, vyzvednutí...',
      send: 'Odeslat',
      thinking: 'Vyhledávám v nabídce...',
      quickActions: {
        findTour: 'Najít výlet',
        bestTours: 'To nejlepší v Alanyi',
        adventureTours: 'Safari & Adrenalin',
        boatTrips: 'Plavby lodí',
        familyActivities: 'Pro rodiny',
        helpChoose: 'Pomoc s výběrem',
        bookWhatsapp: 'Rezervace na WhatsApp',
        changeLanguage: 'Změnit jazyk'
      },
      offlineNotice: 'AI asistent je dočasně offline. Neváhejte nás kontaktovat přímo na WhatsApp!'
    },
    reviews: {
      title: 'Zkušenosti klientů',
      subtitle: 'Reálné ohlasy návštěvníků na naše výlety',
      note: 'Zveřejňujeme pouze skutečné recenze našich zákazníků.',
      leaveReview: 'Napsat recenzi',
      rating: 'Hodnocení',
      yourName: 'Vaše jméno',
      selectTour: 'Který výlet jste absolvovali?',
      yourReview: 'Text recenze',
      submit: 'Odeslat recenzi',
      thankYou: 'Děkujeme za recenzi!'
    },
    footer: {
      aboutText: 'FIX PRICE ALANYA TOURS nabízí kvalitní výlety v Alanyi za férové a pevné ceny bez skrytých poplatků a pouličního smlouvání.',
      quickLinks: 'Odkazy',
      popularCategories: 'Kategorie',
      contactInfo: 'Kontakt',
      securityReminder: 'Pravidlo vyzvednutí: Prosím, vyčkejte venku u bezpečnostní brány 10 minut před časem výletu.',
      copyright: '© 2026 FIX PRICE ALANYA TOURS. Všechna práva vyhrazena. Alanya, Antalya, Turecko.',
      address: 'Přístav Alanya / Damlataş, Alanya, Turecko'
    },
    transfersPage: {
      badge: 'Oficiální VIP transfery z letiště · Alanya',
      title: 'Soukromé VIP letištní transfery do Alanye',
      subtitle: 'Cestujte bez čekání na hromadné autobusy cestovních kanceláří. Privátní Mercedes Vito výhradně pro vás a vaši rodinu se sledováním letu, uvítáním s cedulkou a pevnou cenou.',
      aytBadge: 'Letiště Antalya (AYT)',
      gzpBadge: 'Letiště Gazipaşa (GZP)',
      aytPriceNote: '/ auto',
      gzpPriceNote: '/ auto',
      fixedRatesBadge: 'Pevná cena za celé vozidlo',
      chooseRouteTitle: 'Zvolte trasu transferu',
      chooseRouteSubtitle: 'Jedna pevná cena za celé auto (až 8 osob). Žádné skryté noční příplatky ani poplatky za zavazadla.',
      aytCardTitle: 'VIP Transfer Letiště Antalya (AYT)',
      aytCardDuration: 'Cca 1h 45m - 2h přímá jízda',
      aytCardCapacity: 'Až 8 cestujících',
      aytCardDesc: 'Přímý privátní transfer vozem Mercedes Vito mezi letištěm Antalya (AYT) a hotely v Alanyi, Mahmutlaru, Konakli, Avsallaru a Okurcalaru. Včetně uvítání s cedulkou se jménem a sledování příletu.',
      aytIncluded1: 'Pevná cena 80 € za auto (žádné noční příplatky)',
      aytIncluded2: 'Zdarma sledování zpoždění letu a uvítání s cedulkou',
      aytIncluded3: 'Privátní Mercedes Vito výhradně pro vaši skupinu',
      gzpCardTitle: 'VIP Transfer Letiště Gazipaşa (GZP)',
      gzpCardDuration: 'Rychlá jízda 35 - 45 minut',
      gzpCardCapacity: 'Až 8 cestujících',
      gzpCardDesc: 'Nejrychlejší a nejpohodlnější způsob cesty z letiště Gazipaşa (GZP) přímo do vašeho hotelu. Žádné fronty a cizí zastávky. Klimatizovaný Mercedes Vito čeká přímo u východu.',
      gzpIncluded1: 'Pevná cena 45 € za auto (až 8 osob)',
      gzpIncluded2: 'Blesková jízda za pouhých 35-45 minut',
      gzpIncluded3: 'Pomoc se zavazadly a dovoz až ke vchodu hotelu',
      viewDetails: 'Podrobnosti',
      bookForPrice: 'Objednat za',
      formBadge: 'Přímá rezervace na WhatsApp',
      formTitle: 'Objednat letištní transfer',
      formSubtitle: 'Vyplňte údaje o letu a hotelu pro odeslání ověřeného požadavku na WhatsApp našemu dispečerovi.',
      routeLabel: 'Trasa transferu *',
      routeAytToAlanya: 'Letiště Antalya (AYT) ➔ Alanya',
      routeAlanyaToAyt: 'Alanya ➔ Letiště Antalya (AYT)',
      routeGzpToAlanya: 'Letiště Gazipaşa (GZP) ➔ Alanya',
      routeAlanyaToGzp: 'Alanya ➔ Letiště Gazipaşa (GZP)',
      dateLabel: 'Datum transferu *',
      flightTimeLabel: 'Čas příletu / odletu',
      flightNumLabel: 'Číslo letu (volitelné)',
      flightNumPlaceholder: 'např. TK2410 / PC2032',
      passengersLabel: 'Počet cestujících (max. 8 v VIP Vito)',
      passengersSuffix: 'Osob',
      luggageLabel: 'Počet kufrů',
      luggageSuffix: 'Kufrů',
      nameLabel: 'Jméno na cedulku *',
      namePlaceholder: 'např. Jan Novák (bude vytištěno na cedulce)',
      phoneLabel: 'Kontaktní telefon WhatsApp *',
      hotelLabel: 'Název hotelu nebo adresa v Alanyi *',
      hotelPlaceholder: 'např. Kleopatra Atlas Hotel nebo Mahmutlar Barbaros Cad. 12',
      childSeatLabel: 'Požadována dětská autosedačka / podsedák (zdarma)',
      notesLabel: 'Dodatečné požadavky (volitelné)',
      notesPlaceholder: 'např. Velká zavazadla, kočárek nebo zvláštní přání',
      totalFixedPrice: 'Celková pevná cena',
      vehicleCapacityNote: 'Privátní Mercedes Vito · Až 8 osob',
      bookWhatsappBtn: 'Objednat transfer přes WhatsApp',
      trustDelayTitle: 'Sledování zpoždění letů',
      trustDelayDesc: 'Sledujeme váš let online. Při zpoždění letadla řidič čeká bez jakéhokoliv poplatku.',
      trustMeetTitle: 'Uvítání s cedulkou',
      trustMeetDesc: 'Váš soukromý řidič vás očekává u východu z terminálu s cedulkou s vaším jménem.',
      trustPrivateTitle: '100% Soukromý Mercedes Vito',
      trustPrivateDesc: 'Žádní cizí cestující ani zastávky u jiných hotelů. Přímá trasa až do cíle.',
      trustPriceTitle: 'Jasná pevná cena',
      trustPriceDesc: 'Antalya 80 €, Gazipaşa 45 €. Žádné příplatky za palivo, mýtné ani noční hodiny.'
    }
  },
  de: {
    brandName: 'FIX PRICE ALANYA TOURS',
    tagline: 'Faire Festpreise · Beste Ausflüge in Alanya',
    nav: {
      home: 'Startseite',
      allTours: 'Alle Touren',
      popularTours: 'Beliebte Touren',
      boatTrips: 'Bootstouren',
      adventureTours: 'Abenteuer & Safari',
      natureTours: 'Natur & Kultur',
      familyActivities: 'Familienausflüge',
      aboutUs: 'Über Uns',
      reviews: 'Bewertungen',
      faq: 'Häufige Fragen',
      contact: 'Kontakt',
      privacy: 'Datenschutz',
      terms: 'AGB',
      admin: 'Admin',
      transfers: 'Transfers',
      whatsappBooking: 'WhatsApp Buchung'
    },
    hero: {
      badge: 'Alanya, Antalya · Faire Festpreise',
      headline: 'Entdecken Sie Alanya. Mehr erleben. Faire Preise zahlen.',
      subtitle: 'Entdecken Sie die schönsten Bootsausflüge, Safari-Abenteuer, Schluchten und unvergessliche Erlebnisse in Alanya an einem Ort.',
      exploreBtn: 'Touren ansehen',
      whatsappBtn: 'Per WhatsApp anfragen',
      searchTour: 'Tour auswählen',
      selectDate: 'Wunschdatum',
      adults: 'Erwachsene (12+)',
      children: 'Kinder (4-11)',
      searchBtn: 'Touren suchen',
      allToursOption: 'Alle 24 Touren'
    },
    trust: {
      whatsappBooking: 'Einfache WhatsApp Buchung',
      whatsappBookingSub: 'Direkte Anfrage ohne komplizierte Online-Formulare',
      localAssistance: 'Vor-Ort Betreuung in Alanya',
      localAssistanceSub: 'Unser Team ist direkt vor Ort in Alanya für Sie da',
      clearPrices: 'Transparente Festpreise',
      clearPricesSub: 'Kein Straßenfeilschen, ehrliche und feste Konditionen',
      friendlySupport: 'Freundlicher Kundenservice',
      friendlySupportSub: 'Schnelle Antworten in Ihrer Sprache vor & während der Tour'
    },
    filters: {
      all: 'Alle Touren',
      boat: 'Bootsausflüge',
      adventure: 'Abenteuer & Safari',
      nature: 'Natur & Schluchten',
      family: 'Familienfreundlich',
      wellness: 'Hamam & Wellness',
      excursions: 'Kultur & Geschichte',
      transfer: 'Flughafentransfers',
      searchPlaceholder: 'Tour suchen...',
      sortBy: 'Sortieren nach',
      priceLowHigh: 'Preis: aufsteigend',
      priceHighLow: 'Preis: absteigend',
      popularFirst: 'Beliebteste zuerst',
      toursFound: 'Touren verfügbar'
    },
    tourCard: {
      from: 'Ab',
      perPerson: 'pro Person',
      perYacht: 'pro Yachtcharter',
      perPackage: 'pro Paket',
      perVehicle: 'pro Fahrzeug (VIP Vito)',
      bookWhatsapp: 'Per WhatsApp buchen',
      viewDetails: 'Details ansehen',
      operatingDays: 'Durchführung',
      duration: 'Dauer'
    },
    tourDetail: {
      overview: 'Tourübersicht',
      highlights: 'Höhepunkte',
      itinerary: 'Ablauf',
      included: 'Inklusive',
      notIncluded: 'Nicht inklusive',
      whatToBring: 'Bitte mitbringen',
      safetyRequirements: 'Hinweise & Sicherheit',
      pickupMeeting: 'Abholung und Treffpunkt',
      securityGateNote: 'Bitte warten Sie 10 Minuten vor Tourbeginn draußen am Sicherheitstor.',
      bookingCardTitle: 'Unverbindlich per WhatsApp reservieren',
      selectDate: 'Wunschdatum wählen',
      adultsLabel: 'Erwachsene',
      childrenLabel: 'Kinder (4-11 Jahre)',
      totalEstimate: 'Geschätzter Gesamtpreis',
      bookOnWhatsappBtn: 'Buchungsanfrage auf WhatsApp senden',
      whatsappDisclaimer: 'Die genaue Abholzeit und Verfügbarkeit werden direkt im WhatsApp-Chat bestätigt.',
      faqTitle: 'Häufig gestellte Fragen',
      relatedTours: 'Das könnte Ihnen auch gefallen',
      confirmOnWhatsappNotice: 'Bitte bestätigen Sie Verfügbarkeit und Abholzeiten per WhatsApp.'
    },
    bookingForm: {
      modalTitle: 'WhatsApp Reservierungsanfrage',
      step1: 'Tour und Datum',
      step2: 'Gäste- und Hotelangaben',
      customerName: 'Vollständiger Name',
      customerNamePlaceholder: 'z.B. Max Mustermann',
      hotelName: 'Hotelname in Alanya',
      hotelNamePlaceholder: 'z.B. Kleopatra Beach Hotel',
      roomNumber: 'Zimmernummer (optional)',
      roomNumberPlaceholder: 'z.B. 302',
      phone: 'WhatsApp Telefonnummer',
      phonePlaceholder: '+49 170 1234567',
      pickupPreference: 'Abholpräferenz',
      pickupHotel: 'Am Hotelsicherheitstor (für die meisten Hotels inklusive)',
      pickupMeetingPoint: 'Treffpunkt im Hafen / Zentrum',
      notes: 'Besondere Wünsche / Anmerkungen',
      notesPlaceholder: 'z.B. Alter der Kinder, Ernährungswünsche',
      submitWhatsapp: 'Weiter zu WhatsApp',
      validating: 'Vorbereitung...',
      errors: {
        pastDate: 'Das Tourdatum darf nicht in der Vergangenheit liegen.',
        noDate: 'Bitte wählen Sie ein Datum aus.',
        noName: 'Bitte geben Sie Ihren Namen ein.',
        noHotel: 'Bitte geben Sie den Namen Ihres Hotels an.',
        noPhone: 'Bitte geben Sie eine gültige Telefonnummer mit Ländervorwahl an.',
        noAdults: 'Mindestens 1 Erwachsener erforderlich.'
      },
      whatsappHonestNoticeTitle: 'WhatsApp wird geöffnet',
      whatsappHonestNoticeDesc: 'WhatsApp öffnet sich mit Ihrer vorgefertigten Reservierungsanfrage. Bitte senden Sie die Nachricht ab, um Ihre Anfrage abzuschließen.',
      whatsappHonestNoticeClose: 'Verstanden'
    },
    aiAssistant: {
      buttonTooltip: 'AI Reiseassistent',
      title: 'Fix Price AI Travel Assistant',
      subtitle: 'Ausflugsempfehlungen & Live-Preise für Alanya',
      welcomeMsg: 'Hallo! Willkommen bei Fix Price Alanya Tours. Ich bin Ihr KI-Reiseassistent. Ich helfe Ihnen, die besten Touren zu finden, Preise zu vergleichen und Ihre Buchung vorzubereiten.',
      inputPlaceholder: 'Fragen Sie nach Touren, Preisen, Abholung...',
      send: 'Senden',
      thinking: 'Durchsuche Touren-Datenbank...',
      quickActions: {
        findTour: 'Tour suchen',
        bestTours: 'Beste Touren in Alanya',
        adventureTours: 'Abenteuer & Safari',
        boatTrips: 'Bootstouren',
        familyActivities: 'Familienaktivitäten',
        helpChoose: 'Hilf mir auswählen',
        bookWhatsapp: 'WhatsApp Buchung',
        changeLanguage: 'Sprache wechseln'
      },
      offlineNotice: 'Der KI-Assistent befindet sich im Offline-Modus. Bitte schreiben Sie uns direkt per WhatsApp!'
    },
    reviews: {
      title: 'Gästebewertungen',
      subtitle: 'Echte Eindrücke von Urlaubern in Alanya',
      note: 'Wir veröffentlichen ausschließlich geprüfte Kundenbewertungen.',
      leaveReview: 'Bewertung schreiben',
      rating: 'Bewertung',
      yourName: 'Ihr Name',
      selectTour: 'Welche Tour haben Sie besucht?',
      yourReview: 'Ihre Bewertung',
      submit: 'Bewertung absenden',
      thankYou: 'Vielen Dank! Ihre Bewertung wurde zur Überprüfung eingereicht.'
    },
    footer: {
      aboutText: 'FIX PRICE ALANYA TOURS steht für faire und transparente Festpreise an der Türkischen Riviera ohne versteckte Kosten und ohne Straßenfeilschen.',
      quickLinks: 'Navigation',
      popularCategories: 'Kategorien',
      contactInfo: 'Kontakt & Büro',
      securityReminder: 'Abholhinweis: Bitte warten Sie 10 Minuten vor Tourbeginn draußen am Sicherheitstor.',
      copyright: '© 2026 FIX PRICE ALANYA TOURS. Alle Rechte vorbehalten. Alanya, Antalya, Türkei.',
      address: 'Hafen Alanya / Damlatas, Alanya, Antalya, Türkei'
    },
    transfersPage: {
      badge: 'Offizielle VIP Flughafentransfers · Alanya',
      title: 'Direkte VIP Flughafentransfers nach Alanya',
      subtitle: 'Entspannt ankommen ohne langes Warten auf Sammelbusse. Privater Mercedes Vito exklusiv für Ihre Familie mit Live-Flugverfolgung, Namensschild-Abholung und transparentem Festpreis.',
      aytBadge: 'Flughafen Antalya (AYT)',
      gzpBadge: 'Flughafen Gazipasa (GZP)',
      aytPriceNote: '/ Fahrzeug',
      gzpPriceNote: '/ Fahrzeug',
      fixedRatesBadge: 'Feste Tarife pro Fahrzeug',
      chooseRouteTitle: 'Wählen Sie Ihre Flughafentransfer-Strecke',
      chooseRouteSubtitle: 'Ein Festpreis für Ihre gesamte Gruppe (bis zu 8 Personen). Keine Nachtzuschläge oder Gepäckgebühren.',
      aytCardTitle: 'VIP Transfer Flughafen Antalya (AYT)',
      aytCardDuration: 'Ca. 1 Std. 45 Min. - 2 Std. direkte Fahrt',
      aytCardCapacity: 'Bis zu 8 Passagiere',
      aytCardDesc: 'Direkter VIP-Transfer im Mercedes Vito zwischen dem Flughafen Antalya (AYT) und allen Hotels in Alanya, Mahmutlar, Konakli, Avsallar und Okurcalar. Inklusive Namensschild-Begrüßung und Flugüberwachung.',
      aytIncluded1: 'Festpreis 80 € pro Fahrzeug (keine Nachtzuschläge)',
      aytIncluded2: 'Kostenlose Flugüberwachung & Terminal-Abholung mit Namensschild',
      aytIncluded3: 'Privater Mercedes Vito exklusiv für Ihre Familie',
      gzpCardTitle: 'VIP Transfer Flughafen Gazipasa (GZP)',
      gzpCardDuration: 'Schnelle 35 - 45 Min. Küstenfahrt',
      gzpCardCapacity: 'Bis zu 8 Passagiere',
      gzpCardDesc: 'Der schnellste und bequemste Weg zwischen dem Flughafen Gazipasa (GZP) und Ihrem Hotel. Keine Warteschlangen und keine fremden Zwischenstopps. Klimatisierter Mercedes Vito direkt am Ausgang.',
      gzpIncluded1: 'Festpreis 45 € pro Fahrzeug (bis zu 8 Gäste)',
      gzpIncluded2: 'Schnelle Direktfahrt in nur 35-45 Minuten',
      gzpIncluded3: 'Gepäckhilfe und direkte Ankunft vor dem Hotel',
      viewDetails: 'Details ansehen',
      bookForPrice: 'Buchen für',
      formBadge: 'Direkte WhatsApp-Übermittlung',
      formTitle: 'Flughafentransfer reservieren',
      formSubtitle: 'Tragen Sie Ihre Flug- und Hoteldaten ein, um eine Buchungsanfrage per WhatsApp zu erstellen.',
      routeLabel: 'Transferstrecke *',
      routeAytToAlanya: 'Flughafen Antalya (AYT) ➔ Alanya',
      routeAlanyaToAyt: 'Alanya ➔ Flughafen Antalya (AYT)',
      routeGzpToAlanya: 'Flughafen Gazipasa (GZP) ➔ Alanya',
      routeAlanyaToGzp: 'Alanya ➔ Flughafen Gazipasa (GZP)',
      dateLabel: 'Transferdatum *',
      flightTimeLabel: 'Lande- / Abflugzeit',
      flightNumLabel: 'Flugnummer (optional)',
      flightNumPlaceholder: 'z.B. TK2410 / PC2032',
      passengersLabel: 'Passagieranzahl (max. 8 im VIP Vito)',
      passengersSuffix: 'Passagiere',
      luggageLabel: 'Koffer / Großgepäck',
      luggageSuffix: 'Koffer',
      nameLabel: 'Name für Namensschild *',
      namePlaceholder: 'z.B. Max Mustermann (auf dem Abhol-Schild)',
      phoneLabel: 'WhatsApp-Kontaktnummer *',
      hotelLabel: 'Hotelname oder Adresse in Alanya *',
      hotelPlaceholder: 'z.B. Kleopatra Atlas Hotel oder Mahmutlar Barbaros Cad. 12',
      childSeatLabel: 'Kindersitz / Babyschale gewünscht (kostenfrei zur Verfügung gestellt)',
      notesLabel: 'Zusätzliche Wünsche (optional)',
      notesPlaceholder: 'z.B. Sperrgepäck, Kinderwagen oder besondere Hinweise',
      totalFixedPrice: 'Gesamter Festpreis',
      vehicleCapacityNote: 'Privater VIP Mercedes Vito · Bis zu 8 Personen',
      bookWhatsappBtn: 'Transfer per WhatsApp buchen',
      trustDelayTitle: 'Flugverspätungs-Monitoring',
      trustDelayDesc: 'Wir überwachen Ihren Flug live. Bei Verspätungen passt sich Ihr Fahrer ohne Aufpreis an.',
      trustMeetTitle: 'Meet & Greet Service',
      trustMeetDesc: 'Ihr Chauffeur erwartet Sie direkt am Ausgang des Terminals mit Ihrem Namensschild.',
      trustPrivateTitle: '100% Privater Mercedes Vito',
      trustPrivateDesc: 'Keine fremden Gäste, keine Umwege. Direkt zu Ihrer Hotelrezeption oder Schranke.',
      trustPriceTitle: 'Transparenter Festpreis',
      trustPriceDesc: 'Antalya 80 €, Gazipasa 45 €. Keine Treibstoff-, Maut- oder Nachtzuschläge.'
    }
  },
  tr: TURKISH_UI_TRANSLATIONS
};

export function generateWhatsAppMessage(params: {
  tourName: string;
  date: string;
  adults: number;
  children: number;
  totalPrice: number;
  currencySymbol: string;
  customerName: string;
  hotelName: string;
  pickupPreference: string;
  phone: string;
  notes?: string;
  language: Language;
}): string {
  const {
    tourName,
    date,
    adults,
    children,
    totalPrice,
    currencySymbol,
    customerName,
    hotelName,
    pickupPreference,
    phone,
    notes,
    language
  } = params;

  switch (language) {
    case 'ru':
      return `Здравствуйте, FIX PRICE ALANYA TOURS! Я хочу забронировать экскурсию.

Экскурсия: ${tourName}
Дата: ${date}
Взрослых: ${adults}
Детей: ${children}
Предварительная стоимость: ${currencySymbol}${totalPrice}
Имя и фамилия: ${customerName}
Отель: ${hotelName}
Место встречи/трансфер: ${pickupPreference}
Контактный номер: ${phone}
Примечания: ${notes || 'Нет'}

Пожалуйста, подтвердите наличие мест, точное время выезда, место встречи и окончательную стоимость.`;

    case 'pl':
      return `Dzień dobry, FIX PRICE ALANYA TOURS! Chciałbym/chciałabym zarezerwować wycieczkę.

Wycieczka: ${tourName}
Data: ${date}
Dorośli: ${adults}
Dzieci: ${children}
Szacunkowy koszt: ${currencySymbol}${totalPrice}
Imię i nazwisko: ${customerName}
Hotel: ${hotelName}
Preferencja odbioru: ${pickupPreference}
Numer kontaktowy: ${phone}
Uwagi: ${notes || 'Brak'}

Proszę o potwierdzenie dostępności, dokładnej godziny odbioru, miejsca zbiórki i ostatecznej ceny.`;

    case 'cs':
      return `Dobrý den, FIX PRICE ALANYA TOURS! Rád/a bych si rezervoval/a výlet.

Výlet: ${tourName}
Datum: ${date}
Dospělí: ${adults}
Děti: ${children}
Odhadovaná cena: ${currencySymbol}${totalPrice}
Jméno a příjmení: ${customerName}
Hotel: ${hotelName}
Místo vyzvednutí: ${pickupPreference}
Kontaktní telefon: ${phone}
Poznámka: ${notes || 'Žádná'}

Prosím o potvrzení dostupnosti, přesného času vyzvednutí, místa setkání a konečné ceny.`;

    case 'de':
      return `Hallo FIX PRICE ALANYA TOURS! Ich möchte eine Tour buchen.

Tour: ${tourName}
Datum: ${date}
Erwachsene: ${adults}
Kinder: ${children}
Geschätzter Gesamtpreis: ${currencySymbol}${totalPrice}
Vollständiger Name: ${customerName}
Hotel: ${hotelName}
Abholpräferenz: ${pickupPreference}
Kontakttelefon: ${phone}
Zusätzliche Anmerkungen: ${notes || 'Keine'}

Bitte bestätigen Sie die Verfügbarkeit, genaue Abholzeit, den Treffpunkt und den Endpreis.`;

    case 'tr':
      return `Merhaba FIX PRICE ALANYA TOURS! Tur rezervasyonu yapmak istiyorum.

Tur: ${tourName}
Tarih: ${date}
Yetişkin: ${adults}
Çocuk: ${children}
Tahmini Toplam Fiyat: ${currencySymbol}${totalPrice}
Ad Soyad: ${customerName}
Otel / Adres: ${hotelName}
Alınış Tercihi: ${pickupPreference}
WhatsApp Telefonu: ${phone}
Ek Notlar: ${notes || 'Yok'}

Ödeme Durumu: Tur günü araçta/rehbere nakit veya kart ile (Ön ödeme yok)
Transfer: Ücretsiz gidiş-dönüş otel transferi dahil

Lütfen müsaitliği, kesin alınış saatini ve rezervasyonumu onaylar mısınız?`;

    case 'en':
    default:
      return `Hello FIX PRICE ALANYA TOURS! I would like to book a tour.

Tour: ${tourName}
Date: ${date}
Adults: ${adults}
Children: ${children}
Estimated Total: ${currencySymbol}${totalPrice}
Full Name: ${customerName}
Hotel: ${hotelName}
Pickup Preference: ${pickupPreference}
Contact Number: ${phone}
Additional Notes: ${notes || 'None'}

Please confirm availability, exact pickup time, meeting point, and final price.`;
  }
}
