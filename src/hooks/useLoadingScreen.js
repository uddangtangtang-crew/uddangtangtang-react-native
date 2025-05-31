import { useEffect } from 'react';
import { getCompatibilityResult } from '../services/api';
import { createMockCompatibilityApiResponse } from '../constants/mockData';

// LoadingScreen의 로직을 관리하는 커스텀 훅
export const useLoadingScreen = (myType, partnerType, navigation) => {

    useEffect(() => {
        const fetchCompatibilityResult = async () => {
            try {
                const response = await getCompatibilityResult(myType, partnerType);
                
                if (response.success) {
                    // 실제 API 응답을 그대로 전달
                    navigation.navigate('여행 궁합 결과는?', {
                        apiResponse: response.data,
                        myType,
                        partnerType
                    });
                } else {
                    // API 호출 실패 시 Mock API 응답 사용
                    console.error('궁합 API 호출 실패:', response.message);
                    const mockApiResponse = createMockCompatibilityApiResponse(myType, partnerType);
                    
                    navigation.navigate('여행 궁합 결과는?', {
                        apiResponse: mockApiResponse,
                        myType,
                        partnerType
                    });
                }
            } catch (error) {
                console.error('궁합 분석 중 오류 발생:', error);
                // 오류 발생 시 Mock API 응답 사용
                const mockApiResponse = createMockCompatibilityApiResponse(myType, partnerType);
                
                navigation.navigate('여행 궁합 결과는?', {
                    apiResponse: mockApiResponse,
                    myType,
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