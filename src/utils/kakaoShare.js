import { Platform } from 'react-native';
import { getAppDomain, KAKAO_TEMPLATES, KAKAO_APP_KEY, KAKAO_CUSTOM_TEMPLATE } from '../constants/kakao';

// 모바일용 라이브러리 (조건부 import)
let KakaoShareLink = null;
if (Platform.OS !== 'web') {
    KakaoShareLink = require('react-native-kakao-share-link').default;
}

/**
 * 카카오 SDK 로딩 대기 함수
 */
const waitForKakaoSDK = (timeout = 10000) => {
    return new Promise((resolve, reject) => {
        if (typeof window !== 'undefined' && window.Kakao) {
            resolve(window.Kakao);
            return;
        }
        
        const startTime = Date.now();
        const checkInterval = 100;
        
        const intervalId = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            
            if (typeof window !== 'undefined' && window.Kakao) {
                clearInterval(intervalId);
                resolve(window.Kakao);
            } else if (elapsedTime >= timeout) {
                clearInterval(intervalId);
                reject(new Error(`카카오 SDK 로딩 타임아웃`));
            }
        }, checkInterval);
    });
};

/**
 * 웹용 카카오톡 공유하기
 */
const shareOnWeb = async (shareOptions) => {
    try {
        const Kakao = await waitForKakaoSDK();
        
        // cleanup 후 재초기화
        if (typeof Kakao.cleanup === 'function') {
            Kakao.cleanup();
        }
        
        // 앱키 정리 및 초기화
        const cleanAppKey = KAKAO_APP_KEY.trim().replace(/['"]/g, '');
        Kakao.init(cleanAppKey);
        
        // 카카오톡 공유 실행
        await Kakao.Share.sendDefault(shareOptions.templateObject);
        
        return { success: true };
    } catch (error) {
        console.error('웹 카카오톡 공유 실패:', error);
        throw error;
    }
};

/**
 * 모바일용 카카오톡 공유하기
 */
const shareOnMobile = async (shareOptions) => {
    try {
        if (!KakaoShareLink) {
            throw new Error('카카오 Share Link가 로드되지 않았습니다.');
        }
        
        const response = await KakaoShareLink.sendFeed(shareOptions);
        return response;
    } catch (error) {
        console.error('모바일 카카오톡 공유 실패:', error);
        throw error;
    }
};

/**
 * 웹용 카카오톡 커스텀 템플릿 공유하기
 */
const shareOnWebWithCustomTemplate = async (templateId, templateArgs) => {
    try {
        const Kakao = await waitForKakaoSDK();
        
        // cleanup 후 재초기화
        if (typeof Kakao.cleanup === 'function') {
            Kakao.cleanup();
        }
        
        // 앱키 정리 및 초기화
        const cleanAppKey = KAKAO_APP_KEY.trim().replace(/['"]/g, '');
        Kakao.init(cleanAppKey);
        
        console.log('🎨 커스텀 템플릿 공유 시작, 템플릿 ID:', templateId);
        console.log('📋 전달할 데이터:', templateArgs);
        
        // 카카오톡 커스텀 템플릿 공유 실행
        await Kakao.Share.sendCustom({
            templateId: templateId,
            templateArgs: templateArgs
        });
        
        return { success: true };
    } catch (error) {
        console.error('웹 카카오톡 커스텀 템플릿 공유 실패:', error);
        throw error;
    }
};

/**
 * 모바일용 카카오톡 커스텀 템플릿 공유하기
 */
const shareOnMobileWithCustomTemplate = async (templateId, templateArgs) => {
    try {
        if (!KakaoShareLink) {
            throw new Error('카카오 Share Link가 로드되지 않았습니다.');
        }
        
        console.log('📱 모바일 커스텀 템플릿 공유 시작, 템플릿 ID:', templateId);
        console.log('📋 전달할 데이터:', templateArgs);
        
        // react-native-kakao-share-link의 커스텀 템플릿 지원 확인 필요
        // 일반적으로 sendCustom 메서드가 있을 것으로 예상
        const response = await KakaoShareLink.sendCustom({
            templateId: templateId,
            templateArgs: templateArgs
        });
        
        return response;
    } catch (error) {
        console.error('모바일 카카오톡 커스텀 템플릿 공유 실패:', error);
        // 커스텀 템플릿이 지원되지 않는 경우 기본 템플릿으로 fallback
        throw error;
    }
};

/**
 * 공유 링크 생성하기
 */
const getShareLink = (shareId) => {
    console.log('🔗 공유 링크 생성, shareId:', shareId);
    
    const domain = getAppDomain();
    const shareUrl = `${domain}/result/${shareId}`;
    
    console.log('✅ 생성된 공유 링크:', shareUrl);
    return shareUrl;
};

/**
 * 카카오톡 개인 여행 성향 결과 공유하기
 */
export const sharePersonalResult = async (result, webUrl) => {
    try {
        console.log('🎯 sharePersonalResult 함수 시작');
        console.log('📥 받은 result 객체:', result);
        console.log('🔍 result.shareId 값:', result.shareId);
        console.log('📊 result 타입:', typeof result);
        
        const domain = webUrl || getAppDomain();
        const shareId = result.shareId || Date.now().toString();
        
        console.log('✅ 최종 사용할 shareId:', shareId);
        console.log('🌐 도메인:', domain);
        
        // 이미지 URL 처리 (Base64 데이터는 제외)
        let imageUrl = `${domain}/default-image.png`; // 기본 이미지
        if (result.image && typeof result.image === 'string') {
            // URL 형태인지 확인 (http 또는 https로 시작)
            if (result.image.startsWith('http://') || result.image.startsWith('https://')) {
                imageUrl = result.image;
                console.log('🖼️ 서버 이미지 URL 사용:', imageUrl);
            } else {
                console.log('⚠️ 서버 이미지가 Base64 데이터로 판단됨, 기본 이미지 사용');
            }
        }
        console.log('🖼️ 최종 사용할 imageUrl:', imageUrl);
        
        // 공유 링크 생성하기
        const shareLink = getShareLink(shareId);
        console.log('🔗 생성된 shareLink:', shareLink);
        
        // 커스텀 템플릿 사용
        const templateArgs = {
            typeName: result.typeName,
            shareLink: shareLink,
            testLink: domain,
            // 웹훅 관련 데이터
            shareId: shareId,
            shareType: 'personal',
            userId: 'user_' + Date.now(),
            timestamp: new Date().toISOString()
        };
        
        console.log('📋 템플릿에 전달할 데이터:', templateArgs);

        // 플랫폼별 공유 실행
        if (Platform.OS === 'web') {
            return await shareOnWebWithCustomTemplate(KAKAO_CUSTOM_TEMPLATE.TRAVEL_COMPATIBILITY.id, templateArgs);
        } else {
            return await shareOnMobileWithCustomTemplate(KAKAO_CUSTOM_TEMPLATE.TRAVEL_COMPATIBILITY.id, templateArgs);
        }
    } catch (error) {
        console.error('개인 결과 공유 실패:', error);
        throw error;
    }
};

/**
 * 카카오톡 여행 궁합 결과 공유하기
 */
export const shareCompatibilityResult = async ({ myType, partnerType, apiResult }, webUrl) => {
    try {
        const domain = webUrl || getAppDomain();
        const shareId = apiResult.shareId || Date.now().toString();
        
        // 공유 링크 생성하기
        const shareLink = getShareLink(shareId);
        
        const shareOptions = {
            templateObject: {
                objectType: 'feed',
                content: {
                    title: '우당탕탕 여행 궁합 테스트',
                    description: `${myType} X ${partnerType} 궁합 결과`,
                    imageUrl: `${domain}/compatibility-image.png`,
                    link: {
                        webUrl: shareLink,
                        mobileWebUrl: shareLink,
                    },
                },
                buttons: [
                    {
                        title: '우리 궁합 보기',
                        link: {
                            webUrl: shareLink,
                            mobileWebUrl: shareLink,
                        },
                    },
                    {
                        title: '나도 테스트하기',
                        link: {
                            webUrl: domain,
                            mobileWebUrl: domain,
                        },
                    },
                ],
                // 웹훅 설정
                serverCallbackArgs: {
                    shareId: shareId,
                    shareType: 'compatibility',
                    myType: myType,
                    partnerType: partnerType,
                    userId: 'user_' + Date.now(),
                    timestamp: new Date().toISOString()
                },
            },
        };

        // 플랫폼별 공유 실행
        if (Platform.OS === 'web') {
            return await shareOnWeb(shareOptions);
        } else {
            return await shareOnMobile(shareOptions);
        }
    } catch (error) {
        console.error('궁합 결과 공유 실패:', error);
        throw error;
    }
};

/**
 * 카카오톡 앱 설치 여부 확인
 */
export const checkKakaoTalkInstalled = async () => {
    try {
        if (Platform.OS === 'web') {
            return true;
        }
        
        if (KakaoShareLink) {
            const isInstalled = await KakaoShareLink.isKakaoTalkSharingAvailable();
            return isInstalled;
        }
        return false;
    } catch (error) {
        console.error('카카오톡 설치 확인 실패:', error);
        return false;
    }
}; 