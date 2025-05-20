import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const MAX_WIDTH = 500;
const { height } = Dimensions.get('window');

const OnboardingScreen = () => {
    const handleAnswer = (answer) => {
        console.log(`선택한 답변: ${answer}`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.mobileFrame}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            여행을 계획할 때 당신의 스타일은?
                        </Text>
                    </View>

                    <View style={styles.answerContainer}>
                        <TouchableOpacity
                            style={styles.answerCard}
                            onPress={() => handleAnswer('미리 치밀하게 계획!')}
                        >
                            <Text style={styles.answerText}>미리 치밀하게 계획!</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.answerCard}
                            onPress={() => handleAnswer('현지에서 느끼는 대로')}
                        >
                            <Text style={styles.answerText}>현지에서 느끼는 대로</Text>
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
