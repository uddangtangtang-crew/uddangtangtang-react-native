import React from 'react';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import LoadingIndicator from '../components/common/LoadingIndicator';
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
                style={[styles.mobileFrame, { paddingHorizontal: 20 }]}
            >
                <LoadingIndicator
                    title="궁합을 분석하고 있어요..."
                    subtitle={`${myType}과 ${partnerType}의\n완벽한 여행 궁합을 찾고 있어요! ✈️`}
                />

                {/* 하단 레이어 */}
                <BackLayer variant="result" style={{ zIndex: -1 }} />
            </LinearGradient>
        </SafeAreaView>
    );
};

export default LoadingScreen; 