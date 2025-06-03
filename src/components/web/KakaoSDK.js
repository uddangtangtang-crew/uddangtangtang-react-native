import { useEffect } from 'react';
import { Platform } from 'react-native';
import { KAKAO_APP_KEY } from '../../constants/kakao';

// 전역 상태로 SDK 로딩 상태 추적
if (typeof window !== 'undefined') {
    window.__KAKAO_SDK_LOADING__ = false;
    window.__KAKAO_SDK_LOADED__ = false;
}

const KakaoSDK = () => {
    useEffect(() => {
        // 웹 환경에서만 실행
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
            
            if (!KAKAO_APP_KEY) {
                console.error('카카오 앱키가 없습니다.');
                return;
            }

            // 이미 로드되어 있으면 리턴
            if (window.Kakao) {
                if (!window.Kakao.isInitialized()) {
                    window.Kakao.init(KAKAO_APP_KEY);
                }
                return;
            }

            // 카카오 SDK 스크립트 로드
            const script = document.createElement('script');
            script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js';
            script.integrity = 'sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6';
            script.crossOrigin = 'anonymous';
            script.async = true;
            
            script.onload = () => {
                if (window.Kakao && KAKAO_APP_KEY) {
                    window.Kakao.init(KAKAO_APP_KEY);
                    console.log('카카오 SDK 초기화 완료');
                }
            };
            
            script.onerror = () => {
                console.error('카카오 SDK 로드 실패');
            };

            document.head.appendChild(script);
        }
    }, []);

    return null;
};

export default KakaoSDK; 