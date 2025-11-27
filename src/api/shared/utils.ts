/**
 * API 공통 유틸리티 함수
 */

/**
 * 랜덤 지연 시간 생성 (300~800ms)
 * 실제 API 호출 시뮬레이션용
 */
export const delay = (): Promise<void> => {
    const ms = Math.floor(Math.random() * 500) + 300;
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * 고유 ID 생성
 */
export const generateId = (prefix: string): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * API 응답 타입
 */
export type ApiResponse<T> = {
    data: T;
    status: number;
    message?: string;
};

/**
 * 에러 응답 생성
 */
export const errorResponse = <T>(status: number, message: string): ApiResponse<T> => {
    return {
        data: null as T,
        status,
        message,
    };
};

/**
 * 성공 응답 생성
 */
export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => {
    return {
        data,
        status: 200,
        message,
    };
};

