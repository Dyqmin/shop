// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  bracketSameLine: true,
  printWidth: 100,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  // "importOrder": ["<BUILT_IN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^[.]"],

  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};
