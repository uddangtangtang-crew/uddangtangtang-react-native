import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { matchingStyles } from '../styles/matchingStyles';
import { COLORS } from '../constants/theme';
import { TRAVEL_TYPES } from '../constants/travelTypes';
import Button from '../components/common/Button';
import SelectionCard from '../components/matching/SelectionCard';
import TypeCard from '../components/matching/TypeCard';
import { useMatching } from '../hooks/useMatching';
import BackLayer from '../components/common/BackLayer';

const MatchingScreen = ({ navigation }) => {
    const {
        myType,
        otherType,
        activeCard,
        handleSelectionCardPress,
        handleTypeSelect,
        handleShowResult,
        canShowResult
    } = useMatching();

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
                    {/* 헤더 */}
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

                    {/* 선택된 유형 표시 카드들 */}
                    <View style={matchingStyles.selectionContainer}>
                        <SelectionCard
                            selectedType={myType}
                            title="내 유형"
                            gradientColors={['#FFE39D', '#FFD979']}
                            cardType="my"
                            activeCard={activeCard}
                            onPress={handleSelectionCardPress}
                        />
                        <Image
                            source={heartImg}
                            style={matchingStyles.heartIcon}
                            resizeMode="contain"
                            fadeDuration={0}
                            cache="force-cache"
                        />
                        <SelectionCard
                            selectedType={otherType}
                            title="상대방 유형"
                            gradientColors={['#F0F9E2', '#C0DF8C']}
                            cardType="other"
                            activeCard={activeCard}
                            onPress={handleSelectionCardPress}
                        />
                    </View>

                    {/* 8개 유형 카드들 */}
                    <View style={matchingStyles.typesContainer}>
                        <View style={matchingStyles.typesGrid}>
                            {TRAVEL_TYPES.map((type) => (
                                <TypeCard
                                    key={type}
                                    type={type}
                                    onPress={handleTypeSelect}
                                />
                            ))}
                        </View>
                    </View>

                    {/* 결과 보기 버튼 */}
                    <View style={styles.buttonContainer}>
                        <Button
                            title="결과 보기"
                            onPress={() => handleShowResult(navigation)}
                            type="secondary"
                            disabled={!canShowResult}
                        />
                    </View>

                    {/* 하단 레이어 */}
                    <BackLayer variant="result" />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MatchingScreen; 