import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, StyleSheet, useWindowDimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';
import ShareButtons from '../components/common/ShareButtons';
import BackLayer from '../components/common/BackLayer';
import { TYPE_CODES } from '../constants/travelTypes';
import { sharePhotoStory as sharePhotoStoryKakao, copyPhotoStoryUrl } from '../utils/kakaoShare';

const PhotoStoryScreen = ({ route, navigation }) => {
    const { myType, partnerType, sharedData } = route.params || {};
    const [isSharing, setIsSharing] = useState(false);
    const [currentShareId, setCurrentShareId] = useState(null);
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

    // shareId를 가져오는 함수
    const getShareIdFromAPI = async () => {
        if (currentShareId) {
            console.log('📋 이미 저장된 shareId 사용:', currentShareId);
            return currentShareId;
        }

        try {
            console.log('🔗 shareId를 가져오는 중...');
            console.log('📋 sharedData 전체:', sharedData);
            console.log('📋 sharedData.result:', sharedData?.result);
            
            // sharedData에서 shareId 가져오기
            const shareId = sharedData?.result?.shareId;
            console.log('📋 추출된 shareId:', shareId);
            
            if (!shareId) {
                console.error('❌ shareId를 찾을 수 없음. sharedData 구조:', sharedData);
                throw new Error('궁합 테스트 결과의 shareId를 찾을 수 없습니다.');
            }
            
            console.log('✅ 최종 사용할 shareId:', shareId);
            setCurrentShareId(shareId);
            return shareId;
        } catch (error) {
            console.error('❌ shareId 가져오기 실패:', error);
            throw error;
        }
    };

    // 공유하기 핸들러
    const handleShare = async () => {
        if (isSharing) return;
        
        setIsSharing(true);
        try {
            console.log('🔗 궁합네컷 공유하기 시작...');
            
            // API에서 shareId 가져오기
            const shareId = await getShareIdFromAPI();
            console.log('📋 사용할 shareId:', shareId);
            
            // 카카오톡 공유하기
            await sharePhotoStoryKakao(shareId, myType, partnerType);
            console.log('✅ 카카오톡 공유 완료!');
        } catch (error) {
            console.error('❌ 궁합네컷 공유하기 에러:', error);
            Alert.alert('공유 실패', '궁합네컷 공유에 실패했습니다.');
        } finally {
            setIsSharing(false);
        }
    };

    // URL 복사 핸들러
    const handleCopyLink = async () => {
        try {
            console.log('🔗 궁합네컷 URL 복사하기 시작...');
            
            // API에서 shareId 가져오기
            const shareId = await getShareIdFromAPI();
            console.log('📋 사용할 shareId:', shareId);
            
            // URL 복사하기
            console.log('🔗 copyPhotoStoryUrl 함수 호출 시작...');
            const result = await copyPhotoStoryUrl(shareId);
            console.log('✅ copyPhotoStoryUrl 결과:', result);
            console.log('✅ URL 복사 완료!');
        } catch (error) {
            console.error('❌ 궁합네컷 URL 복사 에러:', error);
            Alert.alert('복사 실패', '링크 복사에 실패했습니다.');
        }
    };

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
                                style={{ width: 20, height: 20, marginRight: 8 }}
                                resizeMode="contain"
                            />
                            <Text style={{ 
                                fontSize: 12, 
                                fontFamily: 'NanumGothic',
                                textAlign: 'center'
                            }}>
                                우당탕탕 여행 궁합
                            </Text>
                            <Image
                                source={require('../../assets/heart-story.png')}
                                style={{ width: 20, height: 20, marginLeft: 8 }}
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
                        {/* 공유 버튼들 */}
                        <ShareButtons 
                            onShare={handleShare}
                            onCopyLink={handleCopyLink}
                        />
                        
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