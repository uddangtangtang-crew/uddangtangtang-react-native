import { StyleSheet } from 'react-native';

// 온보딩 화면 스타일
export const onboardStyles = StyleSheet.create({
    topBar: {
        position: 'relative',
        width: '100%',
        height: 0,
    },
    qImage: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 16,
    },
    qustionImage: {
        width: 54,
        height: 72,
        alignSelf: 'center',
        marginBottom: 16,
    },
    questionText: {
        textAlign: 'center',
        marginBottom: 14,
    },
    answerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginHorizontal: 64,
        marginTop: 8,
    },
    answerBtn: {
        flex: 1,
        alignItems: 'center',
    },
    answerImg: {
        width: 170,
        height: 280,
        marginHorizontal: 8,
    },
    answerTextWrap: {
        position: 'absolute',
        top: 90,
        left: 0,
        width: '100%',
        alignItems: 'center',
    },
    answerTextFirst: {
        color: '#6E3209CC',
        fontFamily: 'NanumSquareRound',
        fontWeight: '900',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
    },
    answerTextRest: {
        color: '#6E3209CC',
        fontFamily: 'NanumSquareRound',
        fontWeight: '500',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 22,
    },
    backIconBtnMobile: {
        position: 'absolute',
        top: 40,
        left: 26,
        zIndex: 20,
        padding: 20,
        backgroundColor: 'transparent',
        borderRadius: 24,
    },
    backIconBtn: {
        position: 'absolute',
        top: 46,
        left: 12,
        zIndex: 20,
        padding: 16,
        backgroundColor: 'transparent',
        borderRadius: 24,
    },
}); 