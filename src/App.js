import React, { useState, useEffect } from 'react';
import { StatusBar, View, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';
import KakaoSDK from './components/web/KakaoSDK';
import { COLORS } from './constants/theme';
import { Analytics } from '@vercel/analytics/react';

// GTM 스크립트 추가
const GTM_SCRIPT = `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-N63FQQ6F');
`;

// 개발 환경에서 특정 경고 필터링
if (__DEV__) {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] && 
      typeof args[0] === 'string' && 
      (args[0].includes('props.pointerEvents is deprecated') ||
       args[0].includes('style.resizeMode is deprecated'))
    ) {
      return;
    }
    originalWarn(...args);
  };
}

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // GTM 스크립트 추가
    if (Platform.OS === 'web') {
      const script = document.createElement('script');
      script.innerHTML = GTM_SCRIPT;
      document.head.appendChild(script);

      // noscript 태그 추가
      const noscript = document.createElement('noscript');
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-N63FQQ6F';
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';
      noscript.appendChild(iframe);
      document.body.insertBefore(noscript, document.body.firstChild);
    }

    async function loadFonts() {
      try {
        await Font.loadAsync({
          'NanumSquareRound': require('../assets/fonts/NanumSquareRoundOTFR.otf'),
          'NanumSquareRoundB': require('../assets/fonts/NanumSquareRoundOTFB.otf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('폰트 로딩 에러:', error);
        setFontsLoaded(true); // 에러가 발생해도 앱은 계속 실행
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <KakaoSDK />
      <AppNavigator />
      {Platform.OS === 'web' && <Analytics />}
    </SafeAreaProvider>
  );
};

export default App;