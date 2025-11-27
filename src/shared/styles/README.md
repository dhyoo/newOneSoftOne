# SoftOne 스타일 가이드

이 디렉토리는 SoftOne 프로젝트의 공통 스타일을 관리합니다. 퍼블리셔가 쉽게 수정할 수 있도록 구조화되어 있습니다.

## 파일 구조

```
src/shared/styles/
├── theme.css          # 브랜드 테마 변수 (색상, 간격, 타이포그래피 등)
├── utilities.css      # 재사용 가능한 유틸리티 클래스
└── README.md         # 이 파일
```

## 사용 방법

### 1. CSS 변수 사용

`theme.css`에 정의된 CSS 변수를 사용하여 일관된 스타일을 적용할 수 있습니다.

```css
.my-component {
  background-color: var(--color-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
}
```

### 2. 유틸리티 클래스 사용

`utilities.css`에 정의된 클래스를 직접 사용할 수 있습니다.

```jsx
<div className="card-softone">
  <h2 className="heading-2">제목</h2>
  <p className="text-body">내용</p>
</div>
```

### 3. Tailwind와 함께 사용

Tailwind config에 브랜드 색상이 정의되어 있으므로 Tailwind 클래스도 사용 가능합니다.

```jsx
<div className="bg-primary text-white p-4 rounded-softone">
  Primary 색상 배경
</div>
```

## 브랜드 색상

### Primary Colors
- **Sky Blue**: `#1C94D2` - `--color-brand-sky-blue`
- **Blue**: `#0A67B2` - `--color-brand-blue` (Primary)
- **Purple**: `#31347F` - `--color-brand-purple`
- **Gray**: `#414042` - `--color-brand-gray`

### Tailwind 클래스
- `bg-primary` / `text-primary` - Primary Blue
- `bg-secondary` / `text-secondary` - Sky Blue
- `bg-brand-purple` / `text-brand-purple` - Purple
- `bg-brand-gray` / `text-brand-gray` - Gray

## 간격 시스템

표준 간격 값:
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px
- `--spacing-3xl`: 64px
- `--spacing-4xl`: 96px

## 타이포그래피

### 폰트 크기
- `--font-size-xs`: 12px
- `--font-size-sm`: 14px
- `--font-size-base`: 16px
- `--font-size-lg`: 18px
- `--font-size-xl`: 20px
- `--font-size-2xl`: 24px
- `--font-size-3xl`: 30px
- `--font-size-4xl`: 36px

### 유틸리티 클래스
- `.heading-1` - 큰 제목 (36px, bold)
- `.heading-2` - 중간 제목 (30px, bold)
- `.heading-3` - 작은 제목 (24px, semibold)
- `.text-body` - 본문 (16px, relaxed line-height)
- `.text-body-lg` - 큰 본문 (18px, relaxed line-height)

## 재사용 가능한 컴포넌트 스타일

### 카드
```jsx
<div className="card-softone">
  카드 내용
</div>

<div className="card-softone card-softone-elevated">
  그림자가 더 큰 카드
</div>
```

### 버튼
```jsx
<button className="btn-softone btn-softone-primary">
  Primary 버튼
</button>

<button className="btn-softone btn-softone-secondary">
  Secondary 버튼
</button>

<button className="btn-softone btn-softone-outline">
  Outline 버튼
</button>
```

### 섹션 간격
```jsx
<section className="section-spacing">
  표준 섹션 간격 (96px)
</section>

<section className="section-spacing-sm">
  작은 섹션 간격 (48px)
</section>

<section className="section-spacing-lg">
  큰 섹션 간격 (128px)
</section>
```

## 수정 방법

### 색상 변경
`theme.css`의 `:root` 섹션에서 CSS 변수를 수정하세요.

```css
:root {
  --color-primary: #0A67B2; /* 원하는 색상으로 변경 */
}
```

### 간격 조정
`theme.css`의 간격 변수를 수정하세요.

```css
:root {
  --spacing-lg: 1.5rem; /* 원하는 값으로 변경 */
}
```

### 새로운 유틸리티 클래스 추가
`utilities.css`에 새로운 클래스를 추가하세요.

```css
.my-utility-class {
  /* 스타일 정의 */
}
```

## 주의사항

1. **CSS 변수 우선**: 가능한 한 CSS 변수를 사용하여 일관성을 유지하세요.
2. **브랜드 가이드 준수**: 색상 변경 시 CI 가이드를 확인하세요.
3. **반응형 고려**: 모바일과 데스크톱에서 모두 잘 작동하는지 확인하세요.
4. **접근성**: 색상 대비와 포커스 스타일을 고려하세요.

## 참고

- Tailwind Config: `tailwind.config.js`
- 브랜드 CI 색상: `src/shared/lib/mockData.ts`의 `company.ci.color.palette`

