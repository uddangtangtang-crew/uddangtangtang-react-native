// 궁합도에 따른 색상 결정
export const getCompatibilityColor = (score) => {
    if (score >= 80) return '#4CAF50'; // 초록색
    if (score >= 60) return '#FF9800'; // 주황색
    return '#F44336'; // 빨간색
};

// 궁합도에 따른 메시지
export const getCompatibilityMessage = (score) => {
    if (score >= 80) return '환상의 궁합! 🎉';
    if (score >= 60) return '좋은 궁합이에요! 👍';
    return '서로 다른 매력이 있어요! 💫';
};

// 결과 텍스트를 기반으로 궁합도 점수를 계산하는 함수
export const calculateCompatibilityScore = (resultText) => {
    if (!resultText) return 70;
    
    const text = resultText.toLowerCase();
    
    // 긍정적인 키워드들
    const positiveKeywords = ['완벽', '환상', '최고', '훌륭', '좋은', '멋진', '이상적'];
    // 부정적인 키워드들
    const negativeKeywords = ['어려운', '힘든', '주의', '조심', '갈등', '충돌'];
    
    let score = 70; // 기본 점수
    
    positiveKeywords.forEach(keyword => {
        if (text.includes(keyword)) score += 5;
    });
    
    negativeKeywords.forEach(keyword => {
        if (text.includes(keyword)) score -= 5;
    });
    
    // 점수를 50-95 범위로 제한
    return Math.max(50, Math.min(95, score));
}; 