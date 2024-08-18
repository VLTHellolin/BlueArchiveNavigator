module.exports = {
  plugins: [require.resolve('@prettier/plugin-pug')],
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSameLine: true,
  arrowParens: 'always',
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  pugAttributeSeparator: 'as-needed',
  pugSortAttributes: 'asc',
  vueIndentScriptAndStyle: false,
};
