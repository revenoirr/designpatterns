module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_'
    }],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'no-console': 'off',
    'max-len': ['error', { 'code': 120 }],
    'prefer-exponentiation-operator': 'error',
    'no-restricted-properties': ['error', {
      'object': 'Math',
      'property': 'pow',
      'message': 'Use ** operator instead'
    }],
    'operator-linebreak': ['error', 'before'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
  },
  env: {
    node: true,
    es6: true,
    jest: true
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.js', 'coverage/']
};