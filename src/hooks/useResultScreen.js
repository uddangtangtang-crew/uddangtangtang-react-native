import { useState, useEffect } from 'react';
import { useQuizStore } from '../store/useQuizStore';
import { getTravelTypeResult } from '../services/api';
import { formatAnswersForAPI } from '../utils/answerFormatter';
import { MOCK_RESULT_RESPONSE } from '../constants/mockData';

// ResultScreen의 상태와 로직을 관리하는 커스텀 훅
export const useResultScreen = (route, navigation) => {
    const answers = useQuizStore((state) => state.answers);

    useEffect(() => {
        handleGoCategory(navigation);
    }, []);

    const handleGoCategory = async (navigation) => {
        try {
            if (Object.keys(answers).length < 12) {
                navigation.replace('당신의 여행 유형은?', { resultData: MOCK_RESULT_RESPONSE });
                return;
            }
            const formattedAnswers = formatAnswersForAPI(answers);
            const result = await getTravelTypeResult(formattedAnswers);

            if (result.success) {
                navigation.replace('당신의 여행 유형은?', { resultData: { result: result.data } });
            } else {
                navigation.replace('당신의 여행 유형은?', { resultData: MOCK_RESULT_RESPONSE });
            }
        } catch (error) {
            navigation.replace('당신의 여행 유형은?', { resultData: MOCK_RESULT_RESPONSE });
        }
    };

    return { handleGoCategory };
};