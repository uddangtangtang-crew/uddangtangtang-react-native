import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';
import ShareButtons from '../components/common/ShareButtons';
import BackLayer from '../components/common/BackLayer';
import { TEXTS } from '../constants/texts';
import { useCategoryScreen } from '../hooks/useCategoryScreen';

const CategoryScreen = ({ route, navigation, onTakeTestAndCheckCompatibility }) => {
    const { resultData } = route.params || {};
    
    const {
        result,
        typeNameImages,
        defaultImage,
        handleCheckCompatibility,
        handleShare,
        handleCopyLink
    } = useCategoryScreen(resultData);

    const categoryHeaderImg = require('../../assets/category-header.svg');

    // 반응형 width/height
    const { width, height } = useWindowDimensions();
    const frameWidth = Math.min(width, 500);
    const frameHeight = Math.min(height, 900);
    const imageSize = frameWidth * 0.5;
    const typeNameImgWidth = imageSize;
    const typeNameImgHeight = 30;
    const textPadding = 16;

    // 공유 결과에서 온 경우인지 확인 (onTakeTestAndCheckCompatibility prop이 있으면 공유 결과에서 온 것)
    const isFromSharedResult = !!onTakeTestAndCheckCompatibility;

    // 추천 일정 렌더링 함수
    const renderRecommendationSchedule = () => {
        if (!result.recommendation) {
            return (
                <Text style={styles.descriptionText}>
                    추천 일정을 준비 중입니다...
                </Text>
            );
        }

        const days = ['day1', 'day2', 'day3'];
        
        return days.map((day, dayIndex) => {
            const dayData = result.recommendation[day];
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
                    {/* 헤더 */}
                    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 30 }}>
                        <Image
                            source={categoryHeaderImg}
                            style={{
                                width: 138,
                                height: 35,
                            }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* 캐릭터 이미지 */}
                    <Image
                        source={result.image ? { uri: result.image } : defaultImage}
                        style={{
                            width: imageSize,
                            height: imageSize,
                            borderRadius: 20,
                            marginBottom: 12,
                        }}
                        resizeMode="contain"
                    />

                    {/* 유형 이름 */}
                    {typeNameImages[result.typeName] ? (
                        <Image
                            source={typeNameImages[result.typeName]}
                            style={{
                                width: typeNameImgWidth,
                                height: typeNameImgHeight,
                                marginBottom: 20,
                                alignSelf: 'center',
                            }}
                            resizeMode="contain"
                        />
                    ) : (
                        <Text style={[styles.typeNameText, { textAlign: 'center' }]}> 
                            {result.typeName}
                        </Text>
                    )}

                    {/* 분류된 이유 */}
                    <View style={{ alignItems: 'flex-start', marginBottom: 20, width: frameWidth, paddingHorizontal: textPadding }}>
                        <Text style={styles.sectionTitle}>
                            ☺️ {result.typeName}으로 분류된 이유
                        </Text>
                        <Text style={styles.reasonText}>
                            {result.reason}
                        </Text>
                    </View>

                    {/* 여행 유형 설명 */}
                    <View style={{ alignItems: 'flex-start', marginBottom: 20, width: frameWidth, paddingHorizontal: textPadding }}>
                        <Text style={styles.sectionTitle}>
                            🧳 여행 유형 설명
                        </Text>
                        <Text style={styles.reasonText}>
                            {result.description}
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
                    <View style={styles.buttonContainer}>
                        {/* 공유 결과에서 온 경우에만 "나도 테스트하고 궁합 보기" 버튼 표시 */}
                        {isFromSharedResult && (
                            <Button
                                title="나도 테스트하기 👍"
                                onPress={onTakeTestAndCheckCompatibility}
                                type="primary"
                                style={{ width: 320 }}
                            />
                        )}
                        
                        <Button
                            title={TEXTS.HOME.CHECK_COMPATIBILITY}
                            onPress={() => handleCheckCompatibility(navigation)}
                            type="secondary"
                        />

                        {/* 공유 버튼들 */}
                        <ShareButtons 
                            onShare={handleShare}
                            onCopyLink={handleCopyLink}
                        />
                    </View>

                    {/* 하단 레이어 */}
                    <BackLayer variant="result" />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CategoryScreen;
