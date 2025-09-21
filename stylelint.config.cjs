module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  rules: {
    'color-hex-length': 'short',
    'color-named': 'never',
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]*$',
    'selector-id-pattern': '^[a-z][a-zA-Z0-9]*$',
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
  },
  ignoreFiles: ['**/node_modules/**', '**/dist/**', 'coverage/**',   "**/build/**/*",
],
};
