// CategoryScreen Mock 데이터
export const MOCK_CATEGORY_RESULT = {
    code: "B-A-A-B",
    reason: "사용자는 여행 계획을 유연하게 세우며, 내향적 성향이 강하고, 소비에서는 실속을 중시하는 경향이 있습니다. 여행 목적이 힐링이지만 자극적 활동도 선호하여, 자유로움과 적절한 탐험 욕구를 모두 갖추고 있습니다. 이러한 특징이 '가성비 장인 원숭이' 유형과 가장 부합하며, 철저한 계획보다는 유연한 스케줄을 선호하고, 조용한 휴식을 추구하면서도 새로운 경험을 찾아 떠나는 성향이 강합니다.",
    keyword: "#유연한 여행 #내향적 휴식 #실속파 #힐링과 자극 둘 다",
    image: null,
    description: "당신은 즉흥적인 감정과 직관에 따라 여행하는 타입입니다. 여행 계획보다는 느낌을 따르고, 가는 길에 눈에 띄는 감성적인 장소나 예쁜 소품에 이끌리듯 멈춰섭니다. 사람들과 어울리기보다는 혼자 또는 소수의 동행과 조용히 감정을 곱씹는 시간이 소중하죠.",
    typeName: "가성비 장인 원숭이",
    tripRecommand: "국내: 제주 협재 해변 – 감성 카페, 사진 명소 넘치는 뷰 성지\n강릉 안목해변 – 바다와 감성 카페가 모인 필수 코스\n파주 감성촌 – 사진 찍기 좋고 아기자기한 감성 넘침"
};

// ResultScreen Mock 데이터
export const MOCK_RESULT_RESPONSE = {
    isSuccess: true,
    code: "COMMON200",
    message: "성공입니다.",
    result: {
        code: "B-A-A-B",
        reason: "사용자는 여행 계획을 유연하게 세우며, 내향적 성향이 강하고, 소비에서는 실속을 중시하는 경향이 있습니다.",
        keyword: "#유연한 여행 #내향적 휴식 #실속파 #힐링과 자극 둘 다",
        image: null,
        description: "당신은 즉흥적인 감정과 직관에 따라 여행하는 타입입니다.",
        typeName: "자낳괴 탐험가",
        tripRecommand: "국내: 제주 협재 해변 – 감성 카페, 사진 명소 넘치는 뷰 성지"
    }
};

// LoadingScreen Mock 데이터 생성 함수
export const createMockMatchingResult = (myType, partnerType) => ({
    myType,
    partnerType,
    compatibility: 85,
    description: "당신들은 서로 다른 매력을 가진 완벽한 조합입니다! 한 명은 계획적이고 다른 한 명은 자유로워서 여행에서 균형을 이룰 수 있어요.",
    pros: [
        "서로 다른 관점으로 더 풍부한 여행 경험",
        "계획과 즉흥의 완벽한 밸런스",
        "새로운 것을 배우며 성장하는 관계"
    ],
    cons: [
        "때로는 의견 충돌이 있을 수 있어요",
        "서로의 페이스에 맞춰주는 노력이 필요해요"
    ],
    recommendation: "제주도 자유여행을 추천해요! 기본 숙소와 렌터카만 예약하고 나머지는 현지에서 즉흥적으로 정해보세요."
}); 