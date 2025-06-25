import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { matchingStyles } from '../styles/matchingStyles';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';
import ShareButtons from '../components/common/ShareButtons';
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

    // 반응형 width/height 적용
    const { width, height } = useWindowDimensions();
    const frameWidth = Math.min(width, 500);
    const frameHeight = Math.min(height, 900);
    const textPadding = 16;

    // 추천 일정 렌더링 함수
    const renderRecommendationSchedule = () => {
        if (!apiResult.recommendation) {
            return (
                <Text style={styles.descriptionText}>
                    추천 일정을 준비 중입니다...
                </Text>
            );
        }

        const days = ['day1', 'day2', 'day3'];
        
        return days.map((day, dayIndex) => {
            const dayData = apiResult.recommendation[day];
            if (!dayData) return null;

            return (
                <View key={day} style={{ marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 12, padding: 16 }}>
                    <Text style={[styles.sectionTitle, { fontSize: 16, marginBottom: 12 }]}>
                        📅 {dayIndex + 1}일차
                    </Text>
                    
                    <View style={{ marginBottom: 8 }}>
                        <Text style={[styles.descriptionText, { fontWeight: 'bold', color: '#FF6B35' }]}>
                            🌅 아침
                        </Text>
                        <Text style={styles.descriptionText}>
                            {dayData.morning}
                        </Text>
                    </View>
                    
                    <View style={{ marginBottom: 8 }}>
                        <Text style={[styles.descriptionText, { fontWeight: 'bold', color: '#4A90E2' }]}>
                            ☀️ 오후
                        </Text>
                        <Text style={styles.descriptionText}>
                            {dayData.afternoon}
                        </Text>
                    </View>
                    
                    <View style={{ marginBottom: 12 }}>
                        <Text style={[styles.descriptionText, { fontWeight: 'bold', color: '#9B59B6' }]}>
                            🌙 저녁
                        </Text>
                        <Text style={styles.descriptionText}>
                            {dayData.evening}
                        </Text>
                    </View>
                    
                    <View style={{ borderTopWidth: 1, borderTopColor: '#E0E0E0', paddingTop: 8 }}>
                        <Text style={[styles.descriptionText, { fontWeight: 'bold', color: '#27AE60' }]}>
                            ✨ 하루 요약
                        </Text>
                        <Text style={styles.descriptionText}>
                            {dayData.summary}
                        </Text>
                    </View>
                </View>
            );
        });
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
                    style={[styles.mobileFrame, { width: frameWidth, minHeight: frameHeight, paddingHorizontal: 20 }]}
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
                            <View style={[matchingStyles.selectionCard, { backgroundColor: '#fff', borderWidth: 0, shadowOpacity: 0, elevation: 0 }]}> 
                                <Image
                                    source={typeImages[myType] || { uri: apiResponse?.result?.myTypeImage }}
                                    style={matchingStyles.selectedTypeImage}
                                    resizeMode="contain"
                                    fadeDuration={0}
                                    cache="force-cache"
                                />
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
                            <View style={[matchingStyles.selectionCard, { backgroundColor: '#fff', borderWidth: 0, shadowOpacity: 0, elevation: 0 }]}> 
                                <Image
                                    source={typeImages[partnerType] || { uri: apiResponse?.result?.otherTypeImage }}
                                    style={matchingStyles.selectedTypeImage}
                                    resizeMode="contain"
                                    fadeDuration={0}
                                    cache="force-cache"
                                />
                            </View>
                            <Text style={matchingStyles.selectionTitle}>{partnerType}</Text>
                        </View>
                    </View>

                    {/* 궁합 설명 */}
                    <View style={{ alignItems: 'flex-start', marginBottom: 20, width: frameWidth, paddingHorizontal: textPadding }}>
                        <Text style={styles.sectionTitle}>
                            ✨ 궁합 결과
                        </Text>
                        <Text style={styles.descriptionText}>
                            {apiResult.result}
                        </Text>
                    </View>

                    <View style={{ alignItems: 'flex-start', marginBottom: 20, width: frameWidth, paddingHorizontal: textPadding }}>
                        <Text style={styles.sectionTitle}>
                            👍 함께하는 여행 팁
                        </Text>
                        <Text style={styles.descriptionText}>
                            {apiResult.tips || "서로의 장점을 발견해보세요!"}
                        </Text>
                    </View>

                    <View style={{ alignItems: 'flex-start', marginBottom: 20, width: frameWidth, paddingHorizontal: textPadding }}>
                        <Text style={styles.sectionTitle}>
                            💡 갈등 & 조화 포인트
                        </Text>
                        <Text style={styles.descriptionText}>
                            {apiResult.conflictPoints || "서로를 이해하며 여행해보세요!"}
                        </Text>
                    </View>

                    {/* 추천 여행 일정 */}
                    <View style={{ alignItems: 'flex-start', marginBottom: 30, width: frameWidth, paddingHorizontal: textPadding }}>
                        <Text style={styles.sectionTitle}>
                            🗓️ 추천 여행 일정
                        </Text>
                        {renderRecommendationSchedule()}
                    </View>

                    {/* 버튼들 */}
                    <View style={[styles.buttonContainer, { zIndex: 10 }]}>
                        <Button
                            title="테스트 다시하기"
                            onPress={() => handleGoHome(navigation)}
                            type="primary"
                        />
                        
                        <Button
                            title="궁합네컷 찍으러가기"
                            onPress={() => navigation.navigate('궁합네컷', {
                                myType,
                                partnerType,
                                sharedData: apiResponse
                            })}
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