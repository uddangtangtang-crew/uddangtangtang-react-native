import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import Button from '../components/common/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import { useQuizStore } from '../store/useQuizStore';

const ResultScreen = ({ navigation }) => {
    const backLayerImg = require('../../assets/back-layer.svg');
    const airplaneOnlyImg = require('../../assets/airplane-only.svg');
    const airplaneImg = require('../../assets/airplane.svg');
    
    // 퀴즈 상태 가져오기 (12/12 완료 상태)
    const currentIndex = useQuizStore((state) => state.currentIndex);
    const totalQuestions = 12;
    
    const handleGoCategory = () => {
        navigation.navigate('당신의 여행 유형은?');
    };

    // dot 크기/간격/비행기 크기 조정 (온보딩과 동일)
    const DOT_WIDTH = 30;
    const DOT_HEIGHT = 8;
    const DOT_RADIUS = 40;
    const DOT_MARGIN = 8;
    const AIRPLANE_SIZE = 40;
    const TOTAL_DOT_ROW_WIDTH = (DOT_WIDTH + DOT_MARGIN) * totalQuestions + AIRPLANE_SIZE;

    // 상단 프로그래스바 (온보딩과 동일)
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
                        <View style={localStyles.progressBarArea}>
                            <ProgressBar current={totalQuestions} total={totalQuestions} />
                        </View>
                        {/* 질문 카운트(12/12) */}
                        <View style={localStyles.counterArea}>
                            <Text style={localStyles.progressText}>{totalQuestions}/{totalQuestions}</Text>
                        </View>

                        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center', flex: 1 }]}>
                            {/* 결과 이미지 */}
                            <Image
                                source={airplaneOnlyImg}
                                style={localStyles.resultImage}
                                resizeMode="contain"
                            />
                            
                            {/* 버튼 */}
                            <Button
                                title="결과 확인하기"
                                onPress={handleGoCategory}
                                style={localStyles.button}
                            />
                        </View>
                    </View>
                    
                    {/* 하단 레이어 */}
                    <Image source={backLayerImg} style={localStyles.backLayerImg} />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

// 프로그래스바 스타일 (온보딩과 동일)
const progressStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
        alignSelf: 'flex-start',
    },
    dotRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 4,
    },
    dot: {
        width: 30,
        height: 8,
        borderRadius: 40,
        marginRight: 8,
    },
    active: {
        backgroundColor: '#95B55E',
    },
    airplane: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
});

const localStyles = {
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
    resultImage: {
        width: 200,
        height: 200,
        marginBottom: -20,
    },
    button: {
        marginTop: 0,
        marginBottom: 200
    },
    backLayerImg: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: 100,
        opacity: 0.65,
        resizeMode: 'cover',
        zIndex: 0,
    },
};

export default ResultScreen;
