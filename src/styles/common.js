import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { MAX_WIDTH } from '../constants/theme';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    mobileFrame: {
        width: MAX_WIDTH,
        minHeight: height,
        paddingHorizontal: SIZES.large,
        paddingTop: SIZES.large,
        justifyContent: 'space-evenly',
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
        fontFamily: 'NanumSquareRound',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'NanumSquareRound',
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: -0.3,
        textAlign: 'center',
        color: '#6E3209',
        marginBottom: 24
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    logo: {
        width: 250,
        height: 250,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: SIZES.large,
        marginBottom: 40,
        gap: 20,
    },
    joinedUsers: {
        fontFamily: 'NanumSquareRound',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: -0.019 * 16,
        textAlign: 'center',
        marginTop: 34,
    },
    typeNameText: {
        fontFamily: 'NanumSquareRound',
        fontWeight: '800',
        fontSize: 20,
        textAlign: 'center',
        color: '#745F56',
        marginBottom: 10,
    },
    backLayerWrap: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        zIndex: 0,
    },
    backLayerImg: {
        width: 500,
        height: 200,
        resizeMode: 'cover',
        opacity: 0.85,
    },
    // ResultScreen 관련 스타일
    resultImage: {
        width: 200,
        height: 200,
        marginBottom: 0,
    },
    button: {
        marginTop: -20,
        marginBottom: 200,
    },
    resultBackLayerImg: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: 100,
        opacity: 0.65,
        resizeMode: 'cover',
        zIndex: 0,
    },
    // CategoryScreen 섹션 스타일들
    sectionTitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6E3209',
        marginBottom: 10,
        textAlign: 'left',
    },
    reasonText: {
        fontFamily: 'NanumSquareRound',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 25.2, // 180% of 14px
        letterSpacing: -0.28, // -2% of 14px
        color: '#6E3209',
        textAlign: 'left',
    },
    reasonLastSentence: {
        fontFamily: 'NanumSquareRound',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 25.2, // 180% of 14px
        letterSpacing: -0.28, // -2% of 14px
        color: '#6E3209',
        textAlign: 'left',
    },
    descriptionText: {
        fontFamily: 'NanumSquareRound',
        fontSize: 14,
        color: '#6E3209',
        lineHeight: 20,
        textAlign: 'left',
    },
    // CategoryScreen 버튼 스타일들
    primaryButton: {
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 25,
        marginBottom: 20,
    },
    shareButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
    },
    shareButton: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
