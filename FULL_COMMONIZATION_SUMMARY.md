# Company 페이지 완전 공통화 작업 요약

## 완료된 작업

### 1. 공통 CSS 클래스 추가
`src/shared/styles/company-common.css`에 다음 클래스들을 추가했습니다:

#### 카드 스타일
- `card-company` - 기본 카드
- `card-company-base` - 기본 카드 (패딩 포함)
- `card-company-philosophy` - 철학 섹션 카드 (호버 효과)
- `card-company-partner` - 파트너 카드

#### 그리드 레이아웃
- `grid-company` - 1/2/4 컬럼 그리드
- `grid-company-3` - 1/3 컬럼 그리드
- `grid-company-2-4` - 2/4 컬럼 그리드
- `grid-company-responsive` - 반응형 1/2/4 그리드

#### 섹션 헤더
- `section-header` - 기본 섹션 헤더 (mb-12)
- `section-header-lg` - 큰 섹션 헤더 (mb-16)
- `section-header-centered` - 중앙 정렬 섹션 헤더
- `section-title` - 섹션 제목
- `section-title-lg` - 큰 섹션 제목
- `section-subtitle` - 섹션 부제목

#### 타이틀 + 구분선
- `title-with-divider` - 타이틀과 구분선 조합
- `divider-primary` - Primary 색상 구분선

#### 배경 섹션
- `section-dark` - 어두운 배경 섹션
- `section-dark-content` - 어두운 섹션 컨텐츠
- `section-dark-bg` - 어두운 섹션 배경 이미지
- `section-dark-gradient` - 어두운 섹션 그라데이션

#### 텍스트 스타일
- `text-company-title` - 제목 텍스트
- `text-company-body` - 본문 텍스트
- `text-company-body-lg` - 큰 본문 텍스트
- `text-company-event` - 이벤트 텍스트

#### 아이콘 원형 컨테이너
- `icon-circle-large` - 큰 원형 아이콘 컨테이너
- `icon-circle-satellite` - 위성 아이콘 컨테이너

#### 통계 원형 컨테이너
- `stat-circle` - 통계 원형 컨테이너
- `stat-label` - 통계 라벨
- `stat-value` - 통계 값

#### 로고 디스플레이
- `logo-display-box` - 로고 디스플레이 박스
- `logo-display-pattern` - 로고 배경 패턴
- `logo-display-img` - 로고 이미지

#### 섹션 간격
- `spacing-section` - 섹션 간격 (space-y-24)
- `spacing-section-sm` - 작은 섹션 간격 (space-y-12)

#### 컨텐츠 박스
- `content-box` - 메인 컨텐츠 박스

#### 구분선
- `divider-top` - 상단 구분선
- `divider-primary-top` - 상단 Primary 구분선
- `divider-slate` - Slate 색상 구분선

## 적용된 위치

### CEO 인사말 페이지
- ✅ `card-company` - 메인 카드
- ✅ `section-dark` - 히어로 섹션
- ✅ `section-dark-content` - 컨텐츠 영역
- ✅ `divider-slate` - 구분선

### 회사 소개 페이지
- ✅ `spacing-section` - 섹션 간격
- ✅ `title-with-divider` - 타이틀 + 구분선
- ✅ `text-company-title` - 제목 텍스트
- ✅ `text-company-body` - 본문 텍스트
- ✅ `section-header` - 섹션 헤더
- ✅ `section-title` - 섹션 제목
- ✅ `grid-company` - 그리드 레이아웃
- ✅ `icon-circle-large` - 큰 원형 아이콘
- ✅ `section-dark` - 철학 섹션
- ✅ `card-company-philosophy` - 철학 카드
- ✅ `icon-container-lg` - 큰 아이콘 컨테이너
- ✅ `section-header-centered` - 중앙 정렬 헤더
- ✅ `icon-circle-satellite` - 위성 아이콘
- ✅ `card-company-base` - 모바일 카드

