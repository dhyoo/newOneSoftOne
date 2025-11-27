# Company 페이지 공통 클래스 가이드

이 문서는 `company-common.css`에 정의된 공통 클래스들의 사용법을 설명합니다.

## 아이콘 컨테이너

### 기본 아이콘 컨테이너
```tsx
<div className="icon-container">
  <MapPin className="w-6 h-6" />
</div>
```

### 큰 아이콘 컨테이너
```tsx
<div className="icon-container-lg">
  <Icon className="w-8 h-8" />
</div>
```

### 매우 큰 아이콘 컨테이너
```tsx
<div className="icon-container-xl">
  <Icon className="w-10 h-10" />
</div>
```

## 정보 아이템 (아이콘 + 텍스트)

```tsx
<div className="info-item">
  <div className="icon-container">
    <MapPin className="w-6 h-6" />
  </div>
  <div className="info-item-content">
    <h4 className="info-item-title">제목</h4>
    <p className="info-item-text">내용</p>
    <p className="info-item-text-sm">부가 설명</p>
  </div>
</div>
```

## 배지/태그

```tsx
<span className="badge-blue">간선</span>
<span className="badge-green">지선</span>
<span className="badge-red">광역</span>
<span className="badge-yellow">마을</span>
<span className="badge-primary">Primary</span>
```

## 버튼 스타일

### 탭 버튼 (활성)
```tsx
<button className="btn-company-active">활성 탭</button>
```

### 탭 버튼 (비활성)
```tsx
<button className="btn-company-inactive">비활성 탭</button>
```

### 다운로드 버튼
```tsx
<button className="btn-company-download">PNG 파일</button>
```

## 배경 박스

```tsx
<div className="bg-box-blue">
  파란색 배경 박스
</div>

<div className="bg-box-slate">
  회색 배경 박스
</div>

<div className="bg-box-dark">
  어두운 배경 박스
</div>
```

## 맵 컨테이너

```tsx
<div className="lg:col-span-1 map-container group">
  <a href="..." className="block w-full h-full relative">
    <img src="..." alt="지도" className="w-full h-full object-cover" />
    <div className="map-overlay">
      <div className="map-overlay-content">
        <ExternalLink className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-slate-700">카카오맵에서 보기</span>
      </div>
    </div>
  </a>
</div>
```

## 섹션 헤더

```tsx
<div className="section-header">
  <h3 className="section-title">섹션 제목</h3>
</div>

<div className="section-header-lg">
  <h3 className="section-title-lg">큰 섹션 제목</h3>
  <p className="section-subtitle">부제목</p>
</div>
```

## 수정 방법

### 색상 변경
`company-common.css` 파일에서 직접 색상 값을 수정하거나, CSS 변수를 사용하세요.

```css
.icon-container {
  background-color: rgb(239 246 255); /* 원하는 색상으로 변경 */
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

## 주의사항

1. **Tailwind 클래스와 함께 사용**: 이 클래스들은 Tailwind 클래스와 함께 사용할 수 있습니다.
2. **반응형**: 반응형 스타일은 Tailwind의 `md:`, `lg:` 등의 클래스를 추가로 사용하세요.
3. **호버 효과**: `map-container`는 `group` 클래스와 함께 사용해야 호버 효과가 작동합니다.



