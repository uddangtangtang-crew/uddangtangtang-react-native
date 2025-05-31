const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
  config.resolver.assetExts.push('lottie');
  config.resolver.sourceExts.push('svg');
  
  // Platform 관련 에러 방지를 위한 설정
  config.resolver.platforms = ['ios', 'android', 'native', 'web'];

  return config;
})();
