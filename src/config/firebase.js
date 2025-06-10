import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
} from '@env';

// 환경변수 검증
const requiredEnvVars = {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
};

// 누락된 환경변수 확인
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// 파이어베이스 설정
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};

console.log('Firebase Config:', firebaseConfig); // 설정값 확인용 로그

// 파이어베이스 초기화
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// GTM을 통한 이벤트 로깅을 위한 유틸리티 함수
export const logAnalyticsEvent = (eventName, eventParams = {}) => {
    try {
        // GTM dataLayer에 이벤트 푸시
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: eventName,
            ...eventParams
        });
        
        // 파이어베이스에도 이벤트 전송 (백업용)
        logEvent(analytics, eventName, eventParams);
        
        console.log(`📊 Analytics 이벤트 로깅 성공: ${eventName}`, eventParams);
    } catch (error) {
        console.error('❌ Analytics 이벤트 로깅 실패:', error);
    }
};

export default app; 