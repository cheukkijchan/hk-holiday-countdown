import 'server-only';
import en from '../../dictionaries/en.json';
import tc from '../../dictionaries/tc.json';

import { type Locale } from '../../dictionaries';

export type LocaleDictionary = typeof en;

const i18nDictionary = {
  en,
  tc,
} satisfies Record<Locale, LocaleDictionary>;

export function getDictionary<L extends keyof typeof i18nDictionary>(
  lang: L
): (typeof i18nDictionary)[L] {
  return i18nDictionary[lang];
}
