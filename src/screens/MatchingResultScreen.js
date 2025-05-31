import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { matchingStyles } from '../styles/matchingStyles';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';
import ShareButtons from '../components/common/ShareButtons';
import SectionContainer from '../components/common/SectionContainer';
import BackLayer from '../components/common/BackLayer';
import { useMatchingResultScreen } from '../hooks/useMatchingResultScreen';

const MatchingResultScreen = ({ route, navigation }) => {
    const { apiResponse, myType: routeMyType, partnerType: routePartnerType } = route.params || {};
    
    const {
        apiResult,
        myType,
        partnerType,
        typeImages,
        handleGoHome,
        handleShare,
        handleCopyLink
    } = useMatchingResultScreen(apiResponse, routeMyType, routePartnerType);
    
    const matchingHeaderImg = require('../../assets/궁합 테스트.svg');
    const heartImg = require('../../assets/heartImg.svg');

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
                    {/* 헤더 - MatchingScreen과 동일 */}
                    <View style={matchingStyles.header}>
                        <Image
                            source={heartImg}
                            style={matchingStyles.headerHeartIcon}
                            resizeMode="contain"
                            fadeDuration={0}
                            cache="force-cache"
                        />
                        <Image
                            source={matchingHeaderImg}
                            style={matchingStyles.headerImage}
                            resizeMode="contain"
                            fadeDuration={0}
                            cache="force-cache"
                        />
                        <Image
                            source={heartImg}
                            style={matchingStyles.headerHeartIcon}
                            resizeMode="contain"
                            fadeDuration={0}
                            cache="force-cache"
                        />
                    </View>

                    {/* 선택된 유형들 - MatchingScreen과 동일한 카드 스타일 */}
                    <View style={matchingStyles.selectionContainer}>
                        <View style={matchingStyles.selectionCardContainer}>
                            <View style={matchingStyles.selectionCard}>
                                <LinearGradient
                                    colors={['#FFE39D', '#FFD979']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={matchingStyles.selectionCardGradient}
                                >
                                    <Image
                                        source={typeImages[myType]}
                                        style={matchingStyles.selectedTypeImage}
                                        resizeMode="contain"
                                        fadeDuration={0}
                                        cache="force-cache"
                                    />
                                </LinearGradient>
                            </View>
                            <Text style={matchingStyles.selectionTitle}>{myType}</Text>
                        </View>
                        
                        <Image
                            source={heartImg}
                            style={matchingStyles.heartIcon}
                            resizeMode="contain"
                            fadeDuration={0}
                            cache="force-cache"
                        />
                        
                        <View style={matchingStyles.selectionCardContainer}>
                            <View style={matchingStyles.selectionCard}>
                                <LinearGradient
                                    colors={['#F0F9E2', '#C0DF8C']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 1 }}
                                    style={matchingStyles.selectionCardGradient}
                                >
                                    <Image
                                        source={typeImages[partnerType]}
                                        style={matchingStyles.selectedTypeImage}
                                        resizeMode="contain"
                                        fadeDuration={0}
                                        cache="force-cache"
                                    />
                                </LinearGradient>
                            </View>
                            <Text style={matchingStyles.selectionTitle}>{partnerType}</Text>
                        </View>
                    </View>

                    {/* 궁합 설명 */}
                    <SectionContainer title="✨ 궁합 결과">
                        <Text style={styles.descriptionText}>
                            {apiResult.result}
                        </Text>
                    </SectionContainer>

                    {/* 장점 */}
                    <SectionContainer title="👍 함께하는 여행 팁">
                        <Text style={styles.descriptionText}>
                            {apiResult.tips || "서로의 장점을 발견해보세요!"}
                        </Text>
                    </SectionContainer>

                    {/* 주의점 */}
                    <SectionContainer title="💡 갈등 & 조화 포인트">
                        <Text style={styles.descriptionText}>
                            {apiResult.conflictPoints || "서로를 이해하며 여행해보세요!"}
                        </Text>
                    </SectionContainer>

                    {/* 추천 여행지 */}
                    <SectionContainer title="🏝️ 추천 여행지">
                        {Array.isArray(apiResult.recommendations) && apiResult.recommendations.length > 0 ? (
                            apiResult.recommendations.map((recommendation, index) => (
                                <Text key={index} style={styles.descriptionText}>
                                    • {recommendation}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.descriptionText}>
                                추천 여행지를 찾고 있습니다...
                            </Text>
                        )}
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

export default MatchingResultScreen; 