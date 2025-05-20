import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { questions } from '../constants/questions';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { useQuizStore } from '../store/useQuizStore';


const MAX_WIDTH = 500;
const { height } = Dimensions.get('window');

const OnboardingScreen = () => {
    const navigation = useNavigation();

    const currentIndex = useQuizStore((state) => state.currentIndex);
    const setAnswer = useQuizStore((state) => state.setAnswer);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (choice) => {
        setAnswer(currentQuestion.id, choice);

        if (currentIndex + 1 >= questions.length) {
            navigation.navigate('Result'); // 모든 질문이 끝나면 결과 화면으로 이동
        } else {
            nextQuestion();
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.mobileFrame}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>{currentQuestion.question}</Text>
                    </View>

                    <View style={styles.answerContainer}>
                        <TouchableOpacity
                            style={styles.answerCard}
                            onPress={() => handleAnswer('A')}
                        >
                            <Text style={styles.answerText}>{currentQuestion.options.A}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.answerCard}
                            onPress={() => handleAnswer('B')}
                        >
                            <Text style={styles.answerText}>{currentQuestion.options.B}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    mobileFrame: {
        width: MAX_WIDTH,
        minHeight: height,
        backgroundColor: COLORS.card,
        paddingHorizontal: SIZES.large,
        paddingTop: SIZES.large,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    questionContainer: {
        marginBottom: SIZES.large,
        paddingHorizontal: SIZES.large,
    },
    questionText: {
        fontSize: SIZES.xlarge,
        color: COLORS.primary,
        ...FONTS.bold,
        textAlign: 'center',
    },
    answerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SIZES.base,
        marginTop: SIZES.large,
    },
    answerCard: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    answerText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        ...FONTS.medium,
        textAlign: 'center',
    },
});

export default OnboardingScreen;
