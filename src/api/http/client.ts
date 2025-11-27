/**
 * Axios 인스턴스 정의
 * - 기본 URL, 타임아웃, 공통 헤더 설정
 * - 요청/응답 인터셉터에서 토큰 주입 및 오류 메시지 통일
 *
 * velog 참고 문서를 기반으로 프로젝트 스타일에 맞게 모듈화했습니다.
 */

import axios, { AxiosError } from 'axios';

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://api.example.com',
    timeout: 15_000,
    headers: {
        'Content-Type': 'application/json',
    },
});

httpClient.interceptors.request.use(
    (config) => {
        // 예: accessToken을 자동으로 헤더에 주입
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
        const message =
            error.response?.data?.message ??
            error.message ??
            '네트워크 요청 중 알 수 없는 오류가 발생했습니다.';
        return Promise.reject(new Error(message));
    }
);


