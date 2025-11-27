# 하드코딩된 Tailwind 클래스 패턴 분석 및 공통화 가능 여부

## 분석 결과 요약

전체 프로젝트를 분석한 결과, 다음과 같은 패턴들이 반복적으로 사용되고 있습니다.

## 1. 마진/패딩 클래스 (공통화 가능: ⚠️ 제한적)

### 발견된 패턴
- `mb-4` - 18회 이상 사용
- `mb-6` - 12회 이상 사용
- `mb-2` - 15회 이상 사용
- `mb-16` - 5회 사용
- `mt-16` - 3회 사용
- `py-12`, `py-16`, `py-24` - 섹션 패딩

### 공통화 가능 여부
**⚠️ 제한적**: 마진/패딩은 컨텍스트에 따라 다르게 사용되므로, 공통 클래스로 만들기보다는 CSS 변수나 유틸리티 클래스를 사용하는 것이 좋습니다.

**권장사항**: 
- 이미 `spacing-*` 클래스가 있으므로 이를 활용
- 특수한 경우만 Tailwind 마진 클래스 사용

## 2. 텍스트 스타일 조합 (공통화 가능: ✅ 높음)

### 발견된 패턴

#### 패턴 1: 제목 스타일
```tsx
// 반복: 15회 이상
text-xl font-bold text-slate-900
text-2xl font-bold text-slate-900
text-lg font-bold text-slate-900
```

#### 패턴 2: 부제목/라벨
```tsx
// 반복: 10회 이상
text-lg text-primary font-medium
font-medium text-slate-700
font-bold text-slate-700
```

#### 패턴 3: 메타 정보
```tsx
// 반복: 8회 이상
text-sm text-slate-500
text-sm text-slate-600
```

### 공통화 가능 여부
**✅ 높음**: 이미 `text-title-md`, `text-body` 등이 있지만, 추가 변형이 필요합니다.

**제안 클래스**:
- `.text-heading-xl` - `text-xl font-bold text-slate-900`
- `.text-heading-lg` - `text-lg font-bold text-slate-900`
- `.text-label` - `font-medium text-slate-700`
- `.text-meta` - `text-sm text-slate-500`

## 3. Flex 레이아웃 패턴 (공통화 가능: ✅ 높음)

### 발견된 패턴

#### 패턴 1: 중앙 정렬
```tsx
// 반복: 20회 이상
flex items-center justify-center
flex items-center justify-between
flex flex-col items-center
```

#### 패턴 2: 정렬 조합
```tsx
// 반복: 15회 이상
flex items-start gap-4
flex flex-col gap-6
flex flex-wrap gap-2
```

### 공통화 가능 여부
**✅ 높음**: 자주 사용되는 flex 패턴을 공통 클래스로 만들 수 있습니다.

**제안 클래스**:
- `.flex-center` - `flex items-center justify-center`
- `.flex-between` - `flex items-center justify-between`
- `.flex-col-center` - `flex flex-col items-center`
- `.flex-start` - `flex items-start`

## 4. 그리드 패턴 (공통화 가능: ⚠️ 부분적)

### 발견된 패턴

#### 패턴 1: 특수 그리드
```tsx
// RecruitPage benefits
grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-32
grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12
```

#### 패턴 2: 반응형 그리드
```tsx
// 이미 공통화됨: grid-responsive-*
// 하지만 특수한 gap이 필요한 경우가 있음
```

### 공통화 가능 여부
**⚠️ 부분적**: 대부분은 이미 `grid-responsive-*`로 공통화되어 있지만, 특수한 gap이 필요한 경우는 Tailwind 유지.

## 5. 호버 효과 패턴 (공통화 가능: ✅ 높음)

### 발견된 패턴

#### 패턴 1: 텍스트 색상 변경
```tsx
// 반복: 12회 이상
group-hover:text-primary
group-hover:scale-110
group-hover:bg-primary
```

#### 패턴 2: 배경색 변경
```tsx
// 반복: 8회 이상
hover:bg-slate-50
hover:bg-primary
hover:border-primary
```

### 공통화 가능 여부
**✅ 높음**: 호버 효과는 공통 클래스에 포함시키는 것이 좋습니다.

**제안**: 기존 공통 클래스에 호버 효과가 이미 포함되어 있으므로, 추가 공통화는 선택적.

## 6. 컨테이너 패턴 (공통화 가능: ✅ 높음)

### 발견된 패턴