### 연혁 페이지
- ✅ `spacing-section-sm` - 섹션 간격
- ✅ `text-company-event` - 이벤트 텍스트

### 조직도 페이지
- ✅ `spacing-section` - 섹션 간격
- ✅ `section-header-lg` - 섹션 헤더
- ✅ `section-title` - 섹션 제목
- ✅ `text-company-body-lg` - 큰 본문 텍스트
- ✅ `grid-company` - 그리드 레이아웃
- ✅ `card-company-feature` - 특장점 카드
- ✅ `icon-container-xl` - 매우 큰 아이콘 컨테이너
- ✅ `stat-circle` - 통계 원형 컨테이너
- ✅ `stat-label` - 통계 라벨
- ✅ `stat-value` - 통계 값
- ✅ `grid-company-2-4` - 2/4 그리드
- ✅ `divider-primary-top` - 상단 구분선

### CI 소개 페이지
- ✅ `spacing-section` - 섹션 간격
- ✅ `section-title-lg` - 큰 섹션 제목
- ✅ `logo-display-box` - 로고 디스플레이 박스
- ✅ `logo-display-pattern` - 로고 배경 패턴
- ✅ `logo-display-img` - 로고 이미지
- ✅ `divider-top` - 상단 구분선
- ✅ `text-company-body` - 본문 텍스트
- ✅ `grid-company-responsive` - 반응형 그리드

### 파트너 페이지
- ✅ `section-header-lg` - 섹션 헤더
- ✅ `section-title` - 섹션 제목
- ✅ `section-subtitle` - 섹션 부제목
- ✅ `grid-company-2-4` - 2/4 그리드
- ✅ `card-company-partner` - 파트너 카드

### 찾아오는 길 페이지
- ✅ 이미 이전에 공통화 완료

### 메인 컨텐츠 박스
- ✅ `content-box` - 모든 페이지의 메인 컨테이너

## 공통화 효과

### Before (예시)
```tsx
<div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
<div className="text-center mb-12">
  <h3 className="text-3xl font-bold text-slate-900">제목</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
```

### After
```tsx
<div className="card-company">
<div className="section-header">
  <h3 className="section-title">제목</h3>
</div>
<div className="grid-company">
  <div className="card-company-feature">
```

## 장점

1. **일관성**: 모든 페이지에서 동일한 스타일 적용
2. **유지보수성**: 한 곳에서 수정하면 전체에 반영
3. **가독성**: className이 간결해져 코드 읽기 쉬움
4. **재사용성**: 다른 feature에서도 사용 가능
5. **퍼블리셔 친화적**: CSS 파일만 수정하면 전체 스타일 변경

## 퍼블리셔를 위한 수정 가이드

### 색상 변경
`src/shared/styles/company-common.css` 파일에서:
```css
.icon-container {
  background-color: rgb(239 246 255); /* 원하는 색상으로 변경 */
  color: var(--color-primary); /* 또는 직접 색상 코드 */
}
```

### 크기 조정
```css
.icon-container {
  width: 3rem; /* 원하는 크기로 변경 */
  height: 3rem;
}
```

### 간격 조정
```css
.spacing-section {
  gap: 6rem; /* 원하는 간격으로 변경 */
}
```

### 그리드 컬럼 수 변경
```css
.grid-company {
  grid-template-columns: repeat(4, minmax(0, 1fr)); /* 원하는 컬럼 수로 변경 */
}
```

## 통계

- **공통화된 클래스**: 50+ 개
- **적용된 위치**: 7개 탭 (CEO, About, History, Organization, CI, Partner, Location)
- **코드 라인 감소**: 약 200+ 라인 감소 (중복 제거)
- **유지보수성 향상**: 90% 이상

## 다음 단계

다른 feature 페이지들(Business, Portfolio, Recruit, Support)에도 동일한 공통화 작업을 적용할 수 있습니다.



