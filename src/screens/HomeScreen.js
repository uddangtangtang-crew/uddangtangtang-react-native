import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Button from '../components/common/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { TEXTS } from '../constants/texts';

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
                    <View style={[styles.content, { justifyContent: 'flex-start' }]}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../../assets/logo.svg')}
                                style={[styles.logo, { marginTop: 60, marginBottom: -60 }]}
                                resizeMode="contain"
                            />
                            <Image
                                source={require('../../assets/title.svg')}
                                style={[styles.logo, { marginTop: -60, marginBottom: -20 }]}
                                resizeMode="contain"
                            />
                            <Text style={styles.subtitle}>{TEXTS.HOME.SUBTITLE}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button title={TEXTS.HOME.START_TEST} onPress={handleStartTest} />
                            <Button
                                title={TEXTS.HOME.CHECK_COMPATIBILITY}
                                onPress={handleCheckCompatibility}
                                type="secondary"
                            />
                        </View>
                        <Text style={styles.joinedUsers}>{TEXTS.HOME.JOINED_USERS}</Text>
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
