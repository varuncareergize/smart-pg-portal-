import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  return <label className="language-selector">
    <span className="sr-only">{t('Language')}</span>
    <select aria-label={t('Language')} value={i18n.resolvedLanguage || 'en'} onChange={(event) => i18n.changeLanguage(event.target.value)}>
      {languages.map(({ code, label }) => <option key={code} value={code} lang={code}>{label}</option>)}
    </select>
  </label>;
}
