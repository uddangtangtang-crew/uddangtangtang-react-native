# 우당탕탕 여행 궁합 테스트 ✈️
## 📱 앱 소개
![우당탕탕 여행 궁합 발표 자료](https://github.com/user-attachments/assets/b9814fc4-3b28-4b74-afb7-263f573d11d0)
> 여행 성향 기반 심리 테스트로 나만의 여행 스타일을 발견하고, 여행 동행자와의 궁합을 확인해보세요!

### 🎯 주요 기능
- **여행 성향 테스트**: 12개의 질문을 통해 개인의 여행 스타일 분석
- **8가지 여행 유형**: 각자만의 고유한 여행 성향으로 분류
  - 🛟 계획충 쉴러 곰
  - 🎯 자낳괴 탐험가 코끼리  
  - 🧑‍✈️ 단톡방 총무 고양이
  - 📦 패키지 러버 토끼
  - 💸 가성비 장인 원숭이
  - 🧃 감성 도파민러 돼지
  - 🐚 무념무상 힐링러 병아리
  - 🧃 온도차 낭만파 강아지
- **여행 궁합 테스트**: 두 사람의 여행 스타일 호환성 분석
- **궁합네컷 생성**: AI 생성 이미지로 궁합 결과를 시각화
- **결과 공유**: 카카오톡, URL 복사 등 다양한 공유 기능
- **실시간 통계**: 테스트 참여자 수 실시간 표시

### 🌟 특징
- **직관적인 UI/UX**: 귀여운 동물 캐릭터와 감성적인 디자인
- **크로스 플랫폼**: iOS, Android, Web에서 모두 사용 가능
- **AI 기반 분석**: 백엔드 AI 서버와 연동하여 정확한 분석 결과 제공
- **반응형 디자인**: 다양한 화면 크기에 최적화
- **실시간 분석**: Google Tag Manager와 Firebase Analytics 연동

## 🛠 기술 스택

### Frontend
- **React Native**: `0.72.10` - 크로스 플랫폼 모바일 앱 개발
- **Expo**: `^49.0.7` - 개발 및 배포 플랫폼
- **React Navigation**: `^7.1.9` - 화면 네비게이션
- **Zustand**: `^5.0.4` - 가벼운 상태 관리
- **React Native Reanimated**: `~3.3.0` - 고성능 애니메이션

### UI/UX
- **Expo Linear Gradient**: 그라데이션 배경
- **React Native SVG**: 벡터 그래픽 지원
- **Lottie React Native**: 고품질 애니메이션
- **React Native Vector Icons**: 아이콘 라이브러리
- **@lottiefiles/dotlottie-react**: 추가 애니메이션 지원

### 분석 & 추적
- **Firebase Analytics**: 사용자 행동 분석
- **Google Tag Manager**: 이벤트 추적 및 마케팅 분석
- **Vercel Analytics**: 웹 성능 모니터링

### 공유 기능
- **React Native Kakao Share Link**: 카카오톡 공유
- **Deep Linking**: 결과 페이지 직접 링크 공유

### 개발 도구
- **Metro**: React Native 번들러
- **Babel**: JavaScript 컴파일러
- **Jest**: 단위 테스트 프레임워크
- **React Native Dotenv**: 환경변수 관리

### 배포
- **Vercel**: 웹 버전 배포
- **Expo Build**: 모바일 앱 빌드

## 🏗 아키텍처

### 프로젝트 구조

```
UddangtangtangApp/
├── src/                    # 소스 코드
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── common/         # 공통 컴포넌트 (Button, LoadingIndicator, ShareButtons 등)
│   │   ├── matching/       # 궁합 테스트 관련 컴포넌트
│   │   └── web/            # 웹 전용 컴포넌트 (KakaoSDK)
│   ├── screens/            # 화면 컴포넌트
│   │   ├── HomeScreen.js           # 홈 화면
│   │   ├── OnboardingScreen.js     # 온보딩 화면
│   │   ├── ResultScreen.js         # 테스트 진행 화면
│   │   ├── CategoryScreen.js       # 개인 유형 결과 화면
│   │   ├── MatchingScreen.js       # 궁합 테스트 화면
│   │   ├── LoadingScreen.js        # 로딩 화면
│   │   ├── MatchingResultScreen.js # 궁합 결과 화면
│   │   ├── PhotoStoryScreen.js     # 궁합네컷 생성 화면
│   │   ├── SharedResultScreen.js   # 공유된 개인 결과 화면
│   │   ├── SharedCompatibilityResultScreen.js # 공유된 궁합 결과 화면
│   │   └── SharedPhotoStoryScreen.js # 공유된 궁합네컷 화면
│   ├── navigation/         # 네비게이션 설정
│   │   └── AppNavigator.js # React Navigation 설정
│   ├── hooks/              # 커스텀 훅
│   │   ├── useMatching.js  # 궁합 테스트 로직
│   │   ├── useResultScreen.js # 결과 화면 로직
│   │   ├── useCategoryScreen.js # 카테고리 화면 로직
│   │   ├── useHomeScreen.js # 홈 화면 로직
│   │   ├── useLoadingScreen.js # 로딩 화면 로직
│   │   ├── useMatchingResultScreen.js # 궁합 결과 화면 로직
│   │   └── useOnboardingScreen.js # 온보딩 화면 로직
│   ├── constants/          # 상수 정의
│   │   ├── questions.js    # 테스트 질문 데이터 (12개)
│   │   ├── personalities.js # 8가지 여행 유형 정의
│   │   ├── travelTypes.js  # 여행 유형 목록
│   │   ├── images.js       # 이미지 경로 상수
│   │   ├── theme.js        # 테마 및 스타일 상수
│   │   ├── categories.js   # 카테고리 상수
│   │   ├── kakao.js        # 카카오 관련 상수
│   │   ├── texts.js        # 텍스트 상수
│   │   └── mockData.js     # 개발용 Mock 데이터
│   ├── services/           # API 및 외부 서비스
│   │   └── api.js          # 백엔드 API 통신
│   ├── config/             # 설정 파일
│   │   ├── env.js          # 환경변수 설정
│   │   └── firebase.js     # Firebase 설정
│   ├── utils/              # 유틸리티 함수
│   │   ├── calculateResult.js # 유형 계산 로직
│   │   ├── compatibilityUtils.js # 궁합 계산 유틸
│   │   ├── getPersonalityInfo.js # 성격 정보 조회
│   │   ├── imageUtils.js   # 이미지 처리 유틸
│   │   ├── kakaoShare.js   # 카카오 공유 유틸
│   │   ├── textUtils.js    # 텍스트 처리 유틸
│   │   └── answerFormatter.js # 답변 포맷팅
│   ├── store/              # 상태 관리
│   │   └── useQuizStore.js # 퀴즈 상태 관리
│   ├── styles/             # 스타일 정의
│   │   ├── common.js       # 공통 스타일
│   │   ├── matchingStyles.js # 궁합 화면 스타일
│   │   ├── onboard.js      # 온보딩 스타일
│   │   └── progressBar.js  # 진행바 스타일
│   └── App.js              # 앱 루트 컴포넌트
├── assets/                 # 정적 자산
│   ├── 4cut/              # 궁합네컷 이미지 (8x8 조합)
│   ├── fonts/             # 나눔스퀘어라운드 폰트
│   ├── images/            # 이미지 파일
│   └── icons/             # 아이콘 파일
├── public/                # 웹용 정적 파일
├── app.config.js          # Expo 앱 설정
├── package.json           # 프로젝트 의존성
├── babel.config.js        # Babel 설정
├── metro.config.js        # Metro 번들러 설정
└── vercel.json            # Vercel 배포 설정
```

### 주요 아키텍처 패턴

#### 1. **Component-Based Architecture**
- 재사용 가능한 컴포넌트 구조
- Common 컴포넌트와 Specific 컴포넌트 분리
- Props를 통한 데이터 전달

#### 2. **Custom Hooks Pattern**
- 비즈니스 로직을 커스텀 훅으로 분리
- 컴포넌트의 재사용성과 테스트 용이성 향상
- 상태 관리 로직의 캡슐화

#### 3. **Constants-Driven Development**
- 모든 상수값을 별도 파일로 관리
- 하드코딩 방지 및 유지보수성 향상
- 테마, 색상, 텍스트 등 중앙 집중 관리

#### 4. **Service Layer Pattern**
- API 통신 로직을 서비스 레이어로 분리
- 에러 핸들링 및 재시도 로직 포함
- 환경별 API 엔드포인트 관리

#### 5. **Analytics Integration**
- Firebase Analytics와 GTM 연동
- 사용자 행동 추적 및 이벤트 로깅
- 성능 모니터링

## 🔄 개발 플로우

### 1. 테스트 플로우
```
홈 화면 → 온보딩 → 질문 응답 (12개) → 로딩 → 개인 결과 → 궁합 테스트 → 궁합 결과 → 궁합네컷 생성
```

### 2. 공유 플로우
```
결과 화면 → 공유 버튼 → 카카오톡/URL 복사 → Deep Link로 결과 페이지 접근
```

### 3. 상태 관리
- **Zustand**를 사용한 가벼운 전역 상태 관리
- 각 화면별 로컬 상태와 커스텀 훅 활용
- API 응답 데이터의 효율적인 캐싱

### 4. API 통신
- RESTful API 기반 백엔드 통신
- 환경변수를 통한 API 엔드포인트 관리
- 에러 발생 시 Fallback 로직

## 🎨 UI/UX 특징

### 디자인 시스템
- **컬러 팔레트**: 따뜻한 노란색 계열 그라데이션
- **타이포그래피**: 나눔스퀘어라운드 폰트 사용
- **아이콘**: 귀여운 동물 캐릭터 기반 일러스트
- **애니메이션**: Lottie를 활용한 부드러운 전환 효과

### 반응형 디자인
- 모바일 우선 설계
- 태블릿 및 웹 환경 지원
- 다양한 화면 크기에 최적화

## 🚀 배포 및 운영

### 웹 배포
- **Vercel**: 자동 배포 및 CDN
- **HTTPS**: 보안 연결 보장
- **성능 최적화**: 이미지 최적화 및 번들 크기 최소화
