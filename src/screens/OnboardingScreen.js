import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { questions } from '../constants/questions';
import { COLORS, SIZES } from '../constants/theme';
import { useQuizStore } from '../store/useQuizStore';
import { styles as commonStyles } from '../styles/common';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
    progressStyles,
    progressAreaStyles,
    PROGRESS_CONSTANTS,
    getCalculatedValues
} from '../styles/progressBar';
import { onboardStyles } from '../styles/onboard';

// SVG 이미지 리스트 (질문 번호별)
const questionImages = [
    require('../../assets/q1.svg'),
    require('../../assets/q2.svg'),
    require('../../assets/q3.svg'),
    require('../../assets/q4.svg'),
    require('../../assets/q5.svg'),
    require('../../assets/q6.svg'),
    require('../../assets/q7.svg'),
    require('../../assets/q8.svg'),
    require('../../assets/q9.svg'),
    require('../../assets/q10.svg'),
    require('../../assets/q11.svg'),
    require('../../assets/q12.svg'),
];

const questionSvgs = [
    require('../../assets/question-1.svg'),
    require('../../assets/question-2.svg'),
    require('../../assets/question-3.svg'),
    require('../../assets/question-4.svg'),
    require('../../assets/question-5.svg'),
    require('../../assets/question-6.svg'),
    require('../../assets/question-7.svg'),
    require('../../assets/question-8.svg'),
    require('../../assets/question-9.svg'),
    require('../../assets/question-10.svg'),
    require('../../assets/question-11.svg'),
    require('../../assets/question-12.svg'),
];

const answerAImg = require('../../assets/luggage.svg');
const answerBImg = require('../../assets/luggage-b.svg');
const airplaneImg = require('../../assets/airplane.svg');
const backLayerImg = require('../../assets/back-layer.svg');

// 상단 프로그래스바
const ProgressBar = ({ current, total }) => {
    const { TOTAL_DOT_ROW_WIDTH } = getCalculatedValues();

    return (
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
                <Image source={airplaneImg} style={progressStyles.airplane} resizeMode="contain" />
            </View>
        </View>
    );
};

const OnboardingScreen = () => {
    const navigation = useNavigation();
    const currentIndex = useQuizStore((state) => state.currentIndex);
    const setAnswer = useQuizStore((state) => state.setAnswer);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);
    const prevQuestion = useQuizStore((state) => state.prevQuestion);
    const currentQuestion = questions[currentIndex];

    const handleAnswer = (choice) => {
        setAnswer(currentQuestion.id, choice);
        if (currentIndex + 1 >= questions.length) {
            navigation.navigate('결과 확인하기');
        } else {
            nextQuestion();
        }
    };

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
                    style={commonStyles.mobileFrame}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        {/* 이전 버튼 */}
                        <View style={onboardStyles.topBar}>
                            {currentIndex > 0 && (
                                <TouchableOpacity onPress={prevQuestion} style={onboardStyles.backIconBtn}>
                                    <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
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
                    <Image source={backLayerImg} style={commonStyles.backLayerImg} resizeMode="cover" />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OnboardingScreen;
