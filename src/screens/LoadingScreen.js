import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
                        {/* 임시 로딩 표시 - 나중에 로티로 교체 */}
                        <View style={styles.tempLoadingAnimation}>
                            <Text style={styles.tempLoadingEmoji}>✈️</Text>
                        </View>
                        
                        {/* 로딩 텍스트 */}
                        <Text style={styles.loadingText}>궁합을 분석하고 있어요...</Text>
                        <Text style={styles.loadingSubtext}>
                            {`${myType}과 ${partnerType}의\n완벽한 여행 궁합을 찾고 있어요! ✈️`}
                        </Text>
                    </View>
                </View>

                {/* 하단 레이어 */}
                <BackLayer variant="result" />
            </LinearGradient>
        </SafeAreaView>
    );
};

export default LoadingScreen; 