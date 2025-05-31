import { TYPE_NAME_IMAGES } from '../constants/images';
import { MOCK_CATEGORY_RESULT } from '../constants/mockData';
import { splitReason } from '../utils/textUtils';

// CategoryScreen의 상태와 로직을 관리하는 커스텀 훅
export const useCategoryScreen = (resultData) => {
    // API 응답에서 result 객체 추출, 없으면 기본값 사용
    const result = resultData?.result || MOCK_CATEGORY_RESULT.result;

    const { mainText, lastSentence } = splitReason(result.reason);

    // 기본 이미지 (API에서 이미지가 없을 때 사용)
    const defaultImage = require('../../assets/airplane-only.svg');

    // 네비게이션 핸들러들
    const handleCheckCompatibility = (navigation) => {
        navigation.navigate('여행 궁합 알아보기');
    };

    const handleShare = () => {
        console.log('공유하기');
    };

    const handleCopyLink = () => {
        console.log('링크 복사');
    };

    return {
        result,
        typeNameImages: TYPE_NAME_IMAGES,
        mainText,
        lastSentence,
        defaultImage,
        handleCheckCompatibility,
        handleShare,
        handleCopyLink
    };
}; 