import { Platform } from 'react-native';
import { getAppDomain, KAKAO_APP_KEY, KAKAO_CUSTOM_TEMPLATE } from '../constants/kakao';

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
const getShareLink = (shareId, shareType = 'personal') => {
    console.log('🔗 공유 링크 생성, shareId:', shareId, 'shareType:', shareType);
    
    const domain = getAppDomain();
    let shareUrl;
    
    if (shareType === 'compatibility') {
        shareUrl = `${domain}/compatibility-result/${shareId}`;
    } else if (shareType === 'photo-story') {
        shareUrl = `${domain}/photo-story/${shareId}`;
    } else {
        shareUrl = `${domain}/result/${shareId}`;
    }
    
    // 중복된 슬래시 제거
    shareUrl = shareUrl.replace(/([^:]\/)\/+/g, '$1');
    
    console.log('✅ 생성된 공유 링크:', shareUrl);
    return shareUrl;
};

/**
 * URL 클립보드 복사 (플랫폼별 처리)
 */
const copyToClipboard = async (url) => {
    try {
        if (Platform.OS === 'web') {
            // 웹에서는 navigator.clipboard 사용
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(url);
                return true;
            } else {
                // 폴백: 임시 textarea 사용
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            }
        } else {
            // 모바일에서는 일단 콘솔 로그로 URL 표시 (나중에 라이브러리 추가 가능)
            console.log('📋 복사할 URL:', url);
            return false; // 모바일은 아직 복사 기능 없음
        }
    } catch (error) {
        console.error('URL 복사 실패:', error);
        return false;
    }
};

/**
 * 개인 결과 URL 복사하기
 */
export const copyPersonalResultUrl = async (result) => {
    try {
        const domain = getAppDomain();
        const shareId = result.shareId || Date.now().toString();
        const shareUrl = `${domain}/result/${shareId}`;
        
        console.log('🔗 개인 결과 URL 복사:', shareUrl);
        
        const success = await copyToClipboard(shareUrl);
        
        if (success) {
            if (Platform.OS === 'web') {
                alert('링크가 클립보드에 복사되었습니다!');
            }
        } else {
            if (Platform.OS === 'web') {
                alert('클립보드 복사에 실패했습니다.');
            } else {
                alert(`링크: ${shareUrl}\n\n링크가 표시되었습니다. 수동으로 복사해주세요.`);
            }
        }
        
        return shareUrl;
    } catch (error) {
        console.error('개인 결과 URL 복사 실패:', error);
        alert('URL 복사에 실패했습니다.');
        return null;
    }
};

/**
 * 궁합 결과 URL 복사하기
 */
export const copyCompatibilityResultUrl = async ({ apiResult }) => {
    try {
        const domain = getAppDomain();
        const shareId = apiResult.result?.shareId || apiResult.shareId || Date.now().toString();
        const shareUrl = `${domain}/compatibility-result/${shareId}`;
        
        console.log('🔗 궁합 결과 URL 복사:', shareUrl);
        
        const success = await copyToClipboard(shareUrl);
        
        if (success) {
            if (Platform.OS === 'web') {
                alert('링크가 클립보드에 복사되었습니다!');
            }
        } else {
            if (Platform.OS === 'web') {
                alert('클립보드 복사에 실패했습니다.');
            } else {
                alert(`링크: ${shareUrl}\n\n링크가 표시되었습니다. 수동으로 복사해주세요.`);
            }
        }
        
        return shareUrl;
    } catch (error) {
        console.error('궁합 결과 URL 복사 실패:', error);
        alert('URL 복사에 실패했습니다.');
        return null;
    }
};

/**
 * 궁합네컷 URL 복사하기
 */
export const copyPhotoStoryUrl = async (shareId) => {
    try {
        const domain = getAppDomain();
        const shareUrl = `${domain}/photo-story/${shareId}`;
        
        console.log('🔗 궁합네컷 URL 복사:', shareUrl);
        
        const success = await copyToClipboard(shareUrl);
        
        if (success) {
            if (Platform.OS === 'web') {
                alert('링크가 클립보드에 복사되었습니다!');
            }
        } else {
            if (Platform.OS === 'web') {
                alert('클립보드 복사에 실패했습니다.');
            } else {
                alert(`링크: ${shareUrl}\n\n링크가 표시되었습니다. 수동으로 복사해주세요.`);
            }
        }
        
        return shareUrl;
    } catch (error) {
        console.error('궁합네컷 URL 복사 실패:', error);
        alert('URL 복사에 실패했습니다.');
        return null;
    }
};

/**
 * 카카오톡 개인 여행 성향 결과 공유하기
 */
