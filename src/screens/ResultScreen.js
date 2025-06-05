import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import Button from '../components/common/Button';
import BackLayer from '../components/common/BackLayer';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import { useResultScreen } from '../hooks/useResultScreen';
import { 
    progressAreaStyles,
    PROGRESS_CONSTANTS
} from '../styles/progressBar';
import ProgressBar from '../components/common/ProgressBar';

const ResultScreen = ({ navigation }) => {
    const { isLoading, handleGoCategory } = useResultScreen();
    const { width, height } = useWindowDimensions();
    const frameWidth = Math.min(width, 500);
    const frameHeight = Math.min(height, 900);

    const airplaneOnlyImg = require('../../assets/airplane-only.svg');

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
                    style={[styles.mobileFrame, { width: frameWidth, minHeight: frameHeight }]}
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
                                onPress={() => handleGoCategory(navigation)}
                                style={styles.button}
                                disabled={isLoading}
                            />
                        </View>
                    </View>
                    
                    {/* 하단 레이어 */}
                    <BackLayer variant="result" />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ResultScreen;
