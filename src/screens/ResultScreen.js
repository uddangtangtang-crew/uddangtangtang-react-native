import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View, Alert } from 'react-native';
import Button from '../components/common/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import { useQuizStore } from '../store/useQuizStore';
import { getTravelTypeResult } from '../services/api';
import { formatAnswersForAPI } from '../utils/answerFormatter';
import { 
    progressStyles, 
    progressAreaStyles,
    PROGRESS_CONSTANTS,
    getCalculatedValues 
} from '../styles/progressBar';

const ResultScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const backLayerImg = require('../../assets/back-layer.svg');
    const airplaneOnlyImg = require('../../assets/airplane-only.svg');
    const airplaneImg = require('../../assets/airplane.svg');
    
    // 퀴즈 상태 가져오기
    const answers = useQuizStore((state) => state.answers);
    const { TOTAL_DOT_ROW_WIDTH } = getCalculatedValues();
    
    const handleGoCategory = async () => {
        setIsLoading(true);
        
        try {
            // 현재 저장된 답변 확인
            console.log('현재 저장된 답변:', answers);
            console.log('답변 개수:', Object.keys(answers).length);
            
            // 개발 테스트용: 답변이 부족해도 CategoryScreen으로 이동
            if (Object.keys(answers).length < 12) {
                console.log('테스트용: 답변 부족하지만 CategoryScreen으로 이동');
                // 테스트용 Mock 데이터로 이동
                const mockApiResponse = {
                    isSuccess: true,
                    code: "COMMON200",
                    message: "성공입니다.",
                    result: {
                        code: "B-A-A-B",
                        reason: "사용자는 여행 계획을 유연하게 세우며, 내향적 성향이 강하고, 소비에서는 실속을 중시하는 경향이 있습니다.",
                        keyword: "#유연한 여행 #내향적 휴식 #실속파 #힐링과 자극 둘 다",
                        image: null,
                        description: "당신은 즉흥적인 감정과 직관에 따라 여행하는 타입입니다.",
                        typeName: "자낳괴 탐험가",
                        tripRecommand: "국내: 제주 협재 해변 – 감성 카페, 사진 명소 넘치는 뷰 성지"
                    }
                };
                
                navigation.navigate('당신의 여행 유형은?', { 
                    resultData: mockApiResponse 
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
                    resultData: result.data 
                });
            } else {
                console.error('API 오류:', result.error);
                // 테스트용: API 실패해도 CategoryScreen으로 이동
                console.log('테스트용: API 실패했지만 CategoryScreen으로 이동');
                const mockApiResponse = {
                    isSuccess: true,
                    code: "COMMON200", 
                    message: "성공입니다.",
                    result: {
                        code: "B-A-A-B",
                        reason: "API 호출이 실패했지만 테스트용 데이터로 표시됩니다.",
                        keyword: "#테스트 #개발용 #Mock데이터",
                        image: null,
                        description: "이것은 테스트용 데이터입니다. API 연동 후 실제 데이터로 교체됩니다.",
                        typeName: "테스트 탐험가",
                        tripRecommand: "테스트용 여행지 추천입니다."
                    }
                };
                
                navigation.navigate('당신의 여행 유형은?', { 
                    resultData: mockApiResponse 
                });
            }
        } catch (error) {
            console.error('예상치 못한 오류:', error);
            // 테스트용: 네트워크 오류여도 CategoryScreen으로 이동
            console.log('테스트용: 네트워크 오류했지만 CategoryScreen으로 이동');
            const mockApiResponse = {
                isSuccess: true,
                code: "COMMON200",
                message: "성공입니다.",
                result: {
                    code: "B-A-A-B",
                    reason: "네트워크 오류가 발생했지만 테스트용 데이터로 표시됩니다.",
                    keyword: "#네트워크오류 #테스트용",
                    image: null,
                    description: "네트워크 연결에 문제가 있어 테스트 데이터를 표시합니다.",
                    typeName: "오류 탐험가",
                    tripRecommand: "네트워크가 복구되면 실제 추천을 받을 수 있습니다."
                }
            };
            
            navigation.navigate('당신의 여행 유형은?', { 
                resultData: mockApiResponse 
            });
        } finally {
            setIsLoading(false);
        }
    };

    // 상단 프로그래스바 컴포넌트
    const ProgressBar = ({ current, total }) => (
        <View style={progressStyles.container}>
            <View style={[progressStyles.dotRow, { width: TOTAL_DOT_ROW_WIDTH }]}>
                {Array.from({ length: current }).map((_, idx) => (
                    <View
                        key={idx}
                        style={[
                            progressStyles.dot,
                            progressStyles.active,
                        ]}
                    />
                ))}
                <Image source={airplaneImg} style={progressStyles.airplane} />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <LinearGradient
                    colors={['#FFFCD8', '#FFEDA8', '#FFBF70']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    locations={[0, 0.5, 1]}
                    style={styles.mobileFrame}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        {/* 상단 프로그래스바 */}
                        <View style={progressAreaStyles.progressBarArea}>
                            <ProgressBar current={PROGRESS_CONSTANTS.TOTAL_QUESTIONS} total={PROGRESS_CONSTANTS.TOTAL_QUESTIONS} />
                        </View>
                        {/* 질문 카운트(12/12) */}
                        <View style={progressAreaStyles.counterArea}>
                            <Text style={progressAreaStyles.progressText}>{PROGRESS_CONSTANTS.TOTAL_QUESTIONS}/{PROGRESS_CONSTANTS.TOTAL_QUESTIONS}</Text>
                        </View>

                        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                            {/* 결과 이미지 */}
                            <Image
                                source={airplaneOnlyImg}
                                style={styles.resultImage}
                                resizeMode="contain"
                            />
                            
                            {/* 버튼 */}
                            <Button
                                title={isLoading ? "결과 분석 중..." : "결과 확인하기"}
                                onPress={handleGoCategory}
                                style={styles.button}
                                disabled={isLoading}
                            />
                        </View>
                    </View>
                    
                    {/* 하단 레이어 */}
                    <Image source={backLayerImg} style={styles.resultBackLayerImg} />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ResultScreen;
