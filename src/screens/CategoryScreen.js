import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';
import { TEXTS } from '../constants/texts';

const CategoryScreen = ({ route }) => {
    const { resultData } = route.params || {};

    const backLayerImg = require('../../assets/back-layer.svg');
    const categoryHeaderImg = require('../../assets/category-header.svg');

    // 유형별 SVG 이미지 매핑
    const typeNameImages = {
        '단톡방 총무 고양이': require('../../assets/typeName-단톡방총무고양이.svg'),
        '패키지 러버 토끼': require('../../assets/typeName-패키지러버토끼.svg'),
        '계획충 쉴러 곰': require('../../assets/typeName-계획충쉴러곰.svg'),
        '감성 도파민러 돼지': require('../../assets/typeName-감성도파민러돼지.svg'),
        '자낳괴 탐험가 코끼리': require('../../assets/typeName-자낳괴탐험가코끼리.svg'),
        '온도차 낭만파 강아지': require('../../assets/typeName-온도차낭만파강아지.svg'),
        '가성비 장인 원숭이': require('../../assets/typeName-가성비장인원숭이.svg'),
        '무념무상 힐링러 병아리': require('../../assets/typeName-무념무상힐링러병아리.svg'),
    };

    // 기본값 (Mock Data) - API 응답이 없을 때 사용
    const mockResult = {
        code: "B-A-A-B",
        reason: "사용자는 여행 계획을 유연하게 세우며, 내향적 성향이 강하고, 소비에서는 실속을 중시하는 경향이 있습니다. 여행 목적이 힐링이지만 자극적 활동도 선호하여, 자유로움과 적절한 탐험 욕구를 모두 갖추고 있습니다. 이러한 특징이 '가성비 장인 원숭이' 유형과 가장 부합하며, 철저한 계획보다는 유연한 스케줄을 선호하고, 조용한 휴식을 추구하면서도 새로운 경험을 찾아 떠나는 성향이 강합니다.",
        keyword: "#유연한 여행 #내향적 휴식 #실속파 #힐링과 자극 둘 다",
        image: null, // 이미지가 없을 때는 기본 이미지 사용
        description: "당신은 즉흥적인 감정과 직관에 따라 여행하는 타입입니다. 여행 계획보다는 느낌을 따르고, 가는 길에 눈에 띄는 감성적인 장소나 예쁜 소품에 이끌리듯 멈춰섭니다. 사람들과 어울리기보다는 혼자 또는 소수의 동행과 조용히 감정을 곱씹는 시간이 소중하죠.",
        typeName: "가성비 장인 원숭이",
        tripRecommand: "국내: 제주 협재 해변 – 감성 카페, 사진 명소 넘치는 뷰 성지\n강릉 안목해변 – 바다와 감성 카페가 모인 필수 코스\n파주 감성촌 – 사진 찍기 좋고 아기자기한 감성 넘침"
    };

    // API 응답에서 result 객체 추출, 없으면 기본값 사용
    const result = resultData?.result || mockResult;

    // reason 텍스트를 마지막 문장과 나머지로 분리
    const splitReason = (reasonText) => {
        const sentences = reasonText.split('.');
        if (sentences.length <= 1) return { mainText: reasonText, lastSentence: '' };

        const lastSentence = sentences[sentences.length - 2] + '.'; // 마지막 완전한 문장
        const mainText = sentences.slice(0, -2).join('.') + '.';

        return { mainText, lastSentence };
    };

    const { mainText, lastSentence } = splitReason(result.reason);

    // 기본 이미지 (API에서 이미지가 없을 때 사용)
    const defaultImage = require('../../assets/airplane-only.svg');

    const handleCheckCompatibility = () => {
        navigation.navigate('여행 궁합 알아보기');
    };

    const handleShare = () => {
        // 공유하기 로직 (나중에 구현)
        console.log('공유하기');
    };

    const handleCopyLink = () => {
        // 링크 복사 로직 (나중에 구현)
        console.log('링크 복사');
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

                        {/* 키워드 */}
                        {result.keyword && (
                            <Text style={[styles.descriptionText, { fontWeight: '600', marginBottom: 10 }]}>
                                {result.keyword}
                            </Text>
                        )}

                        {/* 여행지 추천 */}
                        <Text style={styles.descriptionText}>
                            {result.tripRecommand}
                        </Text>
                    </View>

                    {/* 버튼들 */}
                    <View style={[styles.buttonContainer, { zIndex: 10 }]}>
                        <Button
                            title={TEXTS.HOME.CHECK_COMPATIBILITY}
                            onPress={handleCheckCompatibility}
                            type="secondary"
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

export default CategoryScreen;
