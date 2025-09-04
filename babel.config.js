module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // если у тебя Expo
    plugins: [
      'react-native-reanimated/plugin', // обязательно для Reanimated
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: false,
        },
      ],
    ],
  };
};
