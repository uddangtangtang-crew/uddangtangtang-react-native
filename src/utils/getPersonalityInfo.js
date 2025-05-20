import { personalities } from '../constants/personalities';

/**
 * 유형 코드로 성향 정보 찾기
 * @param {string} code - 예: 'ABAA'
 * @returns {Object | undefined} - 해당 성향 정보 or undefined
 */
export function getPersonalityInfo(code) {
  return personalities.find((personality) => personality.code === code);
}
