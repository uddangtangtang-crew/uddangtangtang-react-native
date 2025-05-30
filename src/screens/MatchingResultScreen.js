import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';
import ShareButtons from '../components/common/ShareButtons';
import SectionContainer from '../components/common/SectionContainer';
import BackLayer from '../components/common/BackLayer';
import { useMatchingResultScreen } from '../hooks/useMatchingResultScreen';

const MatchingResultScreen = ({ route, navigation }) => {
    const { matchingResult } = route.params;
    
    const {
        typeImages,
        getCompatibilityColor,
        getCompatibilityMessage,
        handleGoHome,
        handleShare,
        handleCopyLink
    } = useMatchingResultScreen(matchingResult);

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
                    <SectionContainer title="✨ 궁합 분석">
                        <Text style={styles.descriptionText}>
                            {matchingResult.description}
                        </Text>
                    </SectionContainer>

                    {/* 장점 */}
                    <SectionContainer title="👍 이런 점이 좋아요">
                        {Array.isArray(matchingResult.pros) && matchingResult.pros.length > 0 ? (
                            matchingResult.pros.map((pro, index) => (
                                <Text key={index} style={resultStyles.listItem}>
                                    • {pro}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.descriptionText}>
                                {matchingResult.pros || "서로의 장점을 발견해보세요!"}
                            </Text>
                        )}
                    </SectionContainer>

                    {/* 주의점 */}
                    <SectionContainer title="💡 이런 점을 주의해요">
                        {Array.isArray(matchingResult.cons) && matchingResult.cons.length > 0 ? (
                            matchingResult.cons.map((con, index) => (
                                <Text key={index} style={resultStyles.listItem}>
                                    • {con}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.descriptionText}>
                                {matchingResult.cons || "서로를 이해하며 여행해보세요!"}
                            </Text>
                        )}
                    </SectionContainer>

                    {/* 추천 여행지 */}
                    <SectionContainer title="🏝️ 추천 여행지">
                        <Text style={styles.descriptionText}>
                            {matchingResult.recommendation}
                        </Text>
                    </SectionContainer>

                    {/* 버튼들 */}
                    <View style={[styles.buttonContainer, { zIndex: 10 }]}>
                        <Button
                            title="테스트 다시하기"
                            onPress={() => handleGoHome(navigation)}
                            type="primary"
                        />

                        {/* 공유 버튼들 */}
                        <ShareButtons 
                            onShare={handleShare}
                            onCopyLink={handleCopyLink}
                        />
                    </View>

                    {/* 하단 레이어 */}
                    <BackLayer variant="result" style={{ zIndex: -1 }} />
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