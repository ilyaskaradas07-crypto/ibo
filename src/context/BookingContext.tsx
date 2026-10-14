import React, { createContext, useContext, useState } from 'react';
import { Tour } from '../types';

interface BookingInitialData {
  tour?: Tour;
  date?: string;
  adults?: number;
  children?: number;
}

interface BookingContextType {
  isOpen: boolean;
  activeTour: Tour | null;
  initialDate: string;
  initialAdults: number;
  initialChildren: number;
  openBooking: (data?: BookingInitialData) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [initialDate, setInitialDate] = useState('');
  const [initialAdults, setInitialAdults] = useState(2);
  const [initialChildren, setInitialChildren] = useState(0);

  const openBooking = (data?: BookingInitialData) => {
    if (data?.tour) setActiveTour(data.tour);
    if (data?.date) setInitialDate(data.date);
    if (data?.adults !== undefined) setInitialAdults(data.adults);
    if (data?.children !== undefined) setInitialChildren(data.children);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        activeTour,
        initialDate,
        initialAdults,
        initialChildren,
        openBooking,
        closeBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
