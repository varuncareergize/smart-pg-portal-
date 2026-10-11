# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Interface languages

Use the language selector in the public navigation, login screen, or dashboard top bar to choose English, Kannada (ಕನ್ನಡ), Telugu (తెలుగు), or Malayalam (മലയാളം). The app saves this preference locally, sets the document language for accessibility, and updates translated interface text without changing API payload values. First visits use a supported browser language, otherwise English.

Translations live in `src/locales/translations.txt` as `English|Kannada|Telugu|Malayalam` rows. After edits, run `node scripts/build-translations.cjs` to regenerate the JSON dictionary. Use `translate()` for interface copy and `useTranslation()` in components to subscribe to language changes. Property names, descriptions, personal names, addresses, and uploaded content keep their original language; missing translations fall back to English.

Run `node --test test/*.test.js` to check translation completeness, saved preferences, language switching, and existing property filters. Native-speaker review is recommended before release.
