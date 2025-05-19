import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
import Button from '../components/common/Button';
import { COLORS, FONTS, SIZES } from '../constants/theme';


const MAX_WIDTH = 500;
const { height } = Dimensions.get('window');


const HomeScreen = ({ navigation }) => {
    const handleStartTest = () => {
        console.log('테스트 시작하기 버튼이 눌렸습니다.');
    };

    const handleCheckCompatibility = () => {
        console.log('궁합 보러가기 버튼이 눌렸습니다.');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
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
                            <Button title="테스트 시작하기" onPress={handleStartTest} />
                            <Button
                                title="궁합 보러가기"
                                onPress={handleCheckCompatibility}
                                type="secondary"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    mobileFrame: {
        width: MAX_WIDTH,
        minHeight: height,
        backgroundColor: COLORS.card,
        paddingHorizontal: SIZES.large,
        paddingTop: SIZES.large,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },
    header: {
        marginBottom: SIZES.large,
        alignItems: 'center',
    },
    title: {
        fontSize: SIZES.xlarge,
        color: COLORS.primary,
        ...FONTS.bold,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: SIZES.medium,
        color: COLORS.textLight,
        ...FONTS.regular,
        textAlign: 'center',
        marginTop: SIZES.large,
        marginBottom: SIZES.small,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    logo: {
        width: 300,
        height: 300,
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
