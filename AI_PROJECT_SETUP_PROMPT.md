# SoftOne 프로젝트 구조 생성 프롬프트

이 문서는 AI에게 SoftOne 프로젝트와 동일한 구조의 React + TypeScript + Vite 프로젝트를 생성하도록 지시하는 프롬프트입니다.

## 프로젝트 개요

**프로젝트명**: SoftOne (회사 소개 웹사이트)
**기술 스택**: React 19 + TypeScript + Vite + Tailwind CSS 4 + React Router
**아키텍처**: Feature-Based Architecture
**스타일링**: Tailwind CSS + CSS Variables + 공통 클래스 시스템

## 필수 의존성

```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.17",
    "autoprefixer": "^10.4.22",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.554.0",
    "postcss": "^8.5.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.6",
    "tailwind-merge": "^3.4.0",
    "tailwindcss": "^4.1.17",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4"
  }
}
```

## 전체 폴더 구조

```
프로젝트 루트/
├── public/
│   └── vite.svg
├── src/
│   ├── app/                    # 앱 진입점 및 라우팅
│   │   ├── App.tsx             # 메인 App 컴포넌트
│   │   ├── App.css             # App 전용 스타일
│   │   ├── main.tsx            # React 진입점
│   │   ├── index.css            # 전역 스타일 (CSS import)
│   │   └── routes.tsx          # React Router 라우트 정의
│   ├── assets/                 # Vite 기본 리소스
│   │   └── react.svg
│   ├── features/               # Feature 모듈 (Feature-Based Architecture)
│   │   ├── ARCHITECTURE.md     # Feature 구조 가이드
│   │   ├── home/               # 홈 feature
│   │   │   ├── components/     # feature 전용 컴포넌트
│   │   │   │   └── Hero.tsx
│   │   │   ├── pages/          # 페이지 컴포넌트
│   │   │   │   └── HomePage.tsx
│   │   │   └── index.ts        # Export 파일
│   │   ├── company/            # 회사 소개 feature
│   │   │   ├── assets/         # feature 전용 리소스
│   │   │   │   ├── img_organization.jpg
│   │   │   │   ├── logo_ci.png
│   │   │   │   └── map_jeungmi_station.jpg
│   │   │   ├── components/     # feature 전용 컴포넌트
│   │   │   │   └── KakaoMap.tsx
│   │   │   ├── pages/          # 페이지 컴포넌트
│   │   │   │   └── CompanyPage.tsx
│   │   │   ├── types/          # TypeScript 타입
│   │   │   │   └── index.ts
│   │   │   ├── utils/          # 유틸리티 및 mock data
│   │   │   │   └── mockData.ts
│   │   │   └── index.ts        # Export 파일
│   │   ├── business/           # 사업 소개 feature
│   │   │   ├── components/
│   │   │   │   └── ServiceCard.tsx
│   │   │   ├── pages/
│   │   │   │   └── BusinessPage.tsx
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   └── mockData.ts
│   │   │   └── index.ts
│   │   ├── portfolio/          # 포트폴리오 feature
│   │   │   ├── components/     # (빈 폴더 - 향후 사용)
│   │   │   ├── pages/
│   │   │   │   └── PortfolioPage.tsx
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   └── mockData.ts
│   │   │   └── index.ts
│   │   ├── recruit/            # 채용 feature
│   │   │   ├── components/     # (빈 폴더 - 향후 사용)
│   │   │   ├── pages/
│   │   │   │   └── RecruitPage.tsx
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   └── mockData.ts
│   │   │   └── index.ts
│   │   └── support/            # 고객지원 feature
│   │       ├── components/     # (빈 폴더 - 향후 사용)
│   │       ├── pages/
│   │       │   └── SupportPage.tsx
│   │       ├── types/
│   │       │   └── index.ts
│   │       ├── utils/
│   │       │   └── mockData.ts
│   │       └── index.ts
│   └── shared/                 # 공통 리소스
│       ├── lib/                # 공통 유틸리티
│       │   ├── mockData.ts     # (호환성 유지 - 선택적)
│       │   ├── navigation.ts  # 네비게이션 데이터
│       │   └── utils.ts        # 유틸리티 함수 (cn 등)
│       ├── styles/             # 공통 스타일
│       │   ├── theme.css       # CSS 변수 (브랜드 색상, 간격, 타이포그래피)
│       │   ├── utilities.css   # 기본 유틸리티 클래스
│       │   ├── common.css      # 전체 프로젝트 공통 클래스
│       │   ├── company-common.css  # Company 페이지 전용 클래스
│       │   ├── README.md       # 스타일 가이드
│       │   ├── COMPONENT_EXAMPLES.md  # 컴포넌트 사용 예시
│       │   └── COMPANY_COMMON_GUIDE.md  # Company 공통 클래스 가이드
│       └── ui/                 # 공통 UI 컴포넌트
│           ├── Button.tsx      # 버튼 컴포넌트
│           ├── Card.tsx         # 카드 컴포넌트
│           ├── Section.tsx     # 섹션 컴포넌트
│           ├── Header.tsx       # 헤더 컴포넌트
│           ├── Footer.tsx       # 푸터 컴포넌트
│           ├── SubLayout.tsx   # 서브 레이아웃 컴포넌트
│           └── index.ts        # Export 파일
├── index.html                   # HTML 진입점
├── package.json                 # 의존성 관리
├── vite.config.ts               # Vite 설정
├── tailwind.config.js           # Tailwind CSS 설정
├── tsconfig.json                # TypeScript 설정 (루트)
├── tsconfig.app.json            # TypeScript 설정 (앱)
├── tsconfig.node.json           # TypeScript 설정 (Node)
├── postcss.config.js            # PostCSS 설정
└── eslint.config.js             # ESLint 설정
```

