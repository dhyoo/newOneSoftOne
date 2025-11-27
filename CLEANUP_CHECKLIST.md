# 폴더 구조 정리 체크리스트

## 발견된 문제점

### 1. 중복 파일들 (제거 필요)

#### Feature 폴더 내 중복
- ❌ `src/features/company/KakaoMap.tsx` → `src/features/company/components/KakaoMap.tsx`로 이동됨
- ❌ `src/features/business/ServiceCard.tsx` → `src/features/business/components/ServiceCard.tsx`로 이동됨
- ❌ `src/features/hero/Hero.tsx` → `src/features/home/components/Hero.tsx`로 이동됨

#### Shared 폴더 중복
- ❌ `src/shared/assets/img_organization.png` → `src/features/company/assets/`로 이동됨
- ❌ `src/shared/assets/logo_ci.png` → `src/features/company/assets/`로 이동됨
- ❌ `src/shared/types/company.ts` → `src/features/company/types/index.ts`로 이동됨

### 2. 사용되지 않는 폴더 (제거 가능)

- ❌ `src/pages/` 폴더 전체 - routes.tsx가 feature 경로를 사용하므로 더 이상 사용되지 않음
- ❌ `src/features/hero/` 폴더 - home feature로 통합됨

### 3. 정리 후 예상 구조

```
src/
├── app/                    # 앱 진입점
├── features/               # Feature 모듈
│   ├── company/
│   │   ├── components/     ✅ KakaoMap.tsx
│   │   ├── pages/         ✅ CompanyPage.tsx
│   │   ├── types/         ✅ index.ts
│   │   ├── utils/         ✅ mockData.ts
│   │   └── assets/        ✅ 이미지들
│   ├── business/
│   │   ├── components/     ✅ ServiceCard.tsx
│   │   └── ...
│   ├── home/
│   │   ├── components/     ✅ Hero.tsx
│   │   └── ...
│   └── ...
└── shared/                 # 공통 리소스
    ├── ui/                 ✅ 공통 UI 컴포넌트
    ├── styles/             ✅ 공통 스타일
    └── lib/                ✅ 공통 유틸리티
```

## 정리 작업

디자인 변경 없이 구조만 정리합니다.

