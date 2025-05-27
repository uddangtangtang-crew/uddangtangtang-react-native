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

const answerAImg = require('../../assets/answer-a.svg');
const answerBImg = require('../../assets/answer-b.svg');
const airplaneImg = require('../../assets/airplane.svg');

// 상단 프로그래스바
const ProgressBar = ({ current, total }) => (
    <View style={progressStyles.container}>
        <View style={progressStyles.dotRow}>
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

const OnboardingScreen = () => {
    const navigation = useNavigation();
    const currentIndex = useQuizStore((state) => state.currentIndex);
    const setAnswer = useQuizStore((state) => state.setAnswer);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);
    const currentQuestion = questions[currentIndex];

    const handleAnswer = (choice) => {
        setAnswer(currentQuestion.id, choice);
        if (currentIndex + 1 >= questions.length) {
            navigation.navigate('Result');
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
                        {/* 상단 프로그래스바 */}
                        <View style={localStyles.progressBarArea}>
                            <ProgressBar current={currentIndex + 1} total={questions.length} />
                        </View>
                        {/* 질문 카운트(1/12) - 하단 중앙 */}
                        <View style={localStyles.counterArea}>
                            <Text style={localStyles.progressText}>{currentIndex + 1}/{questions.length}</Text>
                        </View>

                        {/* 질문 SVG (Q1~Q12) */}
                        <Image source={questionSvgs[currentIndex]} style={localStyles.qustionImage} />

                        {/* 질문 텍스트 */}
                        <Text style={[commonStyles.subtitle, localStyles.questionText]}>{currentQuestion.question}</Text>

                        {/* 질문 묘사 SVG (Q1~Q12) */}
                        <Image source={questionImages[currentIndex]} style={localStyles.qImage} />

                        {/* 답변 영역 */}
                        <View style={localStyles.answerRow}>
                            <TouchableOpacity style={localStyles.answerBtn} onPress={() => handleAnswer('A')}>
                                <Image source={answerAImg} style={localStyles.answerImg} />
                                <View style={localStyles.answerTextWrap}>
                                    <Text style={localStyles.answerText}>{currentQuestion.options.A}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={localStyles.answerBtn} onPress={() => handleAnswer('B')}>
                                <Image source={answerBImg} style={localStyles.answerImg} />
                                <View style={localStyles.answerTextWrap}>
                                    <Text style={localStyles.answerText}>{currentQuestion.options.B}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

// dot 크기/간격/비행기 크기 조정
const DOT_WIDTH = 30;
const DOT_HEIGHT = 8;
const DOT_RADIUS = 40;
const DOT_MARGIN = 8;
const AIRPLANE_SIZE = 40;

const progressStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
        alignSelf: 'flex-start',
        paddingLeft: 8,
    },
    dotRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: DOT_WIDTH,
        height: DOT_HEIGHT,
        borderRadius: DOT_RADIUS,
        marginRight: DOT_MARGIN,
    },
    active: {
        backgroundColor: '#95B55E',
    },
    airplane: {
        width: AIRPLANE_SIZE,
        height: AIRPLANE_SIZE,
        resizeMode: 'contain',
        marginLeft: 4,
    },
});

const localStyles = StyleSheet.create({
    progressBarArea: {
        alignItems: 'flex-start',
        width: '100%',
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    counterArea: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 28,
    },
    progressText: {
        color: '#95B55E',
        fontWeight: '600',
        fontSize: 14,
    },
    qImage: {
        width: 135,
        height: 135,
        alignSelf: 'center',
        marginBottom: 36,
        resizeMode: 'contain',
    },
    qustionImage: {
        width: 54,
        height: 72,
        alignSelf: 'center',
        marginBottom: 16,
        resizeMode: 'contain',
    },
    questionText: {
        textAlign: 'center',
        marginBottom: 24,
    },
    answerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginHorizontal: 16,
        marginTop: 8,
        gap: 16,
    },
    answerBtn: {
        flex: 1,
        alignItems: 'center',
    },
    answerImg: {
        width: 150,
        height: 240,
        marginHorizontal: 8,
        resizeMode: 'contain',
    },
    answerTextWrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    answerText: {
        color: COLORS.primary,
        fontWeight: '500',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default OnboardingScreen;
