module.exports = {
  presets: [['airbnb', {
    targets: {
      chrome: 80,
    },
  }]],
  plugins: [
    '@babel/plugin-syntax-import-meta',
  ],
};
