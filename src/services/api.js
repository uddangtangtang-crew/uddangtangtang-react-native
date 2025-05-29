import { ENV } from '../config/env';

// API 기본 URL (환경변수에서 가져옴)
const API_BASE_URL = ENV.API_BASE_URL;

export const getTravelTypeResult = async (answers) => {
  try {
    const apiUrl = `${API_BASE_URL}/ai/type/test`;
      
    console.log('API 호출 시작:', apiUrl);
    console.log('전송 데이터:', answers);
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    });

    console.log('응답 상태:', response.status);
    const data = await response.json();
    console.log('응답 데이터:', data);

    if (response.ok && data.isSuccess) {
      return {
        success: true,
        data: data,
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
      error: '네트워크 오류가 발생했습니다.',
    };
  }
}; 