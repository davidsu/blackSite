module.exports = {
  plugins: ['jest'],
  env: {
    jest: true
  },
  	rules: {
	  'jest/no-focused-tests': 'error',
	  'import/no-extraneous-dependencies': 'off'
	}

}
