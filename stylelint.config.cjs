module.exports = {
  extends: [
    'stylelint-config-standard-scss', 
    'stylelint-config-prettier' 
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'color-hex-length': 'short',
    'color-named': 'never',
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]*$',
    'selector-id-pattern': '^[a-z][a-zA-Z0-9]*$',
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] }
    ],

    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true
  },
  ignoreFiles: ['**/node_modules/**', '**/dist/**']
};
