import { questions } from '../constants/questions';

export const formatAnswersForAPI = (answers) => {
  // 카테고리별로 답변 분류
  const planAnswers = [];
  const energyAnswers = [];
  const moneyAnswers = [];

  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer) {
      switch (question.category) {
        case 'plan':
          planAnswers.push(answer);
          break;
        case 'energy':
          energyAnswers.push(answer);
          break;
        case 'consume':
          moneyAnswers.push(answer);
          break;
      }
    }
  });

  // A-B-A-B 형식으로 변환
  return {
    planAnswer: planAnswers.join('-'),
    energyAnswer: energyAnswers.join('-'),
    moneyAnswer: moneyAnswers.join('-'),
  };
}; 