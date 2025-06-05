import { useState, useEffect } from 'react';
import { getTestCount } from '../services/api';
import { useQuizStore } from '../store/useQuizStore';

// HomeScreen의 상태와 로직을 관리하는 커스텀 훅
export const useHomeScreen = () => {
    const [participantCount, setParticipantCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchParticipantCount();
    }, []);

    const fetchParticipantCount = async () => {
        try {
            setIsLoading(true);
            const response = await getTestCount();
            
            if (response.success && typeof response.data.result === 'number') {
                setParticipantCount(response.data.result);
                console.log('✅ 참여자 수 업데이트:', response.data.result);
            } else {
                console.warn('⚠️ API 호출 실패:', response);
                setParticipantCount(0);
            }
        } catch (error) {
            console.error('❌ 참여자 수 가져오기 실패:', error);
            setParticipantCount(0); // 에러 시 기본값
        } finally {
            setIsLoading(false);
        }
    };

    // 네비게이션 핸들러들
    const handleStartTest = (navigation) => {
        useQuizStore.getState().resetQuiz(); // 퀴즈 상태 초기화
        navigation.navigate('여행 성향 테스트 알아보기');
    };

    const handleCheckCompatibility = (navigation) => {
        navigation.navigate('여행 궁합 알아보기');
    };

    // 참여자 수 텍스트 동적 생성
    const getJoinedUsersText = () => {
        if (isLoading) {
            return `👀\n지금까지\n로딩중... 명이 참여했어요!`;
        }
        
        // 숫자를 3자리마다 콤마 추가
        const formattedCount = participantCount.toLocaleString();
        return `👀\n지금까지\n${formattedCount} 명이 참여했어요!`;
    };

    return {
        participantCount,
        isLoading,
        handleStartTest,
        handleCheckCompatibility,
        getJoinedUsersText,
        fetchParticipantCount // 필요시 수동 새로고침용
    };
}; 