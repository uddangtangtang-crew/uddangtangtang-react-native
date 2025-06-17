import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';
import BackLayer from '../components/common/BackLayer';
import { TYPE_CODES } from '../constants/travelTypes';

const PhotoStoryScreen = ({ route, navigation }) => {
    const { myType, partnerType } = route.params || {};
    const { width } = useWindowDimensions();
    const frameWidth = Math.min(width - 40, 280); // 여백 고려
    const frameBorder = 12;
    const slotHeight = frameWidth * 9 / 16; // 16:9 비율

    // 한글 유형명을 영문 코드로 변환
    const myTypeCode = TYPE_CODES[myType] || 'monkey';
    const partnerTypeCode = TYPE_CODES[partnerType] || 'monkey';

    // 유형에 따른 이미지 배열 생성
    const images = Array.from({ length: 4 }, (_, i) => {
        const index = i + 1;
        const firstOrder = `${myTypeCode}_${partnerTypeCode}_${index}`;
        const secondOrder = `${partnerTypeCode}_${myTypeCode}_${index}`;
        
        try {
            // 첫 번째 순서로 시도
            return require(`../../assets/4cut/${firstOrder}.png`);
        } catch (e) {
            try {
                // 두 번째 순서로 시도
                return require(`../../assets/4cut/${secondOrder}.png`);
            } catch (e) {
                // 둘 다 실패하면 기본 이미지 사용
                return require('../../assets/airplane-only.svg');
            }
        }
    });

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}> 
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <LinearGradient
                    colors={['#FFFCD8', '#FFEDA8', '#FFBF70']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    locations={[0, 0.5, 1]}
                    style={[styles.mobileFrame, { minHeight: 600, paddingHorizontal: 20 }]}
                >
                    <View style={{ alignItems: 'center', marginVertical: 25, position: 'relative', width: frameWidth, height: frameWidth * 4 * 9 / 16 + 100 }}>
                        {/* 프레임 상단 여백 */}
                        <View style={[frameStyles.top, { 
                            width: frameWidth, 
                            height: 32, 
                            backgroundColor: '#fff', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            flexDirection: 'row' 
                        }]}> 
                            <Image
                                source={require('../../assets/heart-story.png')}
                                style={{ width: 30, height: 30 }}
                                resizeMode="contain"
                            />
                        </View>
                        {/* 인생네컷 프레임 */}
                        <View style={[frameStyles.frame, { 
                            width: frameWidth, 
                            borderWidth: frameBorder, 
                            borderColor: '#fff',
                            position: 'relative', 
                            zIndex: 10 
                        }]}> 
                            {images.map((image, idx) => (
                                <View
                                    key={idx}
                                    style={[
                                        frameStyles.slot,
                                        {
                                            width: frameWidth,
                                            height: slotHeight,
                                            borderBottomWidth: idx < 3 ? frameBorder : frameBorder,
                                            borderColor: '#fff',
                                            marginBottom: 0,
                                        },
                                    ]}
                                >
                                    {image && (
                                        <Image
                                            source={image}
                                            style={{ width: '100%', height: '100%', borderRadius: 0 }}
                                            resizeMode="cover"
                                        />
                                    )}
                                </View>
                            ))}
                            <View
                                style={[
                                    frameStyles.bottom,
                                    {
                                        width: frameWidth,
                                        height: 68,
                                        backgroundColor: '#fff',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'relative',
                                    },
                                ]}
                            >
                                <Text style={[styles.joinedUsers, { 
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: [{ translateX: -40 }, { translateY: -45 }],
                                    textAlign: 'center',
                                    width: 80,
                                }]}>
                                    궁합네컷
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.buttonContainer, { zIndex: 10 }]}> 
                        <Button
                            title="궁합 테스트 하러가기"
                            onPress={() => navigation.navigate('우당탕탕 여행 성향')}
                            type="primary"
                        />
                    </View>

                    <BackLayer variant="result" style={{ zIndex: -1 }} />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

const frameStyles = StyleSheet.create({
    frame: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        position: 'relative',
    },
    top: {
        borderBottomWidth: 0,
    },
    slot: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        borderTopWidth: 0,
    },
});

export default PhotoStoryScreen; 