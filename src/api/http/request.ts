/**
 * HTTP 요청 헬퍼
 * - axios 인스턴스를 직접 노출하지 않고
 *   공통 래퍼를 통해 예외/타입 처리를 일원화
 */

import type { AxiosRequestConfig } from 'axios';
import { httpClient } from './client';

type Config = AxiosRequestConfig;

async function request<T>(config: Config) {
    const response = await httpClient.request<T>(config);
    return response.data;
}

export const httpRequest = {
    get: <T>(url: string, config?: Config) => request<T>({ url, method: 'GET', ...config }),
    post: <T>(url: string, data?: unknown, config?: Config) =>
        request<T>({ url, method: 'POST', data, ...config }),
    put: <T>(url: string, data?: unknown, config?: Config) =>
        request<T>({ url, method: 'PUT', data, ...config }),
    patch: <T>(url: string, data?: unknown, config?: Config) =>
        request<T>({ url, method: 'PATCH', data, ...config }),
    delete: <T>(url: string, config?: Config) => request<T>({ url, method: 'DELETE', ...config }),
};


