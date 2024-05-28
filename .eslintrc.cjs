module.exports = {
  root: true,
  extends: ['@tata-v/eslint-config-react'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'jsx-a11y/mouse-events-have-key-events': 'off',
  },
};
