const fs = require('node:fs');
const path = require('node:path');
const directory = path.resolve(__dirname, '../src/locales');
const dictionary = {};
for (const row of fs.readFileSync(path.join(directory, 'translations.txt'), 'utf8').split(/\r?\n/)) {
  if (!row.trim()) continue;
  const [key, kn, te, ml, ...rest] = row.split('|');
  if (!kn || !te || !ml || rest.length) throw new Error(`Invalid translation: ${row}`);
  if (dictionary[key]) throw new Error(`Duplicate phrase: ${key}`);
  dictionary[key] = { kn, te, ml };
}
fs.writeFileSync(path.join(directory, 'translations.json'), JSON.stringify(dictionary, null, 2) + '\n');
console.log(`Built ${Object.keys(dictionary).length} phrases for Kannada, Telugu and Malayalam.`);
