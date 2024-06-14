export const locales = ['en', 'tc'] as const;
export type Locale = (typeof locales)[number];

export const languageOption = { en: 'English', tc: '繁體中文' };
