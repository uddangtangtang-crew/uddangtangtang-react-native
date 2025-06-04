import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';
import ShareButtons from '../components/common/ShareButtons';
import BackLayer from '../components/common/BackLayer';
import { TEXTS } from '../constants/texts';
import { useCategoryScreen } from '../hooks/useCategoryScreen';

const CategoryScreen = ({ route, navigation }) => {
    const { resultData } = route.params || {};
    
    const {
        result,
        typeNameImages,
        mainText,
        lastSentence,
        defaultImage,
        handleCheckCompatibility,
        handleShare,
        handleCopyLink
    } = useCategoryScreen(resultData);

    const categoryHeaderImg = require('../../assets/category-header.svg');

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
                            width: 241,
                            height: 241,
                        }}
                        resizeMode="contain"
                    />

                    {/* 유형 이름 */}
                    {typeNameImages[result.typeName] ? (
                        <Image
                            source={typeNameImages[result.typeName]}
                            style={{
                                width: 153,
                                height: 30,
                                marginBottom: 10,
                            }}
                            resizeMode="contain"
                        />
                    ) : (
                        <Text style={styles.typeNameText}>
                            {result.typeName}
                        </Text>
                    )}

                    {/* 분류된 이유 */}
                    <View style={{ alignItems: 'flex-start', marginBottom: 20, width: '100%' }}>
                        <Text style={styles.sectionTitle}>
                            ✨ {result.typeName}으로 분류된 이유
                        </Text>
                        <Text style={styles.reasonText}>
                            {mainText}
                        </Text>
                        <Text style={styles.reasonLastSentence}>
                            {lastSentence}
                        </Text>
                    </View>

                    {/* 여행 유형 설명 */}
                    <View style={{ alignItems: 'flex-start', marginBottom: 20, width: '100%' }}>
                        <Text style={styles.sectionTitle}>
                            🧳 여행 유형 설명
                        </Text>
                        <Text style={styles.descriptionText}>
                            {result.description}
                        </Text>
                    </View>

                    {/* 추천 여행지 */}
                    <View style={{ alignItems: 'flex-start', marginBottom: 30, width: '100%' }}>
                        <Text style={styles.sectionTitle}>
                            🍁 추천 여행지
                        </Text>

                        {/* 여행지 추천 리스트 */}
                        {Array.isArray(result.tourSpotList) && result.tourSpotList.length > 0 ? (
                            result.tourSpotList.map((spot, idx) => (
                                <Text key={idx} style={styles.descriptionText}>
                                    • {spot.name} - {spot.description}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.descriptionText}>
                                추천 여행지를 찾고 있습니다...
                            </Text>
                        )}
                    </View>

                    {/* 버튼들 */}
                    <View style={styles.buttonContainer}>
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
