import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Button from '../components/common/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';


const HomeScreen = ({ navigation }) => {
    console.log('HomeScreen 렌더링 중');

    const handleStartTest = () => {
        navigation.navigate('우당탕탕 여행 궁합 테스트');
    };

    const handleCheckCompatibility = () => {
        console.log('궁합 보러가기 버튼이 눌렸습니다.');
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: 'white' }]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <LinearGradient
                    colors={['#FFFCD8', '#FFEDA8', '#FFBF70']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    locations={[0, 0.5, 1]}
                    style={styles.mobileFrame}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>우당탕탕 여행 궁합 테스트</Text>
                        <Text style={styles.subtitle}>
                            나의 여행 성향과 친구와의 여행 궁합을 알아보세요!
                        </Text>
                    </View>

                    <View style={styles.content}>
                        <Image
                            source={require('../../assets/image.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <View style={styles.buttonContainer}>
                            <Button title="테스트 시작하기" onPress={handleStartTest} />
                            <Button
                                title="궁합 보러가기"
                                onPress={handleCheckCompatibility}
                                type="secondary"
                            />
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
