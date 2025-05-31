import { useEffect } from 'react';
import { getCompatibilityResult } from '../services/api';
import { calculateCompatibilityScore } from '../utils/compatibilityUtils';
import { createMockMatchingResult } from '../constants/mockData';

// LoadingScreen의 로직을 관리하는 커스텀 훅
export const useLoadingScreen = (myType, partnerType, navigation) => {

    useEffect(() => {
        const fetchCompatibilityResult = async () => {
            try {
                const response = await getCompatibilityResult(myType, partnerType);
                
                if (response.success) {
                    // API 응답을 화면에서 사용할 형태로 변환
                    const apiResult = response.data.result;
                    const matchingResult = {
                        myType,
                        partnerType,
                        compatibility: calculateCompatibilityScore(apiResult.result),
                        description: apiResult.result,
                        pros: apiResult.tips ? apiResult.tips.split('\n').filter(tip => tip.trim()) : [],
                        cons: apiResult.conflictPoints ? apiResult.conflictPoints.split('\n').filter(point => point.trim()) : [],
                        recommendation: apiResult.recommendations ? apiResult.recommendations.join('\n') : ''
                    };

                    navigation.navigate('MatchingResultScreen', {
                        matchingResult: matchingResult
                    });
                } else {
                    // API 호출 실패 시 Mock 데이터 사용
                    console.error('궁합 API 호출 실패:', response.message);
                    navigation.navigate('MatchingResultScreen', {
                        matchingResult: createMockMatchingResult(myType, partnerType)
                    });
                }
            } catch (error) {
                console.error('궁합 분석 중 오류 발생:', error);
                // 오류 발생 시 Mock 데이터로 대체
                navigation.navigate('MatchingResultScreen', {
                    matchingResult: createMockMatchingResult(myType, partnerType)
                });
            }
        };

        // 최소 3초는 로딩 화면을 보여주기 위해 타이머 사용
        const timer = setTimeout(() => {
            console.log('로딩 완료, 결과 화면으로 이동');
            fetchCompatibilityResult();
        }, 3000);

        return () => clearTimeout(timer);
    }, [myType, partnerType, navigation]);

    return {};
}; 