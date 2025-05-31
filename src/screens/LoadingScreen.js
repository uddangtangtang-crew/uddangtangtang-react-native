import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import BackLayer from '../components/common/BackLayer';
import { useLoadingScreen } from '../hooks/useLoadingScreen';

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
                style={styles.mobileFrame}
            >
                {/* 로딩 영역 */}
                <View style={styles.loadingContainer}>
                    <View style={styles.lottieContainer}>
                        {/* 로티 애니메이션 */}
                        <div style={{ width: 200, height: 200, marginBottom: 20 }}>
                            <DotLottieReact
                                src="/assets/airplane_loading.lottie"
                                loop
                                autoplay
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                        
                        {/* 로딩 텍스트 */}
                        <Text style={styles.loadingText}>결과 분석 중...</Text>
                    </View>
                </View>

                {/* 하단 레이어 */}
                <BackLayer variant="result" />
            </LinearGradient>
        </SafeAreaView>
    );
};

export default LoadingScreen; 