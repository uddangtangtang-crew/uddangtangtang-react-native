import { useState } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { getTravelTypeResult } from '../services/api';
import { formatAnswersForAPI } from '../utils/answerFormatter';
import { MOCK_RESULT_RESPONSE } from '../constants/mockData';

// ResultScreen의 상태와 로직을 관리하는 커스텀 훅
export const useResultScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    // 퀴즈 상태 가져오기
    const answers = useQuizStore((state) => state.answers);
    
    const handleGoCategory = async (navigation) => {
        setIsLoading(true);
        
        try {
            // 현재 저장된 답변 확인
            console.log('현재 저장된 답변:', answers);
            console.log('답변 개수:', Object.keys(answers).length);
            
            // 개발 테스트용: 답변이 부족해도 CategoryScreen으로 이동
            if (Object.keys(answers).length < 12) {
                console.log('테스트용: 답변 부족하지만 CategoryScreen으로 이동');
                navigation.navigate('당신의 여행 유형은?', { 
                    resultData: MOCK_RESULT_RESPONSE 
                });
                setIsLoading(false);
                return;
            }
            
            // 답변 데이터를 API 형식으로 변환
            const formattedAnswers = formatAnswersForAPI(answers);
            console.log('전송할 데이터:', formattedAnswers);
            
            // API 호출
            const result = await getTravelTypeResult(formattedAnswers);
            
            if (result.success) {
                console.log('API 응답 성공:', result.data);
                navigation.navigate('당신의 여행 유형은?', { 
                    resultData: { result: result.data } 
                });
            } else {
                console.error('API 오류:', result.error);
                // 테스트용: API 실패해도 CategoryScreen으로 이동
                console.log('테스트용: API 실패했지만 CategoryScreen으로 이동');
                navigation.navigate('당신의 여행 유형은?', { 
                    resultData: MOCK_RESULT_RESPONSE 
                });
            }
        } catch (error) {
            console.error('예상치 못한 오류:', error);
            // 에러 발생 시에도 Mock 데이터로 이동
            navigation.navigate('당신의 여행 유형은?', { 
                resultData: MOCK_RESULT_RESPONSE 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleGoCategory
    };
}; 