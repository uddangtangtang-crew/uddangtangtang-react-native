import { TYPE_NAME_IMAGES } from '../constants/images';
import { MOCK_CATEGORY_RESULT } from '../constants/mockData';
import { sharePersonalResult, getShareStats, copyPersonalResultUrl } from '../utils/kakaoShare';

// CategoryScreen의 상태와 로직을 관리하는 커스텀 훅
export const useCategoryScreen = (resultData) => {
    // API 응답에서 result 객체 추출, 없으면 기본값 사용
    const result = resultData?.result || MOCK_CATEGORY_RESULT.result;

    // 기본 이미지 (API에서 이미지가 없을 때 사용)
    const defaultImage = require('../../assets/airplane-only.svg');

    // 네비게이션 핸들러들
    const handleCheckCompatibility = (navigation) => {
        navigation.navigate('여행 궁합 알아보기');
    };

    const handleShare = async () => {
        try {
            console.log('🔗 카카오톡 공유하기 시작...');
            console.log('📋 전달할 result 객체:', result);
            console.log('🆔 result에서 추출한 shareId:', result.shareId);
            console.log('📄 result 전체 내용:', JSON.stringify(result, null, 2));
            
            // 카카오톡 공유하기 호출
            const shareResponse = await sharePersonalResult(result);
            console.log('✅ 카카오톡 공유하기 완료!', shareResponse);

            
        } catch (error) {
            console.error('❌ 카카오톡 공유하기 에러:', error);
            
            // 에러 발생 시 대체 방안 (예: 링크 복사)
            alert('카카오톡 공유에 실패했습니다. 링크를 복사해주세요.');
        }
    };

    const handleCopyLink = async () => {
        try {
            console.log('🔗 링크 복사하기 시작...');
            
            // 개인 결과 URL 복사하기 호출
            const copiedUrl = await copyPersonalResultUrl(result);
            
            if (copiedUrl) {
                console.log('✅ 링크 복사하기 완료:', copiedUrl);
            }
        } catch (error) {
            console.error('❌ 링크 복사하기 에러:', error);
            alert('링크 복사에 실패했습니다.');
        }
    };

    return {
        result,
        typeNameImages: TYPE_NAME_IMAGES,
        defaultImage,
        handleCheckCompatibility,
        handleShare,
        handleCopyLink
    };
}; 