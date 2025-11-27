# 컴포넌트 사용 예시

퍼블리셔가 쉽게 참고할 수 있는 컴포넌트 사용 예시입니다.

## Button 컴포넌트

```tsx
import { Button } from '@/shared/ui';

// Primary 버튼
<Button variant="primary" size="md">
  클릭하기
</Button>

// Secondary 버튼
<Button variant="secondary" size="lg">
  확인
</Button>

// Outline 버튼
<Button variant="outline" size="sm">
  취소
</Button>

// Ghost 버튼
<Button variant="ghost">
  더보기
</Button>
```

## Card 컴포넌트

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/ui';

// 기본 카드
<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
  </CardHeader>
  <CardContent>
    카드 내용입니다.
  </CardContent>
  <CardFooter>
    <Button variant="primary">액션</Button>
  </CardFooter>
</Card>

// 그림자가 큰 카드
<Card elevated>
  <CardContent>내용</CardContent>
</Card>

// 호버 효과 없는 카드
<Card hover={false}>
  <CardContent>내용</CardContent>
</Card>
```

## Section 컴포넌트

```tsx
import { Section, SectionTitle, SectionDescription } from '@/shared/ui';

// 기본 섹션
<Section>
  <SectionTitle align="center">섹션 제목</SectionTitle>
  <SectionDescription align="center">
    섹션 설명입니다.
  </SectionDescription>
  {/* 섹션 내용 */}
</Section>

// 배경색이 있는 섹션
<Section background="gray" spacing="lg">
  <SectionTitle>회색 배경 섹션</SectionTitle>
</Section>

// 다크 배경 섹션
<Section background="dark" spacing="md">
  <SectionTitle>다크 배경 섹션</SectionTitle>
</Section>

// 그라데이션 배경
<Section background="gradient" spacing="lg">
  <SectionTitle>그라데이션 배경</SectionTitle>
</Section>
```

## CSS 변수 직접 사용

```tsx
// 인라인 스타일로 CSS 변수 사용
<div style={{
  backgroundColor: 'var(--color-primary)',
  padding: 'var(--spacing-lg)',
  borderRadius: 'var(--radius-lg)'
}}>
  내용
</div>

// CSS 파일에서 사용
.my-custom-class {
  color: var(--color-brand-sky-blue);
  margin: var(--spacing-xl);
  font-size: var(--font-size-lg);
}
```

## 유틸리티 클래스 사용

```tsx
// 카드 스타일
<div className="card-softone">
  카드 내용
</div>

// 버튼 스타일
<button className="btn-softone btn-softone-primary">
  버튼
</button>

// 타이포그래피
<h1 className="heading-1">큰 제목</h1>
<h2 className="heading-2">중간 제목</h2>
<h3 className="heading-3">작은 제목</h3>
<p className="text-body">본문 텍스트</p>

// 섹션 간격
<section className="section-spacing">
  섹션 내용
</section>
```

## Tailwind 클래스와 함께 사용

```tsx
// 브랜드 색상
<div className="bg-primary text-white">Primary 배경</div>
<div className="bg-secondary text-white">Secondary 배경</div>
<div className="bg-brand-purple text-white">Purple 배경</div>

// 커스텀 간격
<div className="py-section">섹션 간격</div>
<div className="py-section-sm">작은 섹션 간격</div>

// 커스텀 보더 반경
<div className="rounded-softone">SoftOne 반경</div>
<div className="rounded-softone-lg">큰 SoftOne 반경</div>

// 커스텀 그림자
<div className="shadow-softone">SoftOne 그림자</div>
<div className="shadow-softone-lg">큰 SoftOne 그림자</div>
```

## 반응형 그리드

```tsx
// 자동 맞춤 그리드
<div className="grid-auto-fit">
  <div>아이템 1</div>
  <div>아이템 2</div>
  <div>아이템 3</div>
</div>

// 자동 채우기 그리드
<div className="grid-auto-fill">
  <div>아이템 1</div>
  <div>아이템 2</div>
</div>
```

## 애니메이션

```tsx
// 페이드 인
<div className="animate-fade-in">
  페이드 인 효과
</div>

// 슬라이드 업
<div className="animate-slide-up">
  슬라이드 업 효과
</div>
```

## 스타일 커스터마이징

컴포넌트에 추가 클래스를 전달하여 스타일을 커스터마이징할 수 있습니다:

```tsx
<Button 
  variant="primary" 
  className="w-full max-w-md mx-auto"
>
  전체 너비 버튼
</Button>

<Card className="bg-gradient-to-r from-primary to-secondary">
  <CardContent className="text-white">
    그라데이션 배경 카드
  </CardContent>
</Card>
```

