import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';


const { height } = Dimensions.get('window');
const MAX_WIDTH = 500;

export const styles = StyleSheet.create({
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
