import { categories } from '../constants/categories';

/**
 * 사용자 응답을 기반으로 4자리 성향 코드 반환
 * @param {Object} answers - { Q1: 'A', Q2: 'B', ... Q12: 'A' }
 * @returns {string} 예: 'AABA'
 */
export function calculateResultCode(answers) {
  const getMajority = (questionIds) => {
    const score = questionIds.reduce((acc, id) => {
      if (!answers[id]) return acc; // 혹시 빠진 문항이 있으면 무시
      return acc + (answers[id] === 'A' ? 1 : -1);
    }, 0);
    return score >= 0 ? 'A' : 'B';
  };

  const planCode = getMajority(categories.plan);       // 예: Q1~Q3
  const energyCode = getMajority(categories.energy);   // 예: Q4~Q6
  const consumeCode = getMajority(categories.consume); // 예: Q7~Q9
  const purposeCode = getMajority(categories.purpose); // 예: Q10~Q12

  return `${planCode}${energyCode}${consumeCode}${purposeCode}`; // 예: 'ABAB'
}
