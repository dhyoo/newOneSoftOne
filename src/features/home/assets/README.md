# Home Feature Assets

이 폴더에는 Home feature에서 사용하는 이미지 파일들이 저장됩니다.

## 회사 소개 이미지

회사 소개 섹션에 사용할 이미지를 이 폴더에 저장하세요.

### 권장 이미지
- 회사 전경 사진
- 사무실 내부 사진
- 팀 활동 사진
- 회사 비전/미션을 나타내는 이미지

### 사용 방법

1. 이미지 파일을 이 폴더에 저장 (예: `company_intro.jpg`)
2. `CompanyIntro.tsx` 컴포넌트에서 이미지 경로를 import:

```typescript
import companyIntroImage from '../assets/company_intro.jpg';

// HomePage.tsx에서 사용
<CompanyIntro imageUrl={companyIntroImage} />
```

### 이미지 없이 사용

이미지가 없어도 자동으로 그라데이션 배경이 표시됩니다.



