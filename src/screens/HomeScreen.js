import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
import Button from '../components/common/Button';
import { COLORS, FONTS, SIZES } from '../constants/theme';

// 화면 너비를 가져와서 모바일 크기로 제한하기 위해 사용
const { width, height } = Dimensions.get('window');
const MAX_WIDTH = 500; // 최대 화면 너비

const HomeScreen = ({ navigation }) => {
    // 테스트 시작 버튼을 눌렀을 때의 핸들러
    const handleStartTest = () => {
        // TestScreen으로 이동 (아직 구현하지 않았으므로 주석 처리)
        // navigation.navigate('Test');
        console.log('테스트 시작하기 버튼이 눌렸습니다.');
    };

    // 궁합 보기 버튼을 눌렀을 때의 핸들러
    const handleCheckCompatibility = () => {
        // CompatibilityScreen으로 이동 (아직 구현하지 않았으므로 주석 처리)
        // navigation.navigate('Compatibility');
        console.log('궁합 보러가기 버튼이 눌렸습니다.');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>우당탕탕 여행 궁합 테스트</Text>
                    <Text style={styles.subtitle}>
                        나의 여행 성향과 친구와의 여행 궁합을 알아보세요!
                    </Text>
                </View>
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
                    // 실제 앱에서는 테스트를 완료한 사용자만 궁합을 볼 수 있도록 설정
                    // disabled={!hasCompletedTest}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
    },
    content: {
        flex: 1,
        width: '100%',
        maxWidth: MAX_WIDTH,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.large,
    },
    logo: {
        width: 360,
        height: 360,
        marginBottom: SIZES.large,
    },
    title: {
        fontSize: SIZES.xxlarge,
        color: COLORS.text,
        ...FONTS.bold,
        textAlign: 'center',
        marginBottom: SIZES.base,
    },
    subtitle: {
        fontSize: SIZES.medium,
        color: COLORS.textLight,
        ...FONTS.regular,
        textAlign: 'center',
        marginBottom: SIZES.xlarge * 2,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: height * 0.1, // 화면 높이의 10%
    },
});

export default HomeScreen;