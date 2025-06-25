import { useNavigation } from '@react-navigation/native';
import { questions } from '../constants/questions';
import { useQuizStore } from '../store/useQuizStore';
import { QUESTION_IMAGES, QUESTION_SVGS } from '../constants/images';

// OnboardingScreen의 상태와 로직을 관리하는 커스텀 훅
export const useOnboardingScreen = () => {
    const navigation = useNavigation();
    const currentIndex = useQuizStore((state) => state.currentIndex);
    const setAnswer = useQuizStore((state) => state.setAnswer);
    const nextQuestion = useQuizStore((state) => state.nextQuestion);
    const prevQuestion = useQuizStore((state) => state.prevQuestion);
    const setPartnerType = useQuizStore((state) => state.setPartnerType);
    const setIsFromSharedResult = useQuizStore((state) => state.setIsFromSharedResult);
    const partnerType = useQuizStore((state) => state.partnerType);
    const isFromSharedResult = useQuizStore((state) => state.isFromSharedResult);
    const currentQuestion = questions[currentIndex];

    const setPartnerTypeAndSharedFlag = (type, isFromShared) => {
        if (type) setPartnerType(type);
        if (isFromShared !== undefined) setIsFromSharedResult(isFromShared);
    };

    const handleAnswer = (choice) => {
        setAnswer(currentQuestion.id, choice);
        if (currentIndex + 1 >= questions.length) {
            // 테스트 완료 시 공유 결과에서 온 경우 궁합 결과 화면으로 이동
            if (isFromSharedResult && partnerType) {
                navigation.navigate('궁합 분석하는 중..', {
                    myType: null, // B의 유형은 아직 모름 (API에서 계산됨)
                    partnerType: partnerType // A의 유형
                });
            } else {
                navigation.navigate('결과 확인하기');
            }
        } else {
            nextQuestion();
        }
    };

    return {
        currentIndex,
        currentQuestion,
        questionImages: QUESTION_IMAGES,
        questionSvgs: QUESTION_SVGS,
        handleAnswer,
        prevQuestion,
        setPartnerTypeAndSharedFlag
    };
}; 