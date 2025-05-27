import React, { useState, useEffect } from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';
import { COLORS } from './constants/theme';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
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
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;