## 핵심 설정 파일

### 1. vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 2. tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### 3. tailwind.config.js

```javascript
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    'sky-blue': '#1C94D2',
                    'blue': '#0A67B2',
                    'purple': '#31347F',
                    'gray': '#414042',
                },
                primary: '#0A67B2',
                secondary: '#1C94D2',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
            },
            spacing: {
                'section': '6rem',
                'section-sm': '3rem',
                'section-lg': '8rem',
            },
            borderRadius: {
                'softone': '1rem',
                'softone-lg': '1.5rem',
            },
            boxShadow: {
                'softone': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'softone-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
            transitionDuration: {
                'fast': '150ms',
                'base': '300ms',
                'slow': '500ms',
            },
        },
    },
    plugins: [],
}
```

### 4. src/app/index.css

```css
@import "tailwindcss";

/* 공통 스타일 파일 import */
@import "../shared/styles/theme.css";
@import "../shared/styles/utilities.css";
@import "../shared/styles/common.css";
@import "../shared/styles/company-common.css";

@theme {
  --color-primary: #0A67B2;
  --color-secondary: #1C94D2;
}

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--color-slate-900);
  background-color: var(--color-white);
}
```

## Feature-Based Architecture 규칙

### Feature 구조

각 feature는 다음 구조를 **반드시** 따라야 합니다:

```
feature-name/
├── pages/              # 페이지 컴포넌트 (필수)
│   └── FeaturePage.tsx
├── components/         # feature 전용 컴포넌트 (선택)
│   └── FeatureComponent.tsx
├── types/              # TypeScript 타입 (필수)
│   └── index.ts
├── utils/              # 유틸리티 및 mock data (필수)
│   └── mockData.ts
├── hooks/              # Custom hooks (선택)
│   └── useFeature.ts
├── assets/             # feature 전용 리소스 (선택)
│   └── images/
└── index.ts            # Export 파일 (필수)
```

### Feature Export 파일 (index.ts) 예시

```typescript
/**
 * FeatureName Feature Export
 */
export { default as FeaturePage } from './pages/FeaturePage';
export { FeatureComponent } from './components/FeatureComponent';
export * from './types';
export { FEATURE_MOCK_DATA } from './utils/mockData';
```

## 스타일링 시스템

### 1. CSS 변수 (theme.css)

브랜드 색상, 간격, 타이포그래피를 CSS 변수로 관리:

```css
:root {
  /* 브랜드 색상 */
  --color-brand-sky-blue: #1C94D2;
  --color-brand-blue: #0A67B2;
  --color-brand-purple: #31347F;
  --color-brand-gray: #414042;
  
  /* Primary/Secondary */
  --color-primary: var(--color-brand-blue);
  --color-secondary: var(--color-brand-sky-blue);
  
  /* 간격 시스템 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --spacing-4xl: 6rem;
  
  /* 타이포그래피 */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  
  /* 기타... */
}
```

### 2. 공통 클래스 시스템 (common.css)

전체 프로젝트에서 사용하는 공통 클래스:

