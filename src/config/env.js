import Constants from 'expo-constants';

// 환경변수 설정
export const ENV = {
  // API 기본 URL
  API_BASE_URL: Constants.expoConfig?.extra?.apiBaseUrl || 'http://3.37.122.13:8080',
  
  // 개발 환경 여부
  IS_DEV: __DEV__,
  
  // 웹 환경 여부
  IS_WEB: typeof window !== 'undefined',
};

// 환경변수 로깅 (개발 환경에서만)
if (ENV.IS_DEV) {
  console.log('🔧 Environment Config:', ENV);
} 