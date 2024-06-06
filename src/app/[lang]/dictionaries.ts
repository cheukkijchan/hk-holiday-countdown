import 'server-only';
import en from '../../dictionaries/en.json';
import tc from '../../dictionaries/tc.json';

export type LocaleDictionary = {
  [key: string]: {
    [key: string]: string;
  };
};

export type Locale = 'en' | 'tc';

const i18nDictionary = {
  en,
  tc,
} as Record<Locale, LocaleDictionary>;

export function getDictionary<L extends keyof typeof i18nDictionary>(
  lang: L
): (typeof i18nDictionary)[L] {
  return i18nDictionary[lang];
}
