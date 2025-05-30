import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';

const MatchingResultScreen = ({ route, navigation }) => {
    const { matchingResult } = route.params;

    // 유형별 이미지 매핑
    const typeImages = {
        '가성비 장인 원숭이': require('../../assets/가성비 장인 원숭이.svg'),
        '감성 도파민러 돼지': require('../../assets/감성 도파민러 돼지.svg'),
        '단톡방 총무 고양이': require('../../assets/단톡방 총무 고양이.svg'),
        '무념무상 힐링러 병아리': require('../../assets/무념무상 힐링러 병아리.svg'),
        '자낳괴 탐험가 코끼리': require('../../assets/자낳괴 탐험가 코끼리.svg'),
        '패키지 러버 토끼': require('../../assets/패키지 러버 토끼.svg'),
        '계획충 쉴러 곰': require('../../assets/계획충 쉴러 곰.svg'),
        '온도차 낭만파 강아지': require('../../assets/온도차 낭만파 강아지.svg'),
    };

    const backLayerImg = require('../../assets/back-layer.svg');

    const handleGoHome = () => {
        navigation.navigate('우당탕탕 여행 성향');
    };

    const handleShare = () => {
        // 공유하기 로직 (나중에 구현)
        console.log('공유하기');
    };

    const handleCopyLink = () => {
        // 링크 복사 로직 (나중에 구현)
        console.log('링크 복사');
    };

    // 궁합도에 따른 색상 결정
    const getCompatibilityColor = (score) => {
        if (score >= 80) return '#4CAF50'; // 초록색
        if (score >= 60) return '#FF9800'; // 주황색
        return '#F44336'; // 빨간색
    };

    // 궁합도에 따른 메시지
    const getCompatibilityMessage = (score) => {
        if (score >= 80) return '환상의 궁합! 🎉';
        if (score >= 60) return '좋은 궁합이에요! 👍';
        return '서로 다른 매력이 있어요! 💫';
    };

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
                    style={[styles.mobileFrame, { paddingHorizontal: 20 }]}
                >
                    {/* 헤더 */}
                    <View style={resultStyles.header}>
                        <Text style={resultStyles.headerTitle}>💕 여행 궁합 결과 💕</Text>
                    </View>

                    {/* 선택된 유형들 */}
                    <View style={resultStyles.typesContainer}>
                        <View style={resultStyles.typeItem}>
                            <Image
                                source={typeImages[matchingResult.myType]}
                                style={resultStyles.typeImage}
                                resizeMode="contain"
                            />
                            <Text style={resultStyles.typeName}>{matchingResult.myType}</Text>
                        </View>
                        <Text style={resultStyles.heartIcon}>❤️</Text>
                        <View style={resultStyles.typeItem}>
                            <Image
                                source={typeImages[matchingResult.partnerType]}
                                style={resultStyles.typeImage}
                                resizeMode="contain"
                            />
                            <Text style={resultStyles.typeName}>{matchingResult.partnerType}</Text>
                        </View>
                    </View>

                    {/* 궁합도 */}
                    <View style={resultStyles.compatibilityContainer}>
                        <Text style={resultStyles.compatibilityTitle}>
                            {getCompatibilityMessage(matchingResult.compatibility)}
                        </Text>
                        <View style={resultStyles.scoreContainer}>
                            <Text style={[
                                resultStyles.compatibilityScore,
                                { color: getCompatibilityColor(matchingResult.compatibility) }
                            ]}>
                                {matchingResult.compatibility}%
                            </Text>
                        </View>
                    </View>

                    {/* 궁합 설명 */}
                    <View style={resultStyles.sectionContainer}>
                        <Text style={resultStyles.sectionTitle}>
                            ✨ 궁합 분석
                        </Text>
                        <Text style={resultStyles.descriptionText}>
                            {matchingResult.description}
                        </Text>
                    </View>

                    {/* 장점 */}
                    <View style={resultStyles.sectionContainer}>
                        <Text style={resultStyles.sectionTitle}>
                            👍 이런 점이 좋아요
                        </Text>
                        {Array.isArray(matchingResult.pros) && matchingResult.pros.length > 0 ? (
                            matchingResult.pros.map((pro, index) => (
                                <Text key={index} style={resultStyles.listItem}>
                                    • {pro}
                                </Text>
                            ))
                        ) : (
                            <Text style={resultStyles.descriptionText}>
                                {matchingResult.pros || "서로의 장점을 발견해보세요!"}
                            </Text>
                        )}
                    </View>

                    {/* 주의점 */}
                    <View style={resultStyles.sectionContainer}>
                        <Text style={resultStyles.sectionTitle}>
                            💡 이런 점을 주의해요
                        </Text>
                        {Array.isArray(matchingResult.cons) && matchingResult.cons.length > 0 ? (
                            matchingResult.cons.map((con, index) => (
                                <Text key={index} style={resultStyles.listItem}>
                                    • {con}
                                </Text>
                            ))
                        ) : (
                            <Text style={resultStyles.descriptionText}>
                                {matchingResult.cons || "서로를 이해하며 여행해보세요!"}
                            </Text>
                        )}
                    </View>

                    {/* 추천 여행지 */}
                    <View style={resultStyles.sectionContainer}>
                        <Text style={resultStyles.sectionTitle}>
                            🏝️ 추천 여행지
                        </Text>
                        <Text style={resultStyles.descriptionText}>
                            {matchingResult.recommendation}
                        </Text>
                    </View>

                    {/* 버튼들 */}
                    <View style={[styles.buttonContainer, { zIndex: 10 }]}>
                        <Button
                            title="테스트 다시하기"
                            onPress={handleGoHome}
                            type="primary"
                        />

                        {/* 공유 버튼들 */}
                        <View style={styles.shareButtonContainer}>
                            <TouchableOpacity
                                onPress={handleCopyLink}
                                style={styles.shareButton}
                            >
                                <Text style={{ fontSize: 20 }}>🔗</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleShare}
                                style={styles.shareButton}
                            >
                                <Text style={{ fontSize: 20 }}>💬</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 하단 레이어 */}
                    <Image source={backLayerImg} style={[styles.resultBackLayerImg, { zIndex: -1 }]} resizeMode="cover" />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

const resultStyles = {
    header: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    headerTitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6E3209',
    },
    typesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    typeItem: {
        alignItems: 'center',
    },
    typeImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    typeName: {
        fontFamily: 'NanumSquareRound',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6E3209',
        textAlign: 'center',
    },
    heartIcon: {
        fontSize: 30,
        marginHorizontal: 10,
    },
    compatibilityContainer: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    compatibilityTitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6E3209',
        marginBottom: 10,
    },
    scoreContainer: {
        alignItems: 'center',
    },
    compatibilityScore: {
        fontFamily: 'NanumSquareRound',
        fontSize: 48,
        fontWeight: 'bold',
    },
    sectionContainer: {
        marginBottom: 20,
        width: '100%',
    },
    sectionTitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6E3209',
        marginBottom: 10,
        textAlign: 'left',
    },
    descriptionText: {
        fontFamily: 'NanumSquareRound',
        fontSize: 14,
        color: '#6E3209',
        lineHeight: 20,
        textAlign: 'left',
    },
    listItem: {
        fontFamily: 'NanumSquareRound',
        fontSize: 14,
        color: '#6E3209',
        lineHeight: 20,
        textAlign: 'left',
        marginBottom: 5,
    },
};

export default MatchingResultScreen; 