import { questions } from '../constants/questions';

export const formatAnswersForAPI = (answers) => {
  // questions 배열 순서대로 답변을 뽑아 '-'로 join
  const answerString = questions.map(q => answers[q.id] || '').join('-');
  return { answer: answerString };
}; 