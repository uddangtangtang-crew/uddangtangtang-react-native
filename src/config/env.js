import Constants from 'expo-constants';

// 환경변수 설정
export const ENV = {
  // API 기본 URL - 웹 환경에서 HTTPS인 경우 처리
  API_BASE_URL: (() => {
    if (!__DEV__) {
      // 프로덕션 환경
      return 'https://api.uddangtangtang-crew.com';
    }
    // 개발 환경(로컬 등)
    return Constants.expoConfig?.extra?.apiBaseUrl || 'http://3.37.122.13:8080';
  })(),
  
  // 개발 환경 여부
  IS_DEV: __DEV__,
  
  // 웹 환경 여부
  IS_WEB: typeof window !== 'undefined',
};

// 환경변수 로깅 (개발 환경에서만)
if (ENV.IS_DEV) {
  console.log('🔧 Environment Config:', ENV);
} 