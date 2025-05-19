# 우당탕탕 여행 궁합 테스트

## 프로젝트 구조
```markdown
uddangtangtang-app/
├── node_modules/           # npm 패키지
├── src/                    # 소스 코드
│   ├── assets/             # 이미지, 폰트 등 자산
│   │   ├── images/         # 테스트 관련 이미지
│   │   │   ├── types/      # 여행 유형별 이미지
│   │   │   └── questions/  # 질문 관련 이미지
│   │   └── fonts/          # 폰트 파일
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── common/         # 공통 컴포넌트
│   │   │   ├── Button.js   # 공통 버튼 컴포넌트
│   │   │   ├── Card.js     # 카드 형태 컴포넌트
│   │   │   ├── TypeBadge.js # 여행 유형 뱃지
│   │   │   └── LoadingSpinner.js # 로딩 표시
│   │   └── specific/       # 특정 기능 컴포넌트
│   │       ├── QuestionCard.js  # 질문 카드 컴포넌트
│   │       ├── TypeDescription.js # 여행 유형 설명
│   │       ├── AnswerOption.js    # 답변 옵션 버튼
│   │       └── CompatibilityResult.js # 궁합 결과 표시
│   ├── navigation/         # 네비게이션 설정
│   │   └── AppNavigator.js # 앱 네비게이션 설정
│   ├── screens/            # 화면 컴포넌트
│   │   ├── HomeScreen.js   # 홈 화면
│   │   ├── TestScreen.js   # 테스트 진행 화면
│   │   ├── ResultScreen.js # 결과 화면
│   │   └── CompatibilityScreen.js # 궁합 화면
│   ├── services/           # API 및 외부 서비스
│   │   └── analytics.js    # 사용자 분석 서비스 (선택적)
│   ├── store/              # Zustand 상태 관리
│   │   ├── testStore.js    # 테스트 관련 상태 관리
│   │   └── compatStore.js  # 궁합 관련 상태 관리
│   ├── utils/              # 유틸리티 함수
│   │   ├── typeCalculator.js # 유형 계산 로직
│   │   └── storage.js      # 로컬 스토리지 헬퍼
│   ├── constants/          # 상수 정의
│   │   ├── questions.js    # 질문 데이터
│   │   ├── travelTypes.js  # 여행 유형 정의
│   │   ├── compatibility.js # 궁합 결과 정의
│   │   └── theme.js        # 테마 및 스타일 상수
│   ├── hooks/              # 커스텀 훅
│   │   ├── useResponsive.js # 반응형 디자인 훅
│   │   └── useProgress.js  # 테스트 진행 상태 훅
│   └── App.js              # 앱 루트 컴포넌트
├── .gitignore
├── app.json                # 앱 설정
├── babel.config.js         # Babel 설정
├── index.js                # 진입점
├── metro.config.js         # Metro 번들러 설정
├── package.json            # 프로젝트 정보 및 의존성
└── README.md
```
