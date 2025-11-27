# 지도 이미지 저장 가이드

## 증미역 주변 지도 이미지 저장 방법

### 방법 1: 직접 이미지 저장 (권장)

1. 제공하신 증미역 주변 지도 이미지를 다운로드하거나 복사합니다.
2. 이미지 파일을 `src/features/company/assets/` 폴더에 저장합니다.
3. 파일명: `map_jeungmi_station.jpg` (또는 `.png`)

### 방법 2: 카카오맵에서 캡처

1. [카카오맵](https://map.kakao.com/)에서 "증미역" 검색
2. 소프트원 위치(우림블루나인 D동 901호) 주변 지도를 확대
3. 스크린샷으로 캡처
4. `src/features/company/assets/map_jeungmi_station.jpg`로 저장

### 방법 3: 이미지 URL이 있는 경우

이미지 URL을 알려주시면 다운로드하여 저장하겠습니다.

## 저장 후

이미지를 저장하신 후, `CompanyPage.tsx` 파일의 9-12번째 줄을 다음과 같이 수정하세요:

```typescript
// 변경 전
// import mapImage from '../assets/map_jeungmi_station.jpg';
const mapImage: string | undefined = undefined;

// 변경 후
import mapImage from '../assets/map_jeungmi_station.jpg';
// const mapImage: string | undefined = undefined; // 이 줄 삭제
```

