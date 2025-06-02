// 카카오 API 관련 상수들

// 카카오 앱키 - 새로운 JavaScript 키로 교체하세요
export const KAKAO_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_APP_KEY || '2204040792a6a35acfb117cd740b38b6';

// 카카오 커스텀 템플릿 정보
export const KAKAO_CUSTOM_TEMPLATE = {
    TRAVEL_COMPATIBILITY: {
        id: 121224,
        title: '우당탕탕 여행 궁합'
    }
};

// 앱 도메인 설정
export const APP_DOMAIN = {
    development: 'http://localhost:19006', // Expo 개발 환경
    production: 'https://uddangtangtang-app.vercel.app/', // 배포 환경
};

// 현재 환경에 따른 도메인 선택
export const getAppDomain = () => {
    return __DEV__ ? APP_DOMAIN.development : APP_DOMAIN.production;
};

// 카카오톡 공유 메시지 템플릿
export const KAKAO_TEMPLATES = {
    personal: {
        title: '🎯 나의 여행 성향 결과',
        buttons: [
            {
                title: '나도 테스트하기',
                type: 'test'
            },
            {
                title: '궁합 보러가기',
                type: 'matching'
            }
        ]
    },
    compatibility: {
        title: '💕 우리의 여행 궁합 결과',
        buttons: [
            {
                title: '우리 궁합 보기',
                type: 'result'
            },
            {
                title: '나도 테스트하기',
                type: 'test'
            }
        ]
    }
}; 