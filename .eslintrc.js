module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'standard'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'overrides': [
    {
      'files': ['*.svelte'],
      'processor': 'svelte3/svelte3'
    }
  ],
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': ['svelte3']
}
