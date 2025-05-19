import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions, ImageBackground } from 'react-native';
import Button from '../components/common/Button';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const { width, height } = Dimensions.get('window');
const MAX_WIDTH = 500;

const HomeScreen = ({ navigation }) => {
    const handleStartTest = () => {
        console.log('테스트 시작하기 버튼이 눌렸습니다.');
    };

    const handleCheckCompatibility = () => {
        console.log('궁합 보러가기 버튼이 눌렸습니다.');
    };

    return (
        <View style={styles.backgroundWrapper}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.mobileFrame}>
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
                            <Button
                                title="테스트 시작하기"
                                onPress={handleStartTest}
                            />
                            <Button
                                title="궁합 보러가기"
                                onPress={handleCheckCompatibility}
                                type="secondary"
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundWrapper: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safeArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileFrame: {
        width: '500px',
        maxWidth: MAX_WIDTH,
        height: '889px',
        backgroundColor: COLORS.background,
        paddingHorizontal: SIZES.large,
        paddingTop: SIZES.large,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        marginBottom: SIZES.large,
        alignItems: 'center',
    },
    title: {
        fontSize: SIZES.xlarge,
        color: COLORS.primary,
        ...FONTS.bold,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    subtitle: {
        fontSize: SIZES.medium,
        color: COLORS.textLight,
        ...FONTS.regular,
        textAlign: 'center',
        marginTop: SIZES.large,
        marginBottom: SIZES.large,
    },
    logo: {
        width: 500,
        height: 500,
        marginBottom: SIZES.large,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: SIZES.base,
        marginTop: SIZES.large,
    },
});

export default HomeScreen;
