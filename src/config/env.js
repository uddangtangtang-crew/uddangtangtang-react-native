import Constants from 'expo-constants';

// 환경변수 설정
export const ENV = {
  // API 기본 URL - 웹 환경에서 HTTPS인 경우 처리
  API_BASE_URL: (() => {
    // 웹 환경에서 HTTPS인 경우 (Vercel 배포)
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      // 개발용 서버가 HTTPS를 지원하지 않으므로 임시로 프록시 사용
      // 실제로는 서버를 HTTPS로 설정하는 것이 가장 좋음
      console.warn('🚨 HTTPS 환경에서 HTTP API 호출 - Mixed Content 이슈 가능성');
      
      // 환경변수가 있으면 우선 사용
      if (Constants.expoConfig?.extra?.apiBaseUrl) {
        return Constants.expoConfig.extra.apiBaseUrl;
      }
      
      // HTTPS 환경에서는 proxy나 HTTPS API 사용 권장
      // 현재는 개발용 HTTP 서버 계속 사용 (브라우저에서 차단될 수 있음)
      return 'http://3.37.122.13:8080';
    }
    
    // 로컬 개발 환경이나 HTTP 환경
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