- **컨텐츠 박스**: `content-box`
- **섹션 헤더**: `section-header`, `section-header-lg`, `section-header-centered`
- **제목**: `section-title`, `section-title-md`, `section-title-lg`
- **텍스트**: `text-title`, `text-title-md`, `text-body`, `text-body-lg`, `text-body-pre`
- **그리드**: `grid-responsive`, `grid-responsive-2`, `grid-responsive-3`, `grid-responsive-4`
- **카드**: `card`, `card-lg`, `card-padding`, `card-padding-lg`
- **배경 박스**: `bg-box`, `bg-box-blue`, `bg-box-lg`
- **아이콘**: `icon-box`, `icon-box-lg`, `icon-box-hover`
- **체크리스트**: `checklist-item`, `checklist-item-icon`, `checklist-item-text`
- **태그**: `tag`, `tag-primary`
- **리스트**: `list-item`, `list-item-title`, `list-item-meta`
- **연락처 카드**: `contact-card`, `contact-card-icon`, `contact-card-title`, `contact-card-text`
- **프로세스**: `process-step`, `process-step-circle`, `process-step-content`
- **값 카드**: `value-card`, `value-icon-box`, `value-title`, `value-divider`, `value-desc`
- **버튼**: `btn-primary`
- **간격**: `spacing-sm`, `spacing-md`, `spacing-lg`, `spacing-xl`
- **테이블**: `table-container`, `table-row`, `table-header`, `table-content`

### 3. Company 전용 클래스 (company-common.css)

Company 페이지에서만 사용하는 클래스들도 포함.

## 라우팅 구조

### src/app/routes.tsx 예시

```typescript
import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Header } from '../shared/ui/Header';

// Lazy load pages - Feature-based architecture
const HomePage = lazy(() => import('../features/home/pages/HomePage'));
const CompanyPage = lazy(() => import('../features/company/pages/CompanyPage'));
const BusinessPage = lazy(() => import('../features/business/pages/BusinessPage'));
const PortfolioPage = lazy(() => import('../features/portfolio/pages/PortfolioPage'));
const RecruitPage = lazy(() => import('../features/recruit/pages/RecruitPage'));
const SupportPage = lazy(() => import('../features/support/pages/SupportPage'));

// Loading component
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
);

function Layout() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <Suspense fallback={<PageLoader />}>
                <Outlet />
            </Suspense>
        </div>
    );
}

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                
                {/* Company Routes */}
                <Route path="company" element={<Navigate to="/company/about" replace />} />
                <Route path="company">
                    <Route path="about" element={<CompanyPage tab="about" />} />
                    <Route path="ceo" element={<CompanyPage tab="ceo" />} />
                    {/* ... 기타 라우트 */}
                </Route>
                
                {/* 기타 feature 라우트들... */}
            </Route>
        </Routes>
    );
}
```

## Import 규칙

### Path Alias 사용

모든 import는 `@/` alias를 사용합니다:

```typescript
// ✅ 올바른 방법
import { Button } from '@/shared/ui';
import { CompanyPage } from '@/features/company';
import { COMPANY_MOCK_DATA } from '@/features/company/utils/mockData';

// ❌ 잘못된 방법
import { Button } from '../../../shared/ui';
```

### Feature 내부 Import

```typescript
// 같은 feature 내부
import { SomeComponent } from '../components/SomeComponent';
import { FEATURE_DATA } from '../utils/mockData';
import type { FeatureType } from '../types';
```

### 다른 Feature Import

```typescript
// 다른 feature 사용
import { ServiceCard } from '@/features/business';
import { Hero } from '@/features/home/components/Hero';
```

### Shared 리소스 Import

```typescript
// 공통 리소스
import { Button, Card } from '@/shared/ui';
import { SubLayout } from '@/shared/ui/SubLayout';
import { NAVIGATION } from '@/shared/lib/navigation';
```

## 공통 UI 컴포넌트

### SubLayout 컴포넌트

모든 서브 페이지는 `SubLayout`을 사용합니다:

```typescript
import { SubLayout } from '@/shared/ui/SubLayout';

export default function FeaturePage({ tab }: FeaturePageProps) {
    return (
        <SubLayout
            title="FEATURE_NAME"
            activeTab={tab}
            sectionId="feature-id"
        >
            <div className="content-box">
                {/* 페이지 컨텐츠 */}
            </div>
        </SubLayout>
    );
}
```

## 스타일링 가이드

### 공통 클래스 우선 사용

