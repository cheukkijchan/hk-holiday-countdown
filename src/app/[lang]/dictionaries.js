import 'server-only';

const dictionaries = {
  en: () =>
    import('../../dictionaries/en.json').then((module) => module.default),
  tc: () =>
    import('../../dictionaries/tc.json').then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
