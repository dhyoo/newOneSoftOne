/**
 * API 로그 서비스
 * 
 * API 호출 로그를 생성하고 관리하는 서비스
 */

import type { ApiLog } from '../api/types';

/**
 * API 로그 생성
 */
export const createApiLog = (
    method: ApiLog['method'],
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any,
    success: boolean,
    message?: string
): ApiLog => {
    return {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        method,
        url,
        payload,
        timestamp: new Date().toLocaleTimeString('ko-KR'),
        success,
        message,
    };
};

