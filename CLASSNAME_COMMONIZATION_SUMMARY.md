# className 공통화 작업 요약

## 완료된 작업

### 1. 공통 CSS 파일 생성
- `src/shared/styles/company-common.css` 생성
- Company 페이지에서 반복되는 패턴을 공통 클래스로 추출

### 2. 주요 공통화된 패턴

#### ✅ 아이콘 컨테이너
- **이전**: `w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0`
- **이후**: `icon-container`

#### ✅ 정보 아이템 (아이콘 + 텍스트)
- **이전**: `flex items-start gap-4` + 개별 스타일
- **이후**: `info-item`, `info-item-content`, `info-item-title`, `info-item-text`

#### ✅ 배지/태그
- **이전**: `inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-bold flex-shrink-0`
- **이후**: `badge-blue`, `badge-green`, `badge-red`, `badge-yellow`

#### ✅ 버튼 스타일
- **이전**: 복잡한 조건부 className
- **이후**: `btn-company-active`, `btn-company-inactive`, `btn-company-download`

#### ✅ 배경 박스
- **이전**: `bg-blue-50/50 rounded-xl p-6`
- **이후**: `bg-box-blue`, `bg-box-slate`

#### ✅ 맵 컨테이너
- **이전**: `h-[600px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative group`
- **이후**: `map-container`, `map-overlay`, `map-overlay-content`

## 적용된 위치

### CompanyPage.tsx
1. **찾아오는 길 페이지** (`location` 탭)
   - 아이콘 컨테이너 → `icon-container`
   - 정보 아이템 → `info-item`, `info-item-content`, `info-item-title`
   - 배지 → `badge-blue`, `badge-green`, `badge-red`, `badge-yellow`
   - 배경 박스 → `bg-box-blue`, `bg-box-slate`
   - 맵 컨테이너 → `map-container`, `map-overlay`, `map-overlay-content`

2. **연혁 페이지** (`history` 탭)
   - 탭 버튼 → `btn-company-active`, `btn-company-inactive`

3. **CI 소개 페이지** (`ci` 탭)
   - 다운로드 버튼 → `btn-company-download`

## 추가 공통화 가능한 패턴

다음 패턴들도 공통화할 수 있습니다:

### 1. 섹션 헤더
```tsx
// 현재
<div className="text-center mb-12">
  <h3 className="text-3xl font-bold text-slate-900">제목</h3>
</div>

// 공통화 후
<div className="section-header">
  <h3 className="section-title">제목</h3>
</div>
```

### 2. 카드 스타일
```tsx
// 현재
<div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">

// 공통화 후
<div className="card-company-feature">
```

### 3. 그리드 레이아웃
```tsx
// 현재
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

// 공통화 후
<div className="grid-company">
```

## 사용 방법

### 1. CSS 파일 import 확인
`src/app/index.css`에 이미 import되어 있습니다:
```css
@import "../shared/styles/company-common.css";
```

### 2. 클래스 사용
```tsx
// 아이콘 컨테이너
<div className="icon-container">
  <Icon />
</div>

// 정보 아이템
<div className="info-item">
  <div className="icon-container">...</div>
  <div className="info-item-content">...</div>
</div>

// 배지
<span className="badge-blue">간선</span>
```

## 퍼블리셔를 위한 수정 가이드

### 색상 변경
`src/shared/styles/company-common.css` 파일을 열어 직접 수정:

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
.info-item {
  gap: 1rem; /* 원하는 간격으로 변경 */
}
```

## 장점

1. **일관성**: 동일한 스타일이 일관되게 적용됨
2. **유지보수성**: 한 곳에서 수정하면 전체에 반영
3. **가독성**: className이 간결해져 코드가 읽기 쉬움
4. **재사용성**: 다른 페이지에서도 동일한 클래스 사용 가능

## 다음 단계

추가로 공통화할 수 있는 패턴:
- 섹션 헤더 패턴
- 카드 스타일 패턴
- 그리드 레이아웃 패턴
- 타이틀 + 구분선 조합 패턴

필요시 `company-common.css`에 추가 클래스를 정의하고 `CompanyPage.tsx`에 적용할 수 있습니다.



