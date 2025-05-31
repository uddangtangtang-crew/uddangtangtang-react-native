import { TYPE_IMAGES } from '../constants/images';
import { createMockCompatibilityApiResponse } from '../constants/mockData';

// MatchingResultScreen의 상태와 로직을 관리하는 커스텀 훅
export const useMatchingResultScreen = (apiResponse, myType, partnerType) => {
    // API 응답이 없으면 기본 Mock API 응답 사용
    let currentApiResponse = apiResponse;
    let currentMyType = myType;
    let currentPartnerType = partnerType;
    
    if (!apiResponse) {
        currentApiResponse = createMockCompatibilityApiResponse('가성비 장인 원숭이', '자낳괴 탐험가 코끼리');
        currentMyType = '가성비 장인 원숭이';
        currentPartnerType = '자낳괴 탐험가 코끼리';
    }

    // API 응답 그대로 반환
    const apiResult = currentApiResponse.result;

    // 네비게이션 핸들러들
    const handleGoHome = (navigation) => {
        navigation.navigate('우당탕탕 여행 성향');
    };

    const handleShare = () => {
        console.log('공유하기');
    };

    const handleCopyLink = () => {
        console.log('링크 복사');
    };

    return {
        apiResult,
        myType: currentMyType,
        partnerType: currentPartnerType,
        typeImages: TYPE_IMAGES,
        handleGoHome,
        handleShare,
        handleCopyLink
    };
}; 