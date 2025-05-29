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
            
            // 답변이 부족한 경우 처리
            if (Object.keys(answers).length < 12) {
                Alert.alert('오류', '모든 질문에 답변해주세요.');
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
                // 결과 화면으로 이동 (아직 미구현)
                navigation.navigate('당신의 여행 유형은?', { 
                    resultData: result.data 
                });
            } else {
                console.error('API 오류:', result.error);
                Alert.alert('오류', result.error || '서버에서 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('예상치 못한 오류:', error);
            Alert.alert('오류', '네트워크 연결을 확인해주세요.');
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
