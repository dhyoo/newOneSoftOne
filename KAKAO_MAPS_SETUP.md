# Kakao Maps API 설정 안내

카카오맵을 표시하려면 Kakao API 키가 필요합니다.

## 설정 방법:

1. **Kakao Developers 가입**
   - https://developers.kakao.com/ 접속
   - 로그인 또는 회원가입

2. **애플리케이션 등록**
   - 내 애플리케이션 > 애플리케이션 추가하기
   - 앱 이름 입력 후 저장

3. **JavaScript 키 발급**
   - 생성된 앱 선택
   - 앱 키 > JavaScript 키 복사

4. **프로젝트에 키 적용**
   - `index.html` 파일을 엽니다
   - 다음 부분을 찾아서 `YOUR_KAKAO_API_KEY`를 복사한 JavaScript 키로 교체:
   ```html
   <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&libraries=services"></script>
   ```

5. **플랫폼 등록 (선택사항)**
   - 앱 설정 > 플랫폼 > Web 플랫폼 등록
   - 사이트 도메인 입력 (예: http://localhost:5173)

## 참고사항:
- 지도는 "찾아오는 길" 페이지에서만 표시됩니다
- 현재 좌표: 37.543611, 126.851944 (서울특별시 강서구 양천로 583)
- 마커와 회사명이 자동으로 표시됩니다
