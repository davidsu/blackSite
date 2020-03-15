module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
	'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    chrome: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
	semi: ['error', 'never'],
	'prettier/prettier': 'error',
	'import/prefer-default-export': 'off',
	'no-plusplus': 'off',
    'no-console': 'off',
	'react/destructuring-assignment': 'off',
	'react/prop-types': 'off',
	'jsx-a11y/no-static-element-interactions': 'off',
	'jsx-a11y/click-events-have-key-events': 'off',
	'react/jsx-props-no-spreading': 'off',
	'react/no-danger': 'off'
  },
};
