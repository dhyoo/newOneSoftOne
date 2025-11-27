/**
 * 사용자 관리 Zustand 스토어
 * 
 * 사용자 도메인의 데이터와 API 로직만 담당합니다.
 */

import { create } from 'zustand';
import * as userApi from '../api/user/userApi';
import { createApiLog } from '../services/apiLogService';
import type { User, ApiLog } from '../api/types';

// ========== 타입 정의 ==========

export interface UserStore {
    // 도메인 데이터
    users: User[];

    // UI 상태
    loading: boolean;
    error: string | null;

    // API 로그
    apiLogs: ApiLog[];

    // ========== 사용자 CRUD ==========
    fetchUsers: (filter?: { orgId?: string; rankId?: string }) => Promise<void>;
    createUser: (input: Omit<User, 'id'>) => Promise<void>;
    updateUser: (id: string, input: Partial<User>) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
}

// ========== Zustand 스토어 생성 ==========

export const useUserStore = create<UserStore>((set, get) => ({
    // 초기 상태
    users: [],
    loading: false,
    error: null,
    apiLogs: [],

    // ========== 사용자 목록 조회 ==========
    fetchUsers: async (filter?: { orgId?: string; rankId?: string }) => {
        set({ loading: true, error: null });

        try {
            const response = await userApi.fetchUsers(filter?.orgId, filter?.rankId);

            if (response.status === 200) {
                const queryParams = new URLSearchParams();
                if (filter?.orgId) queryParams.append('orgId', filter.orgId);
                if (filter?.rankId) queryParams.append('rankId', filter.rankId);
                const queryString = queryParams.toString();
                const url = `/api/users${queryString ? `?${queryString}` : ''}`;

                set({
                    users: response.data,
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('GET', url, filter, true, response.message),
                    ],
                });
            } else {
                const queryParams = new URLSearchParams();
                if (filter?.orgId) queryParams.append('orgId', filter.orgId);
                if (filter?.rankId) queryParams.append('rankId', filter.rankId);
                const queryString = queryParams.toString();
                const url = `/api/users${queryString ? `?${queryString}` : ''}`;

                set({
                    loading: false,
                    error: response.message || '사용자 목록 조회에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('GET', url, filter, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '사용자 목록 조회 중 오류가 발생했습니다.';
            const queryParams = new URLSearchParams();
            if (filter?.orgId) queryParams.append('orgId', filter.orgId);
            if (filter?.rankId) queryParams.append('rankId', filter.rankId);
            const queryString = queryParams.toString();
            const url = `/api/users${queryString ? `?${queryString}` : ''}`;

            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('GET', url, filter, false, errorMessage),
                ],
            });
        }
    },

    // ========== 사용자 생성 ==========
    createUser: async (input: Omit<User, 'id'>) => {
        set({ loading: true, error: null });

        try {
            const response = await userApi.createUser(input);

            if (response.status === 200) {
                set({
                    users: [...get().users, response.data],
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('POST', '/api/users', input, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '사용자 생성에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('POST', '/api/users', input, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '사용자 생성 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('POST', '/api/users', input, false, errorMessage),
                ],
            });
        }
    },

    // ========== 사용자 수정 ==========
    updateUser: async (id: string, input: Partial<User>) => {
        set({ loading: true, error: null });

        try {
            const response = await userApi.updateUser(id, input);

            if (response.status === 200) {
                set({
                    users: get().users.map((user) => (user.id === id ? response.data : user)),
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('PUT', `/api/users/${id}`, input, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '사용자 수정에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('PUT', `/api/users/${id}`, input, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '사용자 수정 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('PUT', `/api/users/${id}`, input, false, errorMessage),
                ],
            });
        }
    },

    // ========== 사용자 삭제 ==========
    deleteUser: async (id: string) => {
        set({ loading: true, error: null });

        try {
            const response = await userApi.deleteUser(id);

            if (response.status === 200) {
                set({
                    users: get().users.filter((user) => user.id !== id),
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('DELETE', `/api/users/${id}`, null, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '사용자 삭제에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('DELETE', `/api/users/${id}`, null, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '사용자 삭제 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('DELETE', `/api/users/${id}`, null, false, errorMessage),
                ],
            });
        }
    },
}));

