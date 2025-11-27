# CSS 깊은 분석 및 수정 완료 요약

## 발견된 문제점

### 1. 중복된 클래스 정의 ⚠️
**문제**: `section-header`, `section-header-lg`, `section-title`, `section-title-lg` 등이 `common.css`와 `company-common.css`에 중복 정의되어 있었음.

**영향**: CSS 우선순위 충돌 가능성, 유지보수 어려움

**수정**: `company-common.css`에서 중복 정의 제거, `common.css`의 클래스를 사용하도록 변경

### 2. icon-box-lg 배경색 오버라이드 문제 ⚠️
**문제**: `RecruitPage` benefits 섹션에서 `icon-box-lg bg-white`로 배경색을 덮어쓰고 있었음.

**영향**: 클래스의 의도와 다르게 동작, 일관성 저하

**수정**: `icon-box-lg-white` 클래스를 새로 생성하여 흰색 배경 전용 클래스로 분리

### 3. BusinessPage ITO 섹션 공통화 부족 ⚠️
**문제**: `flex items-center bg-white p-4 rounded-lg shadow-sm` 패턴이 반복되고 있었음.

**영향**: 코드 중복, 유지보수 어려움

**수정**: `bg-box-item` 클래스를 생성하여 공통화

### 4. spacing 클래스의 flex 제약 ⚠️
**문제**: `spacing-*` 클래스가 `display: flex; flex-direction: column;`로 되어 있어, flex container가 아닌 경우 사용하기 어려움.

**영향**: 일부 레이아웃에서 제약 발생 가능

**수정**: `space-y-*` 유틸리티 클래스 추가 (flex container가 아닌 경우 사용)

## 수정된 파일

### 1. `src/shared/styles/company-common.css`
- 중복된 섹션 헤더 클래스 제거 (60-85줄, 389-422줄)
- 주석으로 common.css 사용 안내 추가

### 2. `src/shared/styles/common.css`
- `icon-box-lg-white` 클래스 추가 (흰색 배경 전용)
- `bg-box-item` 클래스 추가 (흰색 배경 아이템)
- `space-y-*` 유틸리티 클래스 추가 (flex container가 아닌 경우)

### 3. `src/features/recruit/pages/RecruitPage.tsx`
- `icon-box-lg bg-white` → `icon-box-lg-white`로 변경

### 4. `src/features/business/pages/BusinessPage.tsx`
- `flex items-center bg-white p-4 rounded-lg shadow-sm` → `bg-box-item`로 변경

## 추가된 공통 클래스

### icon-box-lg-white
```css
.icon-box-lg-white {
  width: 5rem;
  height: 5rem;
  border-radius: var(--radius-xl);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-slate-700);
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}
```

### bg-box-item
```css
.bg-box-item {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}
```

### space-y-* 유틸리티
```css
.space-y-sm > * + * { margin-top: 1rem; }
.space-y-md > * + * { margin-top: 2rem; }
.space-y-lg > * + * { margin-top: 4rem; }
.space-y-xl > * + * { margin-top: 6rem; }
```

## 개선 효과

1. **중복 제거**: CSS 클래스 중복 정의 제거로 유지보수성 향상
2. **일관성 향상**: 공통 클래스 사용으로 스타일 일관성 확보
3. **코드 간소화**: 반복되는 패턴을 공통 클래스로 추출
4. **유연성 향상**: spacing과 space-y를 선택적으로 사용 가능

## 남은 검토 사항

### 하드코딩된 Tailwind 클래스
일부 페이지에서 여전히 Tailwind 클래스를 직접 사용하고 있으나, 이는 다음 이유로 허용:
- 공통화가 어려운 특수한 레이아웃
- 일회성 스타일
- 반응형 브레이크포인트가 복잡한 경우

**권장사항**: 
- 반복되는 패턴은 계속 공통 클래스로 추출
- 일회성 스타일은 Tailwind 유지
- 새로운 패턴 발견 시 공통 클래스로 추가 검토

## 검증 완료

- ✅ 린트 오류 없음
- ✅ CSS 변수 정상 작동
- ✅ 클래스 중복 제거 완료
- ✅ 공통 클래스 적용 완료