export const sharePersonalResult = async (result, webUrl) => {
    try {
        const domain = webUrl || getAppDomain();
        const shareId = result.shareId || Date.now().toString();
        
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
        
        // 공유 링크 생성하기 (개인 결과)
        const shareLink = getShareLink(shareId, 'personal');
        console.log('🔗 생성된 shareLink:', shareLink);
        
        // 커스텀 템플릿 사용
        const templateArgs = {
            type_name: result.typeName,
            domain: domain,
            share_id: shareId,
            path: `/result/${shareId}`,
            full_url: shareLink,
            test_link: domain,
            // 웹훅 관련 데이터
            share_type: 'personal',
            user_id: 'user_' + Date.now(),
            timestamp: new Date().toISOString()
        };
        
        console.log('📋 템플릿에 전달할 데이터:');
        console.log('  🌐 domain:', templateArgs.domain);
        console.log('  🆔 shareId:', shareId);
        console.log('  📁 path:', `/result/${shareId}`);
        console.log('  🎯 shareLink (전체 URL):', shareLink);
        console.log('  🏠 testLink (홈 페이지):', domain);
        console.log('  📄 전체 templateArgs:', templateArgs);

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
        console.log('🎯 shareCompatibilityResult 함수 시작');
        console.log('📥 받은 데이터:', { myType, partnerType, apiResult });
        
        const domain = webUrl || getAppDomain();
        
        // API 응답 구조에 따른 shareId 추출
        // apiResult는 전체 API 응답이므로 result.shareId에서 가져옴
        const shareId = apiResult.result?.shareId || apiResult.shareId || Date.now().toString();
        
        console.log('✅ 최종 사용할 shareId:', shareId);
        console.log('🌐 도메인:', domain);
        
        // 공유 링크 생성하기 (궁합 결과)
        const shareLink = getShareLink(shareId, 'compatibility');
        console.log('🔗 생성된 shareLink:', shareLink);
        
        // 커스텀 템플릿 사용
        const templateArgs = {
            myType: myType,
            otherType: partnerType,
            domain: domain,
            shareId: shareId,
            path: `/compatibility-result/${shareId}`,
            fullUrl: shareLink,
            testLink: domain,
            // 웹훅 관련 데이터
            shareType: 'compatibility',
            userId: 'user_' + Date.now(),
            timestamp: new Date().toISOString()
        };
        
        console.log('📋 템플릿에 전달할 데이터:');
        console.log('  👤 myType:', myType);
        console.log('  👥 otherType:', partnerType);
        console.log('  🌐 domain:', domain);
        console.log('  🆔 shareId:', shareId);
        console.log('  🔗 shareLink:', shareLink);
        console.log('  📄 전체 templateArgs:', templateArgs);

        // 플랫폼별 공유 실행
        if (Platform.OS === 'web') {
            return await shareOnWebWithCustomTemplate(KAKAO_CUSTOM_TEMPLATE.COMPATIBILITY_RESULT.id, templateArgs);
        } else {
            return await shareOnMobileWithCustomTemplate(KAKAO_CUSTOM_TEMPLATE.COMPATIBILITY_RESULT.id, templateArgs);
        }
    } catch (error) {
        console.error('궁합 결과 공유 실패:', error);
        throw error;
    }
};

/**
 * 카카오톡 궁합네컷 공유하기
 */
export const sharePhotoStory = async (shareId, myType, otherType, webUrl) => {
    try {
        console.log('🎯 sharePhotoStory 함수 시작');
        console.log('📥 받은 데이터:', { shareId, myType, otherType });
        
        const domain = webUrl || getAppDomain();
        
        console.log('✅ 최종 사용할 shareId:', shareId);
        console.log('🌐 도메인:', domain);
        
        // 공유 링크 생성하기 (궁합네컷)
        const shareLink = getShareLink(shareId, 'photo-story');
        console.log('🔗 생성된 shareLink:', shareLink);
        
        // 커스텀 템플릿 사용
        const templateArgs = {
            shareId: shareId,
            myType: myType,
            otherType: otherType,
            domain: domain,
            path: `/photo-story/${shareId}`,
            fullUrl: shareLink,
            testLink: domain,
            // 웹훅 관련 데이터
            shareType: 'photo-story',
            userId: 'user_' + Date.now(),
            timestamp: new Date().toISOString()
        };
        
        console.log('📋 템플릿에 전달할 데이터:');
        console.log('  🆔 shareId:', shareId);
        console.log('  👤 myType:', myType);
        console.log('  👥 otherType:', otherType);
        console.log('  🌐 domain:', domain);
        console.log('  🔗 shareLink:', shareLink);
        console.log('  📄 전체 templateArgs:', templateArgs);

        // 플랫폼별 공유 실행
        if (Platform.OS === 'web') {
            return await shareOnWebWithCustomTemplate(KAKAO_CUSTOM_TEMPLATE.PHOTO_STORY.id, templateArgs);
        } else {
            return await shareOnMobileWithCustomTemplate(KAKAO_CUSTOM_TEMPLATE.PHOTO_STORY.id, templateArgs);
        }
    } catch (error) {
        console.error('궁합네컷 공유 실패:', error);
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