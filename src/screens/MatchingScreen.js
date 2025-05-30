import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';

const MatchingScreen = ({ navigation }) => {
    const [myType, setMyType] = useState(null);
    const [otherType, setOtherType] = useState(null);

    // 8개 유형 데이터
    const types = [
        '가성비 장인 원숭이',
        '감성 도파민러 돼지',
        '단톡방 총무 고양이',
        '무념무상 힐링러 병아리',
        '자낳괴 탐험가 코끼리',
        '패키지 러버 토끼',
        '계획충 쉴러 곰',
        '온도차 낭만파 강아지'
    ];

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

    // 유형별 이름 이미지 매핑
    const typeNameImages = {
        '가성비 장인 원숭이': require('../../assets/typeName-가성비장인원숭이.svg'),
        '감성 도파민러 돼지': require('../../assets/typeName-감성도파민러돼지.svg'),
        '단톡방 총무 고양이': require('../../assets/typeName-단톡방총무고양이.svg'),
        '무념무상 힐링러 병아리': require('../../assets/typeName-무념무상힐링러병아리.svg'),
        '자낳괴 탐험가 코끼리': require('../../assets/typeName-자낳괴탐험가코끼리.svg'),
        '패키지 러버 토끼': require('../../assets/typeName-패키지러버토끼.svg'),
        '계획충 쉴러 곰': require('../../assets/typeName-계획충쉴러곰.svg'),
        '온도차 낭만파 강아지': require('../../assets/typeName-온도차낭만파강아지.svg'),
    };

    const qmarkImg = require('../../assets/qmark.svg');
    const backLayerImg = require('../../assets/back-layer.svg');

    const handleTypeSelect = (type, isMyType) => {
        if (isMyType) {
            setMyType(type);
        } else {
            setOtherType(type);
        }
    };

    const handleShowResult = () => {
        if (myType && otherType) {
            // LoadingScreen으로 이동하면서 선택된 유형들을 전달
            navigation.navigate('LoadingScreen', {
                myType,
                partnerType: otherType
            });
        }
    };

    const renderSelectionCard = (selectedType, title, gradientColors) => (
        <View style={matchingStyles.selectionCardContainer}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={matchingStyles.selectionCard}
            >
                {selectedType ? (
                    <Image
                        source={typeImages[selectedType]}
                        style={matchingStyles.selectedTypeImage}
                        resizeMode="contain"
                    />
                ) : (
                    <Image
                        source={qmarkImg}
                        style={matchingStyles.qmarkImage}
                        resizeMode="contain"
                    />
                )}
            </LinearGradient>
            <Text style={matchingStyles.selectionTitle}>{title}</Text>
        </View>
    );

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
                        <Text style={matchingStyles.headerTitle}>💕 궁합 테스트 💕</Text>
                    </View>

                    {/* 선택된 유형 표시 카드들 */}
                    <View style={matchingStyles.selectionContainer}>
                        {renderSelectionCard(
                            myType,
                            '내 유형',
                            ['#FFE39D', '#FFD979']
                        )}
                        <Text style={matchingStyles.heartIcon}>❤️</Text>
                        {renderSelectionCard(
                            otherType,
                            '상대방 유형',
                            ['#F0F9E2', '#C0DF8C']
                        )}
                    </View>

                    {/* 8개 유형 카드들 */}
                    <View style={matchingStyles.typesContainer}>
                        <View style={matchingStyles.typesGrid}>
                            {types.map((type) => (
                                <View key={type} style={matchingStyles.typeCardWrapper}>
                                    <TouchableOpacity
                                        style={matchingStyles.typeCard}
                                        onPress={() => {
                                            // 내 유형이 선택되지 않았으면 내 유형으로, 아니면 상대방 유형으로
                                            if (!myType) {
                                                handleTypeSelect(type, true);
                                            } else if (!otherType) {
                                                handleTypeSelect(type, false);
                                            } else {
                                                // 둘 다 선택되어 있으면 내 유형을 변경
                                                handleTypeSelect(type, true);
                                            }
                                        }}
                                    >
                                        <Image
                                            source={typeImages[type]}
                                            style={matchingStyles.typeImage}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <Image
                                        source={typeNameImages[type]}
                                        style={matchingStyles.typeNameImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* 결과 보기 버튼 */}
                    <View style={[styles.buttonContainer, { zIndex: 10 }]}>
                        <Button
                            title="결과 보기"
                            onPress={handleShowResult}
                            type="secondary"
                            disabled={!myType || !otherType}
                        />
                    </View>

                    {/* 하단 레이어 */}
                    <Image source={backLayerImg} style={[styles.resultBackLayerImg, { zIndex: -1 }]} resizeMode="cover" />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

const matchingStyles = {
    header: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 60,
    },
    headerTitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6E3209',
    },
    selectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
        gap: 20,
    },
    selectionCardContainer: {
        alignItems: 'center',
    },
    selectionTitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6E3209',
        marginTop: 10,
        marginBottom: 20,
    },
    selectionCard: {
        width: 140,
        height: 140,
        backgroundColor: 'white', // 이미지보다 약간 더 크게 보이게.
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedTypeImage: {
        width: 140,
        height: 140,
    },
    qmarkImage: {
        width: 40,
        height: 40,
    },
    heartIcon: {
        fontSize: 24,
        top: -22,
    },
    typesContainer: {
        flex: 1,
        marginBottom: 20,
    },
    typesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    typeCardWrapper: {
        width: '48%',
        alignItems: 'center',
        marginBottom: 20,
    },
    typeCard: {
        width: 140,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    typeImage: {
        width: 140,
        height: 140,
    },
    typeNameImage: {
        width: 140,
        height: 20,
    },
};

export default MatchingScreen; 