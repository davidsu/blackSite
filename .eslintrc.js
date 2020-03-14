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
	'react/prop-types': 'off'
  },
  overrides: [{
	files: ['**/*.test.js', '**/*.testkit.js'],
	env: {
	  jest: true
	},
	rules: {
	  'import/no-extraneous-dependencies': 'off'
	}
  }]
};
