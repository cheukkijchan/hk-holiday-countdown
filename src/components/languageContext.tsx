'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { getHolidays } from '../lib/getHolidays';
import { Holiday } from '../lib/types';

const OPTIONS = { TC: 'tc', EN: 'en' } as const;
export type Options = (typeof OPTIONS)[keyof typeof OPTIONS];

interface LanguageContextType {
  language: string;
  setLanguage: Dispatch<SetStateAction<Options>>;
  content: Holiday[];
  options: string[];
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'system',
  setLanguage: () => {},
  content: [] as Holiday[],
  options: [] as string[],
});

interface Props {
  children: ReactNode;
}

export function LanguageProvider({ children }: Props) {
  const [language, setLanguage] = useState<Options>('tc');

  const getContent = () => {
    switch (language) {
      case 'en':
        return getHolidays('en');
      case 'tc':
        return getHolidays('tc');
      // Add more cases for other languages
      default:
        return getHolidays('tc');
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    content: getContent(),
    options: Object.values(OPTIONS),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
