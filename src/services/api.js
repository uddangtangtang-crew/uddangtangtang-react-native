import { ENV } from '../config/env';

// API 기본 URL (환경변수에서 가져옴)
const API_BASE_URL = ENV.API_BASE_URL;

// 개발 환경에서 CORS 문제 해결을 위한 프록시 (임시)
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

export const getTravelTypeResult = async (answers) => {
  try {
    // 웹 환경에서는 프록시 사용, 모바일에서는 직접 호출
    const apiUrl = ENV.IS_WEB 
      ? `${PROXY_URL}${API_BASE_URL}/ai/type/test`
      : `${API_BASE_URL}/ai/type/test`;
      
    console.log('API 호출 시작:', apiUrl);
    console.log('전송 데이터:', answers);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(ENV.IS_WEB && { 'X-Requested-With': 'XMLHttpRequest' })
      },
      body: JSON.stringify(answers),
    });

    console.log('응답 상태:', response.status);
    const data = await response.json();
    console.log('응답 데이터:', data);

    if (response.ok && data.isSuccess) {
      return {
        success: true,
        data: data.result,
      };
    } else {
      return {
        success: false,
        error: data.message || '서버 오류가 발생했습니다.',
      };
    }
  } catch (error) {
    console.error('API 호출 오류:', error);
    return {
      success: false,
      error: '네트워크 오류가 발생했습니다. 백엔드 CORS 설정을 확인해주세요.',
    };
  }
}; 