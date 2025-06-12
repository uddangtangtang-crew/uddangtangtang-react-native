import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    useWindowDimensions,
    Platform,
} from 'react-native';
import { COLORS} from '../constants/theme';
import { styles as commonStyles } from '../styles/common';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
    progressAreaStyles,
    PROGRESS_CONSTANTS
} from '../styles/progressBar';
import { onboardStyles } from '../styles/onboard';
import { useOnboardingScreen } from '../hooks/useOnboardingScreen';
import ProgressBar from '../components/common/ProgressBar';
import BackLayer from '../components/common/BackLayer';

const answerAImg = require('../../assets/luggage.svg');
const answerBImg = require('../../assets/luggage-b.svg');

// 모바일 웹 감지 함수
function isMobileWeb() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
}

const OnboardingScreen = () => {
    const {
        currentIndex,
        currentQuestion,
        questionImages,
        questionSvgs,
        handleAnswer,
        prevQuestion
    } = useOnboardingScreen();

    const { width, height } = useWindowDimensions();
    const frameWidth = Math.min(width, 500);
    const frameHeight = Math.min(height, 900);

    return (
        <SafeAreaView style={[commonStyles.safeArea, { backgroundColor: COLORS.background }]}>
            <ScrollView
                style={commonStyles.scrollView}
                contentContainerStyle={commonStyles.scrollContent}
            >
                <LinearGradient
                    colors={['#FFFCD8', '#FFEDA8', '#FFBF70']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    locations={[0, 0.5, 1]}
                    style={[commonStyles.mobileFrame, { width: frameWidth, minHeight: frameHeight }]}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        {/* 이전 버튼 */}
                        <View style={onboardStyles.topBar}>
                            {currentIndex > 0 && (
                                <TouchableOpacity 
                                    onPress={prevQuestion} 
                                    style={
                                      Platform.OS === 'web'
                                        ? (isMobileWeb() ? onboardStyles.backIconBtnMobile : onboardStyles.backIconBtn)
                                        : onboardStyles.backIconBtnMobile
                                    }
                                >
                                    <Ionicons name="chevron-back" size={36} color={COLORS.primary} />
                                </TouchableOpacity>
                            )}
                        </View>
                        {/* 상단 프로그래스바 */}
                        <View style={progressAreaStyles.progressBarArea}>
                            <ProgressBar current={currentIndex + 1} total={PROGRESS_CONSTANTS.TOTAL_QUESTIONS} />
                        </View>
                        
                        {/* 질문 카운트(1/12) - 하단 중앙 */}
                        <View style={progressAreaStyles.counterArea}>
                            <Text style={progressAreaStyles.progressText}>{currentIndex + 1}/{PROGRESS_CONSTANTS.TOTAL_QUESTIONS}</Text>
                        </View>

                        {/* 질문 SVG (Q1~Q12) */}
                        <Image source={questionSvgs[currentIndex]} style={onboardStyles.qustionImage} resizeMode="contain" />

                        {/* 질문 텍스트 */}
                        <Text style={[commonStyles.subtitle, onboardStyles.questionText]}>{currentQuestion.question}</Text>

                        {/* 질문 묘사 SVG (Q1~Q12) */}
                        <Image source={questionImages[currentIndex]} style={onboardStyles.qImage} resizeMode="contain" />

                        {/* 답변 영역 */}
                        <View style={onboardStyles.answerRow}>
                            <TouchableOpacity style={onboardStyles.answerBtn} onPress={() => handleAnswer('A')}>
                                <Image source={answerAImg} style={onboardStyles.answerImg} resizeMode="contain" />
                                <View style={[onboardStyles.answerTextWrap, { alignItems: 'center' }]}>
                                    {currentQuestion.options.A.split('\n').map((line, idx) =>
                                        line === ''
                                            ? <Text key={idx}>{' '}</Text>
                                            : (
                                                <Text
                                                    key={idx}
                                                    style={idx === 0 ? onboardStyles.answerTextFirst : onboardStyles.answerTextRest}
                                                >
                                                    {line}
                                                </Text>
                                            )
                                    )}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={onboardStyles.answerBtn} onPress={() => handleAnswer('B')}>
                                <Image source={answerBImg} style={onboardStyles.answerImg} resizeMode="contain" />
                                <View style={[onboardStyles.answerTextWrap, { alignItems: 'center' }]}>
                                    {currentQuestion.options.B.split('\n').map((line, idx) =>
                                        line === ''
                                            ? <Text key={idx}>{' '}</Text>
                                            : (
                                                <Text
                                                    key={idx}
                                                    style={idx === 0 ? onboardStyles.answerTextFirst : onboardStyles.answerTextRest}
                                                >
                                                    {line}
                                                </Text>
                                            )
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <BackLayer variant="onboard" />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OnboardingScreen;
