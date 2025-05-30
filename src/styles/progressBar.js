import { StyleSheet } from 'react-native';

// 프로그래스바 관련 상수
export const PROGRESS_CONSTANTS = {
    DOT_WIDTH: 30,
    DOT_HEIGHT: 8,
    DOT_RADIUS: 40,
    DOT_MARGIN: 8,
    AIRPLANE_SIZE: 40,
    TOTAL_QUESTIONS: 12,
};

// 프로그래스바 스타일
export const progressStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 2,
        marginBottom: 2,
        alignSelf: 'flex-start',
    },
    dotRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 4,
    },
    dot: {
        width: PROGRESS_CONSTANTS.DOT_WIDTH,
        height: PROGRESS_CONSTANTS.DOT_HEIGHT,
        borderRadius: PROGRESS_CONSTANTS.DOT_RADIUS,
        marginRight: PROGRESS_CONSTANTS.DOT_MARGIN,
    },
    active: {
        backgroundColor: '#95B55E',
    },
    airplane: {
        width: PROGRESS_CONSTANTS.AIRPLANE_SIZE,
        height: PROGRESS_CONSTANTS.AIRPLANE_SIZE,
    },
});

// 프로그래스바 영역 스타일
export const progressAreaStyles = StyleSheet.create({
    progressBarArea: {
        alignItems: 'flex-start',
        width: '100%',
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    counterArea: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 28,
    },
    progressText: {
        color: '#95B55E',
        fontWeight: '600',
        fontSize: 14,
    },
});

// 계산된 값들
export const getCalculatedValues = () => {
    const { DOT_WIDTH, DOT_MARGIN, AIRPLANE_SIZE, TOTAL_QUESTIONS } = PROGRESS_CONSTANTS;
    return {
        TOTAL_DOT_ROW_WIDTH: (DOT_WIDTH + DOT_MARGIN) * TOTAL_QUESTIONS + AIRPLANE_SIZE,
    };
}; 