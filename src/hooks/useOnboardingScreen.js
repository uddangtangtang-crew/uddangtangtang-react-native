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
    const currentQuestion = questions[currentIndex];

    const handleAnswer = (choice) => {
        setAnswer(currentQuestion.id, choice);
        if (currentIndex + 1 >= questions.length) {
            navigation.navigate('결과 확인하기');
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
        prevQuestion
    };
}; 