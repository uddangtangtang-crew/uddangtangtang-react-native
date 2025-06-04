// CategoryScreen Mock 데이터 - 실제 DTO 구조와 동일
export const MOCK_CATEGORY_RESULT = {
    isSuccess: true,
    code: "COMMON200",
    message: "성공입니다.",
    result: {
        code: "B-A-A-B",
        reason: "사용자는 여행 계획을 유연하게 세우며, 내향적 성향이 강하고, 소비에서는 실속을 중시하는 경향이 있습니다. 여행 목적이 힐링이지만 자극적 활동도 선호하여, 자유로움과 적절한 탐험 욕구를 모두 갖추고 있습니다. 이러한 특징이 '가성비 장인 원숭이' 유형과 가장 부합하며, 철저한 계획보다는 유연한 스케줄을 선호하고, 조용한 휴식을 추구하면서도 새로운 경험을 찾아 떠나는 성향이 강합니다.",
        image: "",
        description: "당신은 즉흥적인 감정과 직관에 따라 여행하는 타입입니다. 여행 계획보다는 느낌을 따르고, 가는 길에 눈에 띄는 감성적인 장소나 예쁜 소품에 이끌리듯 멈춰섭니다. 사람들과 어울리기보다는 혼자 또는 소수의 동행과 조용히 감정을 곱씹는 시간이 소중하죠.",
        typeName: "가성비 장인 원숭이",
        recommendations: [
            "제주 협재 해변 - 감성 카페, 사진 명소 넘치는 뷰 성지",
            "강릉 안목해변 - 바다와 감성 카페가 모인 필수 코스",
            "파주 감성촌 - 사진 찍기 좋고 아기자기한 감성 넘침"
        ],
        shareId: "share_1703849284_abc123def"
    }
};

// ResultScreen Mock 데이터
export const MOCK_RESULT_RESPONSE = {
    isSuccess: true,
    code: "COMMON200",
    message: "성공입니다.",
    result: {
        code: "B-A-A-B",
        reason: "사용자는 여행 계획을 유연하게 세우며, 내향적 성향이 강하고, 소비에서는 실속을 중시하는 경향이 있습니다.",
        image: "",
        description: "당신은 즉흥적인 감정과 직관에 따라 여행하는 타입입니다.",
        typeName: "자낳괴 탐험가 코끼리",
        recommendations: [
            "제주 협재 해변 - 감성 카페, 사진 명소 넘치는 뷰 성지"
        ],
        shareId: "share_1703849285_xyz789abc"
    }
};

// API 응답 구조에 맞는 Mock 궁합 결과 데이터 (LoadingScreen에서 API 실패시 사용)
export const createMockCompatibilityApiResponse = (myType, partnerType) => ({
    isSuccess: true,
    code: "COMMON200",
    message: "성공입니다.",
    result: {
        code: `${myType}-${partnerType}`,
        reason: "여행 스타일이 완전히 다른 두 사람이 만났습니다. 계획이 생명인 '계획충 쉴러'와 즉흥에 진심인 '무념무상 힐링러'의 만남은 자칫하면 충돌로 이어질 수 있지만, 서로를 잘 이해한다면 가장 이상적인 조합이 될 수 있어요.",
        image: "",
        description: "꼼꼼러는 일정을 짜고 명소를 빠짐없이 챙기며 안정감을 주고, 즉흥러는 계획에 얽매이지 않고 여행 중 발견하는 작은 재미들을 더해줍니다. 예를 들어, 오전엔 계획대로 유명 박물관을 관람하고, 오후엔 즉흥적으로 발견한 골목길 카페에서 여유를 즐기는 식이죠. 서로의 스타일을 인정하면 여행의 폭이 훨씬 넓어져요.",
        typeName: "궁합 결과 예시",
        recommendations: [
            "서로 다른 관점으로 더 풍부한 여행 경험을 만들어보세요",
            "계획과 즉흥의 완벽한 밸런스를 맞춰보세요",
            "새로운 것을 배우며 성장하는 관계를 만들어가세요"
        ],
        shareId: "share_1703849286_compatibility_456"
    }
});