```tsx
// ✅ 좋은 예: 공통 클래스 사용
<div className="content-box">
    <div className="section-header">
        <h3 className="section-title">제목</h3>
    </div>
    <div className="grid-responsive">
        <div className="card card-padding">
            내용
        </div>
    </div>
</div>

// ❌ 나쁜 예: 긴 className 반복
<div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 min-h-[400px]">
    <div className="text-center mb-16">
        <h3 className="text-3xl font-bold text-slate-900">제목</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            내용
        </div>
    </div>
</div>
```

### CSS 변수 사용

```css
/* ✅ 좋은 예: CSS 변수 사용 */
.my-component {
  background-color: var(--color-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
}

/* ❌ 나쁜 예: 하드코딩 */
.my-component {
  background-color: #0A67B2;
  padding: 1.5rem;
  border-radius: 0.75rem;
}
```

## 네비게이션 구조

### src/shared/lib/navigation.ts

```typescript
export const NAVIGATION = [
    {
        id: 'company',
        label: 'Company',
        path: '/company',
        children: [
            { id: 'about', label: 'SOFTONE 소개', path: '/company/about' },
            { id: 'ceo', label: 'CEO 인사말', path: '/company/ceo' },
            // ... 기타
        ],
    },
    {
        id: 'business',
        label: 'Business',
        path: '/business',
        children: [
            { id: 'si', label: 'SI/SM 사업', path: '/business/si' },
            // ... 기타
        ],
    },
    // ... 기타 feature
] as const;
```

## 필수 파일 생성 체크리스트

### 루트 파일
- [ ] `package.json` - 의존성 정의
- [ ] `vite.config.ts` - Vite 설정 (path alias 포함)
- [ ] `tailwind.config.js` - Tailwind 설정
- [ ] `tsconfig.json` - TypeScript 루트 설정
- [ ] `tsconfig.app.json` - TypeScript 앱 설정 (path alias 포함)
- [ ] `tsconfig.node.json` - TypeScript Node 설정
- [ ] `postcss.config.js` - PostCSS 설정
- [ ] `eslint.config.js` - ESLint 설정
- [ ] `index.html` - HTML 진입점

### src/app/
- [ ] `main.tsx` - React 진입점
- [ ] `App.tsx` - 메인 App 컴포넌트
- [ ] `routes.tsx` - 라우트 정의
- [ ] `index.css` - 전역 스타일 (CSS import 포함)

### src/shared/styles/
- [ ] `theme.css` - CSS 변수 정의
- [ ] `utilities.css` - 기본 유틸리티 클래스
- [ ] `common.css` - 전체 프로젝트 공통 클래스
- [ ] `company-common.css` - Company 전용 클래스 (선택)

### src/shared/ui/
- [ ] `Header.tsx` - 헤더 컴포넌트
- [ ] `Footer.tsx` - 푸터 컴포넌트
- [ ] `SubLayout.tsx` - 서브 레이아웃 컴포넌트
- [ ] `Button.tsx` - 버튼 컴포넌트
- [ ] `Card.tsx` - 카드 컴포넌트
- [ ] `Section.tsx` - 섹션 컴포넌트
- [ ] `index.ts` - Export 파일

### src/shared/lib/
- [ ] `navigation.ts` - 네비게이션 데이터
- [ ] `utils.ts` - 유틸리티 함수 (cn 등)

### 각 Feature 폴더
각 feature마다 다음 구조 생성:
- [ ] `pages/FeaturePage.tsx` - 페이지 컴포넌트
- [ ] `types/index.ts` - 타입 정의
- [ ] `utils/mockData.ts` - Mock 데이터
- [ ] `index.ts` - Export 파일
- [ ] `components/` - (선택) feature 전용 컴포넌트
- [ ] `assets/` - (선택) feature 전용 리소스

## 생성 순서

1. **프로젝트 초기화**
   - Vite + React + TypeScript 프로젝트 생성
   - 의존성 설치

2. **설정 파일 생성**
   - `vite.config.ts` (path alias 설정)
   - `tsconfig.app.json` (path alias 설정)
   - `tailwind.config.js`
   - `postcss.config.js`

3. **폴더 구조 생성**
   - `src/app/` 폴더 및 파일
   - `src/shared/` 폴더 및 파일
   - `src/features/` 폴더 구조

4. **스타일 시스템 구축**
   - `theme.css` - CSS 변수
   - `utilities.css` - 기본 유틸리티
   - `common.css` - 공통 클래스
   - `index.css` - import 연결

5. **공통 컴포넌트 생성**
   - `Header`, `Footer`, `SubLayout`
   - `Button`, `Card`, `Section`

6. **Feature 생성**
   - 각 feature 폴더 구조 생성
   - 기본 파일 생성 (pages, types, utils, index.ts)

