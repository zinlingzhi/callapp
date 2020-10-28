module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        alias: {
          screens: './src/screens',
          utils: './src/utils',
          assets: './src/assets',
          components: './src/components',
          resources: './src/resources',
          store: './src/store',
        },
      },
    ],
  ],
};
