import { useEffect } from 'react';
import { getCompatibilityResult, getTravelTypeResult } from '../services/api';
import { createMockCompatibilityApiResponse } from '../constants/mockData';
import { useQuizStore } from '../store/useQuizStore';

// LoadingScreen의 로직을 관리하는 커스텀 훅
export const useLoadingScreen = (myType, partnerType, navigation) => {

    useEffect(() => {
        const fetchCompatibilityResult = async () => {
            try {
                let finalMyType = myType;
                let finalPartnerType = partnerType;

                // B의 유형이 없는 경우 (공유 결과에서 온 경우) B의 유형을 계산
                if (!myType && partnerType) {
                    const answers = useQuizStore.getState().answers;
                    console.log('B의 답변으로 유형 계산 중:', answers);
                    
                    const typeResponse = await getTravelTypeResult(answers);
                    if (typeResponse.success) {
                        finalMyType = typeResponse.data.typeName;
                        console.log('B의 유형 계산 완료:', finalMyType);
                    } else {
                        console.error('B의 유형 계산 실패:', typeResponse.message);
                        // 실패 시 기본값 사용
                        finalMyType = '온도차 낭만파 강아지';
                    }
                }

                console.log('궁합 분석 시작:', { myType: finalMyType, partnerType: finalPartnerType });
                
                const response = await getCompatibilityResult(finalMyType, finalPartnerType);
                
                if (response.success) {
                    // 실제 API 응답을 그대로 전달
                    navigation.navigate('여행 궁합 결과는?', {
                        apiResponse: response.data,
                        myType: finalMyType,
                        partnerType: finalPartnerType
                    });
                } else {
                    // API 호출 실패 시 Mock API 응답 사용
                    console.error('궁합 API 호출 실패:', response.message);
                    const mockApiResponse = createMockCompatibilityApiResponse(finalMyType, finalPartnerType);
                    
                    navigation.navigate('여행 궁합 결과는?', {
                        apiResponse: mockApiResponse,
                        myType: finalMyType,
                        partnerType: finalPartnerType
                    });
                }
            } catch (error) {
                console.error('궁합 분석 중 오류 발생:', error);
                // 오류 발생 시 Mock API 응답 사용
                const mockApiResponse = createMockCompatibilityApiResponse(myType || '온도차 낭만파 강아지', partnerType);
                
                navigation.navigate('여행 궁합 결과는?', {
                    apiResponse: mockApiResponse,
                    myType: myType || '온도차 낭만파 강아지',
                    partnerType
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