#### 패턴 1: 중앙 정렬 컨테이너
```tsx
// 반복: 15회 이상
max-w-4xl mx-auto
max-w-5xl mx-auto
max-w-2xl mx-auto
max-w-3xl mx-auto
```

#### 패턴 2: 섹션 컨테이너
```tsx
// 반복: 10회 이상
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### 공통화 가능 여부
**✅ 높음**: 컨테이너 패턴은 공통 클래스로 만들기 좋습니다.

**제안 클래스**:
- `.container-center-sm` - `max-w-2xl mx-auto`
- `.container-center-md` - `max-w-4xl mx-auto`
- `.container-center-lg` - `max-w-5xl mx-auto`
- `.container-section` - `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

## 7. 배경/테두리 패턴 (공통화 가능: ⚠️ 부분적)

### 발견된 패턴

#### 패턴 1: 배경색
```tsx
// 반복: 20회 이상
bg-slate-100
bg-slate-50
bg-white
bg-primary
bg-secondary
```

#### 패턴 2: 테두리
```tsx
// 반복: 10회 이상
rounded-2xl
rounded-full
rounded-lg
border border-slate-200
```

### 공통화 가능 여부
**⚠️ 부분적**: 대부분은 이미 공통 클래스에 포함되어 있지만, 일부 특수한 경우는 Tailwind 유지.

## 8. 전환 효과 (공통화 가능: ✅ 높음)

### 발견된 패턴

#### 패턴 1: 전환 효과 조합
```tsx
// 반복: 15회 이상
transition-colors
transition-all
transition-transform
group-hover:transition-colors
```

### 공통화 가능 여부
**✅ 높음**: 전환 효과는 공통 클래스에 포함시키는 것이 좋습니다.

**제안**: 이미 공통 클래스에 포함되어 있으므로 추가 작업 불필요.

## 9. 특수 레이아웃 패턴 (공통화 가능: ❌ 낮음)

### 발견된 패턴

#### 패턴 1: 절대 위치
```tsx
// 특수한 경우만 사용
absolute left-[2.25rem] top-8 bottom-8
absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
```

#### 패턴 2: 반응형 숨김
```tsx
// 반복: 5회
hidden md:block
hidden lg:flex
```

### 공통화 가능 여부
**❌ 낮음**: 특수한 레이아웃은 Tailwind 유지하는 것이 좋습니다.

## 공통화 우선순위

### 🔴 높은 우선순위 (즉시 공통화 권장)

1. **텍스트 스타일 조합**
   - `text-heading-xl`, `text-heading-lg`, `text-label`, `text-meta`

2. **컨테이너 패턴**
   - `container-center-sm`, `container-center-md`, `container-center-lg`, `container-section`

3. **Flex 레이아웃**
   - `flex-center`, `flex-between`, `flex-col-center`

### 🟡 중간 우선순위 (선택적 공통화)

1. **마진/패딩 유틸리티**
   - `mb-section-sm`, `mb-section-md` (섹션 간격용)

2. **특수 그리드**
   - `grid-special-gap` (큰 gap이 필요한 경우)

### 🟢 낮은 우선순위 (유지 권장)

1. **특수 레이아웃**
   - 절대 위치, 복잡한 반응형 등

2. **일회성 스타일**
   - 특정 페이지에서만 사용되는 스타일

## 제안: 추가 공통 클래스

### 텍스트 스타일
```css
.text-heading-xl {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-slate-900);
}

.text-heading-lg {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-slate-900);
}

.text-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-slate-700);
}

.text-meta {
  font-size: var(--font-size-sm);
  color: var(--color-slate-500);
}
```

### Flex 레이아웃
```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

### 컨테이너
```css
.container-center-sm {
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.container-center-md {
  max-width: 56rem;
  margin-left: auto;
  margin-right: auto;
}

.container-center-lg {
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
}

.container-section {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-section {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-section {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
```

## 결론

### 공통화 가능한 패턴
- ✅ 텍스트 스타일 조합 (15+ 회 반복)
- ✅ Flex 레이아웃 (20+ 회 반복)
- ✅ 컨테이너 패턴 (15+ 회 반복)
- ✅ 호버 효과 (12+ 회 반복)

### 유지 권장 패턴
- ❌ 특수 레이아웃 (절대 위치 등)
- ❌ 일회성 스타일
- ⚠️ 마진/패딩 (컨텍스트 의존적)

### 예상 효과
- **코드 라인 감소**: 약 200-300 라인
- **일관성 향상**: 텍스트 스타일, 레이아웃 패턴 통일
- **유지보수성 향상**: 한 곳에서 수정 가능



