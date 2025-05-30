import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Button from '../components/common/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/common';
import { TEXTS } from '../constants/texts';
import { COLORS } from '../constants/theme';

const HomeScreen = ({ navigation }) => {
    const handleStartTest = () => {
        navigation.navigate('여행 성향 테스트 알아보기');
    };

    const handleCheckCompatibility = () => {
        navigation.navigate('여행 궁합 알아보기');
    };

    const backLayerImg = require('../../assets/back-layer.svg');

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
                            <Button
                                title={TEXTS.HOME.START_TEST}
                                onPress={handleStartTest}
                                style={{ marginBottom: 12 }}
                            />
                            <Button
                                title={TEXTS.HOME.CHECK_COMPATIBILITY}
                                onPress={handleCheckCompatibility}
                                type="secondary"
                            />
                        </View>
                        <Text style={styles.joinedUsers}>{TEXTS.HOME.JOINED_USERS}</Text>
                    </View>
                    <Image source={backLayerImg} style={styles.backLayerImg} />
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
