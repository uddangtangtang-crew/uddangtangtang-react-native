import React, { useEffect } from 'react';
import { Image, SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import { getCompatibilityResult } from '../services/api';

const LoadingScreen = ({ route, navigation }) => {
    const { myType, partnerType } = route.params;

    useEffect(() => {
        const fetchCompatibilityResult = async () => {
            try {
                const response = await getCompatibilityResult(myType, partnerType);
                
                if (response.success) {
                    // API 응답을 화면에서 사용할 형태로 변환
                    const apiResult = response.data.result;
                    const matchingResult = {
                        myType,
                        partnerType,
                        compatibility: calculateCompatibilityScore(apiResult.result), // 결과 텍스트를 기반으로 점수 계산
                        description: apiResult.result,
                        pros: apiResult.tips ? apiResult.tips.split('\n').filter(tip => tip.trim()) : [],
                        cons: apiResult.conflictPoints ? apiResult.conflictPoints.split('\n').filter(point => point.trim()) : [],
                        recommendation: apiResult.recommendations ? apiResult.recommendations.join('\n') : ''
                    };

                    navigation.navigate('MatchingResultScreen', {
                        matchingResult: matchingResult
                    });
                } else {
                    // API 호출 실패 시 에러 처리 또는 Mock 데이터 사용
                    console.error('궁합 API 호출 실패:', response.message);
                    
                    // 실패 시 Mock 데이터로 대체
                    const mockMatchingResult = {
                        myType,
                        partnerType,
                        compatibility: 85,
                        description: "당신들은 서로 다른 매력을 가진 완벽한 조합입니다! 한 명은 계획적이고 다른 한 명은 자유로워서 여행에서 균형을 이룰 수 있어요.",
                        pros: [
                            "서로 다른 관점으로 더 풍부한 여행 경험",
                            "계획과 즉흥의 완벽한 밸런스",
                            "새로운 것을 배우며 성장하는 관계"
                        ],
                        cons: [
                            "때로는 의견 충돌이 있을 수 있어요",
                            "서로의 페이스에 맞춰주는 노력이 필요해요"
                        ],
                        recommendation: "제주도 자유여행을 추천해요! 기본 숙소와 렌터카만 예약하고 나머지는 현지에서 즉흥적으로 정해보세요."
                    };

                    navigation.navigate('MatchingResultScreen', {
                        matchingResult: mockMatchingResult
                    });
                }
            } catch (error) {
                console.error('궁합 분석 중 오류 발생:', error);
                
                // 오류 발생 시 Mock 데이터로 대체
                const mockMatchingResult = {
                    myType,
                    partnerType,
                    compatibility: 85,
                    description: "당신들은 서로 다른 매력을 가진 완벽한 조합입니다! 한 명은 계획적이고 다른 한 명은 자유로워서 여행에서 균형을 이룰 수 있어요.",
                    pros: [
                        "서로 다른 관점으로 더 풍부한 여행 경험",
                        "계획과 즉흥의 완벽한 밸런스",
                        "새로운 것을 배우며 성장하는 관계"
                    ],
                    cons: [
                        "때로는 의견 충돌이 있을 수 있어요",
                        "서로의 페이스에 맞춰주는 노력이 필요해요"
                    ],
                    recommendation: "제주도 자유여행을 추천해요! 기본 숙소와 렌터카만 예약하고 나머지는 현지에서 즉흥적으로 정해보세요."
                };

                navigation.navigate('MatchingResultScreen', {
                    matchingResult: mockMatchingResult
                });
            }
        };

        // 최소 2초는 로딩 화면을 보여주기 위해 타이머 사용
        const timer = setTimeout(() => {
            fetchCompatibilityResult();
        }, 2000);

        return () => clearTimeout(timer);
    }, [myType, partnerType, navigation]);

    // 결과 텍스트를 기반으로 궁합도 점수를 계산하는 함수
    const calculateCompatibilityScore = (resultText) => {
        if (!resultText) return 70;
        
        const text = resultText.toLowerCase();
        
        // 긍정적인 키워드들
        const positiveKeywords = ['완벽', '환상', '최고', '훌륭', '좋은', '멋진', '이상적'];
        // 부정적인 키워드들
        const negativeKeywords = ['어려운', '힘든', '주의', '조심', '갈등', '충돌'];
        
        let score = 70; // 기본 점수
        
        positiveKeywords.forEach(keyword => {
            if (text.includes(keyword)) score += 5;
        });
        
        negativeKeywords.forEach(keyword => {
            if (text.includes(keyword)) score -= 5;
        });
        
        // 점수를 50-95 범위로 제한
        return Math.max(50, Math.min(95, score));
    };

    const backLayerImg = require('../../assets/back-layer.svg');

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
            <LinearGradient
                colors={['#FFFCD8', '#FFEDA8', '#FFBF70']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.5, 1]}
                style={[styles.mobileFrame, { paddingHorizontal: 20 }]}
            >
                <View style={loadingStyles.container}>
                    {/* 로딩 애니메이션 */}
                    <View style={loadingStyles.loadingContainer}>
                        <Image
                            source={require('../../assets/airplane-cute.svg')}
                            style={loadingStyles.airplaneImage}
                            resizeMode="contain"
                        />
                        <ActivityIndicator 
                            size="large" 
                            color="#CC6548" 
                            style={loadingStyles.spinner}
                        />
                    </View>

                    {/* 로딩 텍스트 */}
                    <View style={loadingStyles.textContainer}>
                        <Text style={loadingStyles.loadingTitle}>
                            궁합을 분석하고 있어요...
                        </Text>
                        <Text style={loadingStyles.loadingSubtitle}>
                            {myType}과 {partnerType}의{'\n'}
                            완벽한 여행 궁합을 찾고 있어요! ✈️
                        </Text>
                    </View>
                </View>

                {/* 하단 레이어 */}
                <Image source={backLayerImg} style={[styles.resultBackLayerImg, { zIndex: -1 }]} resizeMode="cover" />
            </LinearGradient>
        </SafeAreaView>
    );
};

const loadingStyles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    loadingContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    airplaneImage: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    spinner: {
        marginTop: 10,
    },
    textContainer: {
        alignItems: 'center',
    },
    loadingTitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6E3209',
        textAlign: 'center',
        marginBottom: 15,
    },
    loadingSubtitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 16,
        color: '#6E3209',
        textAlign: 'center',
        lineHeight: 24,
    },
};

export default LoadingScreen; 