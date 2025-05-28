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
});
