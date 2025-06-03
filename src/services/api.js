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
      // 서버 에러 시 원하는 형태로 응답 반환
      return {
        success: false,
        code: data.code || "COMMON_500",
        message: data.message || "서버 에러, 관리자에게 문의 바랍니다.",
      };
    }
  } catch (error) {
    console.error('API 호출 오류:', error);
    // 네트워크 에러 시에도 동일한 형태로 응답 반환
    return {
      success: false,
      code: "NETWORK_ERROR",
      message: error.message || "네트워크 오류가 발생했습니다.",
    };
  }
};

export const getCompatibilityResult = async (myType, otherType) => {
  try {
    const apiUrl = `${API_BASE_URL}/ai/type/compatibility`;
      
    console.log('궁합 API 호출 시작:', apiUrl);
    console.log('전송 데이터:', { myType, otherType });
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        myType,
        otherType
      }),
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
      // 서버 에러 시 원하는 형태로 응답 반환
      return {
        success: false,
        code: data.code || "COMMON_500",
        message: data.message || "서버 에러, 관리자에게 문의 바랍니다.",
      };
    }
  } catch (error) {
    console.error('궁합 API 호출 오류:', error);
    // 네트워크 에러 시에도 동일한 형태로 응답 반환
    return {
      success: false,
      code: "NETWORK_ERROR",
      message: error.message || "네트워크 오류가 발생했습니다.",
    };
  }
};

export const getTestCount = async () => {
  try {
    const apiUrl = `${API_BASE_URL}/ai/type/test-count`;
      
    console.log('테스트 참여자 수 API 호출 시작:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
      // 서버 에러 시 원하는 형태로 응답 반환
      return {
        success: false,
        code: data.code || "COMMON_500",
        message: data.message || "서버 에러, 관리자에게 문의 바랍니다.",
      };
    }
  } catch (error) {
    console.error('테스트 참여자 수 API 에러:', error);
    // 네트워크 에러 시에도 동일한 형태로 응답 반환
    return {
      success: false,
      code: "NETWORK_ERROR",
      message: error.message || "네트워크 오류가 발생했습니다.",
    };
  }
}; 