7. **라우팅 설정**
   - `routes.tsx`에 모든 feature 라우트 추가

## 주의사항

1. **Feature 간 의존성 최소화**: feature는 가능한 한 독립적으로 유지
2. **Shared는 정말 공통인 것만**: 여러 feature에서 사용하는 것만 shared에 위치
3. **타입은 feature 내부에**: feature 전용 타입은 해당 feature의 types 폴더에
4. **공통 클래스 우선 사용**: 반복되는 패턴은 공통 클래스로 추출
5. **Path Alias 사용**: 모든 import는 `@/` alias 사용
6. **CSS 변수 우선**: 하드코딩된 값 대신 CSS 변수 사용

## 검증 체크리스트

프로젝트 생성 후 다음을 확인:

- [ ] 모든 feature가 동일한 구조를 따름
- [ ] Path alias (`@/`)가 모든 import에서 사용됨
- [ ] 공통 클래스가 적절히 사용됨
- [ ] CSS 변수가 하드코딩된 값 대신 사용됨
- [ ] 각 feature의 `index.ts`가 올바르게 export함
- [ ] 라우팅이 모든 feature를 포함함
- [ ] TypeScript 오류 없음
- [ ] ESLint 오류 없음
- [ ] 개발 서버가 정상 실행됨

## 핵심 파일 상세

### src/app/main.tsx

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### src/app/App.tsx

```typescript
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
```

### src/shared/lib/utils.ts (필요시 생성)

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * className 병합 유틸리티
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### src/shared/ui/index.ts

```typescript
/**
 * Shared UI Components Export
 */
export { Button } from './Button';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
export { Section } from './Section';
export { Header } from './Header';
export { Footer } from './Footer';
export { SubLayout } from './SubLayout';
```

### index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SoftOne</title>
  <!-- 카카오맵 API (선택) -->
  <script type="text/javascript"
    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&libraries=services"></script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/app/main.tsx"></script>
</body>
</html>
```

### postcss.config.js

```javascript
export default {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
    },
}
```

### eslint.config.js

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
```

## 예시 코드

### Feature Page 예시

```typescript
import React from 'react';
import { SubLayout } from '@/shared/ui/SubLayout';
import { FEATURE_MOCK_DATA } from '../utils/mockData';
import type { FeatureData } from '../types';

interface FeaturePageProps {
    tab: string;
}

export default function FeaturePage({ tab }: FeaturePageProps) {
    const data = FEATURE_MOCK_DATA;

    return (
        <SubLayout
            title="FEATURE_NAME"
            activeTab={tab}
            sectionId="feature-id"
        >
            <div className="content-box">
                <div className="section-header">
                    <h3 className="section-title">{data.title}</h3>
                </div>
                <div className="grid-responsive">
                    {data.items.map((item, index) => (
                        <div key={index} className="card card-padding">
                            {item.content}
                        </div>
                    ))}
                </div>
            </div>
        </SubLayout>
    );
}
```

### Feature Types 예시

```typescript
// src/features/feature-name/types/index.ts
export interface FeatureData {
    title: string;
    description: string;
    items: Array<{
        id: string;
        content: string;
    }>;
}
```

### Feature Mock Data 예시

```typescript
// src/features/feature-name/utils/mockData.ts
import type { FeatureData } from '../types';

export const FEATURE_MOCK_DATA: FeatureData = {
    title: "Feature Title",
    description: "Feature Description",
    items: [
        { id: '1', content: 'Item 1' },
        { id: '2', content: 'Item 2' },
    ]
};
```

### Feature Index 예시

```typescript
// src/features/feature-name/index.ts
/**
 * FeatureName Feature Export
 */
export { default as FeaturePage } from './pages/FeaturePage';
export * from './types';
export { FEATURE_MOCK_DATA } from './utils/mockData';
```

## 완료 기준

프로젝트가 올바르게 생성되었는지 확인:

1. ✅ 모든 feature가 동일한 구조를 가짐
2. ✅ Path alias가 정상 작동함
3. ✅ 공통 클래스가 적용됨
4. ✅ CSS 변수가 사용됨
5. ✅ 라우팅이 정상 작동함
6. ✅ TypeScript 컴파일 오류 없음
7. ✅ 개발 서버 실행 가능
8. ✅ 모든 페이지가 정상 렌더링됨

## 공통 클래스 시스템 상세

### common.css 주요 클래스

전체 프로젝트에서 사용하는 공통 클래스들:

