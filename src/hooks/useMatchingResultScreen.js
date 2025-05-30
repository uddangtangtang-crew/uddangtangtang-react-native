import { TYPE_IMAGES } from '../constants/images';
import { getCompatibilityColor, getCompatibilityMessage } from '../utils/compatibilityUtils';

// MatchingResultScreen의 상태와 로직을 관리하는 커스텀 훅
export const useMatchingResultScreen = (matchingResult) => {
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
        typeImages: TYPE_IMAGES,
        getCompatibilityColor,
        getCompatibilityMessage,
        handleGoHome,
        handleShare,
        handleCopyLink
    };
}; 