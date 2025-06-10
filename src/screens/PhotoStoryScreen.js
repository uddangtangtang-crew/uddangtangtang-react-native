import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { COLORS } from '../constants/theme';
import Button from '../components/common/Button';
import BackLayer from '../components/common/BackLayer';

const SAMPLE_IMAGES = [
    'https://images.unsplash.com/photo-1631582053308-40f482e7ace5?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1630207831419-3532bcb828d7?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1671639903944-dc3a999000b9?q=80&w=1874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const PhotoStoryScreen = ({ route, navigation }) => {
    const { width } = useWindowDimensions();
    const frameWidth = Math.min(width - 40, 280); // 여백 고려
    const slotHeight = frameWidth * 9 / 16; // 16:9 비율
    const frameBorder = 12;
    const slotMargin = 0;
    const images = SAMPLE_IMAGES; // 실제로는 API나 route.params에서 받아올 수 있음

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
                        {/* 비행기 이미지 (항상 프레임 위에 보임) */}
                        {/* <Image
                            source={require('../../assets/logo.png')}
                            style={{
                                position: 'absolute',
                                left: 6,
                                bottom: 2,
                                width: 116,
                                height: 116,
                                zIndex: 20,
                                pointerEvents: 'none',
                            }}
                            resizeMode="contain"
                        /> */}
                        {/* 프레임 상단 여백 */}
                        <View style={[frameStyles.top, { width: frameWidth, height: 32, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}> 
                            <Image
                                source={require('../../assets/heart-story.png')}
                                style={{ width: 30, height: 30 }}
                                resizeMode="contain"
                            />
                        </View>
                        {/* 인생네컷 프레임 */}
                        <View style={[frameStyles.frame, { width: frameWidth, borderWidth: frameBorder, position: 'relative', zIndex: 10 }]}> 
                            {[0, 1, 2, 3].map((idx) => (
                                <View
                                    key={idx}
                                    style={[
                                        frameStyles.slot,
                                        {
                                            width: frameWidth,
                                            height: slotHeight,
                                            borderBottomWidth: idx < 3 ? frameBorder : 0,
                                            marginBottom: slotMargin,
                                        },
                                    ]}
                                >
                                    {images[idx] && (
                                        <Image
                                            source={{ uri: images[idx] }}
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
                                    },
                                ]}
                            >
                                <Text style={styles.joinedUsers}>
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
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
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