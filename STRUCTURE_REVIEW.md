# 폴더 구조 검토 결과

## ✅ 정리 완료된 항목

### 1. 중복 파일 제거
- ✅ `src/features/company/KakaoMap.tsx` 삭제 (components로 이동됨)
- ✅ `src/features/business/ServiceCard.tsx` 삭제 (components로 이동됨)
- ✅ `src/features/hero/Hero.tsx` 삭제 (home/components로 이동됨)
- ✅ `src/shared/types/company.ts` 삭제 (company/types로 이동됨)
- ✅ `src/shared/assets/img_organization.png` 삭제 (company/assets로 이동됨)
- ✅ `src/shared/assets/logo_ci.png` 삭제 (company/assets로 이동됨)
- ✅ `src/features/company/assets/img_organization.png` 삭제 (.jpg 사용)

### 2. 사용되지 않는 폴더 제거
- ✅ `src/pages/` 폴더 삭제 (feature로 이동됨)
- ✅ `src/features/hero/` 폴더 삭제 (home으로 통합됨)

## 📁 최종 폴더 구조

```
src/
├── app/                    # 앱 진입점 및 라우팅
│   ├── routes.tsx         ✅ feature 경로 사용
│   └── ...
├── features/               # Feature 모듈
│   ├── company/
│   │   ├── components/     ✅ KakaoMap.tsx
│   │   ├── pages/         ✅ CompanyPage.tsx
│   │   ├── types/         ✅ index.ts
│   │   ├── utils/         ✅ mockData.ts
│   │   ├── assets/         ✅ img_organization.jpg, logo_ci.png
│   │   └── index.ts
│   ├── business/
│   │   ├── components/     ✅ ServiceCard.tsx
│   │   ├── pages/         ✅ BusinessPage.tsx
│   │   ├── types/         ✅ index.ts
│   │   ├── utils/         ✅ mockData.ts
│   │   └── index.ts
│   ├── portfolio/
│   │   ├── pages/         ✅ PortfolioPage.tsx
│   │   ├── types/         ✅ index.ts
│   │   ├── utils/         ✅ mockData.ts
│   │   └── index.ts
│   ├── recruit/
│   │   ├── pages/         ✅ RecruitPage.tsx
│   │   ├── types/         ✅ index.ts
│   │   ├── utils/         ✅ mockData.ts
│   │   └── index.ts
│   ├── support/
│   │   ├── pages/         ✅ SupportPage.tsx
│   │   ├── types/         ✅ index.ts
│   │   ├── utils/         ✅ mockData.ts
│   │   └── index.ts
│   └── home/
│       ├── components/     ✅ Hero.tsx
│       ├── pages/         ✅ HomePage.tsx
│       └── index.ts
└── shared/                 # 공통 리소스
    ├── ui/                ✅ 공통 UI 컴포넌트
    ├── styles/            ✅ 공통 스타일
    └── lib/               ✅ 공통 유틸리티 (navigation, utils)
```

## ✅ 구조적 개선사항

1. **명확한 책임 분리**: 각 feature가 독립적으로 관리됨
2. **중복 제거**: 모든 중복 파일 정리 완료
3. **일관된 구조**: 모든 feature가 동일한 구조를 따름
4. **쉬운 유지보수**: 관련 파일들이 한 곳에 모여있음

## 📝 참고사항

- 빈 `components/` 폴더는 나중에 컴포넌트 추가 시 사용할 수 있도록 유지
- `shared/lib/mockData.ts`는 호환성을 위해 유지 (각 feature의 mockData로 대체 가능)
- 모든 import 경로가 feature 기반으로 업데이트됨

## 🎯 다음 단계 (선택사항)

필요시 `src/shared/lib/mockData.ts`를 완전히 제거하고 각 feature의 mockData만 사용할 수 있습니다.

