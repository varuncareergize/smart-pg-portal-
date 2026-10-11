import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createInstance } from 'i18next';

const dictionary = JSON.parse(readFileSync(new URL('../src/locales/translations.json', import.meta.url)));
const scripts = { kn: /[\u0C80-\u0CFF]/, te: /[\u0C00-\u0C7F]/, ml: /[\u0D00-\u0D7F]/ };
test('all phrases have translations in the three requested languages', () => {
  assert.ok(Object.keys(dictionary).length > 500);
  for (const [key, values] of Object.entries(dictionary)) {
    for (const language of Object.keys(scripts)) {
      assert.ok(scripts[language].test(values[language]), `${key}: ${language}`);
    }
  }
});
test('switches languages, preserves unknown names, and restores English copy', async () => {
  const i18n = createInstance();
  const resources = Object.fromEntries(['en', 'kn', 'te', 'ml'].map(code => [code, {
    translation: Object.fromEntries(Object.entries(dictionary).map(([key, values]) => [key, code === 'en' ? key : values[code]])),
  }]));
  await i18n.init({ resources, lng: 'en', keySeparator: false, nsSeparator: false });
  for (const language of ['kn', 'te', 'ml', 'en']) {
    await i18n.changeLanguage(language);
    assert.equal(i18n.t('Dashboard'), language === 'en' ? 'Dashboard' : dictionary.Dashboard[language]);
    assert.equal(i18n.t('Rajesh Kumar'), 'Rajesh Kumar');
    assert.equal(i18n.t('Phone number'), language === 'en' ? 'Phone number' : dictionary['Phone number'][language]);
  }
});

test('saved language initializes the app, switching persists and updates document language', async () => {
  const stored = new Map([['livzz-language', 'te']]);
  const previousStorage = globalThis.localStorage;
  const previousDocument = globalThis.document;
  globalThis.localStorage = { getItem: key => stored.get(key) || null, setItem: (key, value) => stored.set(key, value) };
  globalThis.document = { documentElement: { lang: '' } };
  try {
    const { default: i18n, translate, languages } = await import('../src/i18n.js');
    assert.equal(i18n.language, 'te');
    assert.deepEqual(languages.map(language => language.code), ['en', 'kn', 'te', 'ml']);
    for (const code of ['kn', 'te', 'ml', 'en']) {
      await i18n.changeLanguage(code);
      assert.equal(stored.get('livzz-language'), code);
      assert.equal(document.documentElement.lang, code);
      assert.equal(translate('Dashboard'), code === 'en' ? 'Dashboard' : dictionary.Dashboard[code]);
      assert.equal(translate('Maintenance'), code === 'en' ? 'Maintenance' : dictionary.Maintenance[code]);
      assert.equal(translate(1234), 1234);
      assert.equal(translate('Rajesh Kumar'), 'Rajesh Kumar');
    }
  } finally {
    if (previousStorage === undefined) delete globalThis.localStorage; else globalThis.localStorage = previousStorage;
    if (previousDocument === undefined) delete globalThis.document; else globalThis.document = previousDocument;
  }
});
