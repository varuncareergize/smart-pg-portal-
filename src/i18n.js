import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './locales/translations.json' with { type: 'json' };

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ml', label: 'മലയാളം' },
];
const saved = localStorage.getItem('livzz-language');
const preferred = saved || navigator.language.split('-')[0];
const language = languages.some(({ code }) => code === preferred) ? preferred : 'en';
const resources = Object.fromEntries(languages.map(({ code }) => [code, {
  translation: Object.fromEntries(Object.entries(translations).map(([key, values]) => [key, code === 'en' ? key : values[code] || key])),
}]));

i18n.use(initReactI18next).init({
  resources, lng: language, fallbackLng: 'en', keySeparator: false,
  nsSeparator: false, interpolation: { escapeValue: false },
});
const updateLanguage = (code) => {
  document.documentElement.lang = code;
  localStorage.setItem('livzz-language', code);
};
i18n.on('languageChanged', updateLanguage);
updateLanguage(language);

// Only authored interface copy belongs in the dictionary. API values, identifiers,
// React elements and numeric values pass through without modifying stored data.
export function translate(value, options = {}) {
  if (typeof value !== 'string') return value;
  return i18n.t(value, { defaultValue: value, ...options });
}
export default i18n;
