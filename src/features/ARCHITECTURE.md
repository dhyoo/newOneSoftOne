# Feature-Based Architecture 가이드

이 프로젝트는 **Feature-Based Architecture**를 따릅니다. 각 기능(feature)이 독립적으로 관리되며, 관련된 모든 파일이 해당 feature 폴더 내에 위치합니다.

## 폴더 구조

```
src/
├── app/                    # 앱 진입점 및 라우팅
│   ├── routes.tsx          # 라우트 정의
│   └── ...
├── features/               # Feature별 모듈
│   ├── company/           # 회사 소개 feature
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── components/    # feature 전용 컴포넌트
│   │   ├── types/         # TypeScript 타입 정의
│   │   ├── utils/         # 유틸리티 함수 및 mock data
│   │   ├── assets/         # feature 전용 리소스
│   │   └── index.ts       # Export 파일
│   ├── business/          # 사업 소개 feature
│   ├── portfolio/         # 포트폴리오 feature
│   ├── recruit/           # 채용 feature
│   ├── support/           # 고객지원 feature
│   └── home/              # 홈 feature
└── shared/                # 공통 리소스
    ├── ui/                # 공통 UI 컴포넌트
    ├── styles/            # 공통 스타일
    ├── lib/               # 공통 유틸리티
    └── assets/            # 공통 리소스
```

## Feature 구조 규칙

각 feature는 다음 구조를 가집니다:

```
feature-name/
├── pages/              # 페이지 컴포넌트
│   └── FeaturePage.tsx
├── components/         # feature 전용 컴포넌트
│   └── FeatureComponent.tsx
├── types/              # TypeScript 타입
│   └── index.ts
├── utils/              # 유틸리티 및 mock data
│   └── mockData.ts
├── hooks/              # Custom hooks (선택사항)
│   └── useFeature.ts
├── assets/             # feature 전용 리소스 (선택사항)
│   └── images/
└── index.ts            # Export 파일
```

## Import 규칙

### Feature 내부에서
```tsx
// 같은 feature 내부
import { SomeComponent } from '../components/SomeComponent';
import { FEATURE_DATA } from '../utils/mockData';
import type { FeatureType } from '../types';
```

### 다른 Feature에서
```tsx
// 다른 feature 사용
import { ServiceCard } from '@/features/business';
import { CompanyPage } from '@/features/company';
```

### Shared 리소스 사용
```tsx
// 공통 리소스
import { Button, Card } from '@/shared/ui';
import { SubLayout } from '@/shared/ui/SubLayout';
import { cn } from '@/shared/lib/utils';
```

## 장점

1. **명확한 책임 분리**: 각 feature가 독립적으로 관리됨
2. **쉬운 유지보수**: 관련 파일들이 한 곳에 모여있음
3. **재사용성**: feature를 모듈처럼 import하여 사용
4. **확장성**: 새로운 feature 추가가 용이
5. **협업 효율성**: 팀원들이 서로 다른 feature를 독립적으로 작업 가능

## 새 Feature 추가하기

1. `src/features/` 폴더에 새 feature 폴더 생성
2. 기본 구조 생성 (pages, components, types, utils)
3. `index.ts` 파일로 export
4. `routes.tsx`에 라우트 추가

## 주의사항

- **Feature 간 의존성 최소화**: feature는 가능한 한 독립적으로 유지
- **Shared는 정말 공통인 것만**: 여러 feature에서 사용하는 것만 shared에 위치
- **타입은 feature 내부에**: feature 전용 타입은 해당 feature의 types 폴더에

