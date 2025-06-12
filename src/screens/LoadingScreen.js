import React from 'react';
import { SafeAreaView, View, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import BackLayer from '../components/common/BackLayer';
import { useLoadingScreen } from '../hooks/useLoadingScreen';

let LottieComponent;
let lottieSource = require('../../assets/airplane.json');

if (Platform.OS === 'web') {
    LottieComponent = require('lottie-react').default;
} else {
    LottieComponent = require('lottie-react-native').default;
}

const LoadingScreen = ({ route, navigation }) => {
    const { myType, partnerType } = route.params;

    useLoadingScreen(myType, partnerType, navigation);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
            <LinearGradient
                colors={['#FFFCD8', '#FFEDA8', '#FFBF70']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.5, 1]}
                style={[styles.mobileFrame, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
            >
                {/* 로딩 영역 */}
                <View style={[styles.loadingContainer, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                    {Platform.OS === 'web' ? (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 20,
                            }}
                        >
                            <LottieComponent
                                animationData={lottieSource}
                                autoPlay
                                loop
                                style={{ width: 200, height: 200, margin: '0 auto', display: 'block', background: 'transparent' }}
                            />
                        </div>
                    ) : (
                        <View style={[styles.lottieContainer, { width: 200, height: 200, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }]}>
                            <LottieComponent
                                source={lottieSource}
                                autoPlay
                                loop
                                style={{ width: 200, height: 200, backgroundColor: 'transparent' }}
                            />
                        </View>
                    )}

                    {/* 로딩 텍스트 */}
                    <Text style={styles.loadingText}>결과 분석 중...</Text>
                </View>

                {/* 하단 레이어 */}
                <BackLayer variant="result" />
            </LinearGradient>
        </SafeAreaView>
    );
};

export default LoadingScreen; 