1. **컨텐츠 박스**: `content-box`
2. **섹션 헤더**: `section-header`, `section-header-lg`, `section-header-centered`
3. **제목**: `section-title`, `section-title-md`, `section-title-lg`
4. **텍스트**: `text-title`, `text-title-md`, `text-body`, `text-body-lg`, `text-body-pre`
5. **그리드**: `grid-responsive` (1/2/4), `grid-responsive-2` (1/2), `grid-responsive-3` (1/3), `grid-responsive-4` (1/2/3/4)
6. **카드**: `card`, `card-lg`, `card-padding`, `card-padding-lg`
7. **배경 박스**: `bg-box`, `bg-box-blue`, `bg-box-lg`
8. **아이콘**: `icon-box`, `icon-box-lg`, `icon-box-hover`
9. **체크리스트**: `checklist-item`, `checklist-item-icon`, `checklist-item-text`
10. **태그**: `tag`, `tag-primary`
11. **리스트**: `list-item`, `list-item-title`, `list-item-meta`
12. **연락처 카드**: `contact-card`, `contact-card-icon`, `contact-card-title`, `contact-card-text`
13. **프로세스**: `process-step`, `process-step-circle`, `process-step-content`
14. **값 카드**: `value-card`, `value-icon-box`, `value-title`, `value-divider`, `value-desc`
15. **버튼**: `btn-primary`
16. **간격**: `spacing-sm`, `spacing-md`, `spacing-lg`, `spacing-xl`
17. **테이블**: `table-container`, `table-row`, `table-header`, `table-content`

### 사용 예시

```tsx
// ✅ 공통 클래스 사용
<div className="content-box">
    <div className="section-header">
        <h3 className="section-title">제목</h3>
        <p className="text-body-lg">설명</p>
    </div>
    <div className="grid-responsive">
        <div className="card card-padding">
            <div className="icon-box">
                <Icon />
            </div>
            <p className="text-body">내용</p>
        </div>
    </div>
</div>
```

## 스타일 파일 구조

### theme.css 구조

```css
:root {
  /* 브랜드 색상 */
  --color-brand-sky-blue: #1C94D2;
  --color-brand-blue: #0A67B2;
  --color-brand-purple: #31347F;
  --color-brand-gray: #414042;
  
  /* Primary/Secondary */
  --color-primary: var(--color-brand-blue);
  --color-secondary: var(--color-brand-sky-blue);
  
  /* 중성 색상 */
  --color-white: #ffffff;
  --color-black: #000000;
  --color-slate-50: #f8fafc;
  --color-slate-100: #f1f5f9;
  /* ... 기타 slate 색상 */
  
  /* 간격 시스템 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  /* ... 기타 간격 */
  
  /* 타이포그래피 */
  --font-family-base: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-size-xs: 0.75rem;
  /* ... 기타 폰트 크기 */
  
  /* 보더 반경 */
  --radius-sm: 0.25rem;
  /* ... 기타 반경 */
  
  /* 그림자 */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  /* ... 기타 그림자 */
  
  /* 전환 효과 */
  --transition-fast: 150ms;
  --transition-base: 300ms;
  --transition-slow: 500ms;
}
```

## 네비게이션 구조

### Header 컴포넌트 특징

- `NAVIGATION` 데이터를 사용하여 동적으로 메뉴 생성
- 데스크톱: 드롭다운 메뉴
- 모바일: 햄버거 메뉴
- 현재 경로에 따라 활성 상태 표시

### SubLayout 컴포넌트 특징

- Visual Banner (Primary 색상 배경)
- LNB (Local Navigation Bar) - 서브 메뉴
- Content Area
- Footer 포함

## 검증 및 테스트

프로젝트 생성 후 다음을 확인:

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **빌드 테스트**
   ```bash
   npm run build
   ```

3. **타입 체크**
   ```bash
   npx tsc --noEmit
   ```

4. **린트 체크**
   ```bash
   npm run lint
   ```

## 추가 참고사항

1. **이미지 리소스**: feature별 `assets/` 폴더에 저장
2. **문서화**: 각 feature와 shared 폴더에 README.md 작성 권장
3. **타입 안정성**: 모든 데이터는 TypeScript 타입으로 정의
4. **공통화 우선**: 반복되는 패턴은 공통 클래스로 추출
5. **반응형 디자인**: 모든 컴포넌트는 모바일부터 데스크톱까지 지원

이 프롬프트를 따라 프로젝트를 생성하면 SoftOne과 동일한 구조의 프로젝트가 완성됩니다.

