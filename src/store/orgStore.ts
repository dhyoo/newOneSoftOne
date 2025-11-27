/**
 * 조직 관리 Zustand 스토어
 * 
 * 조직 도메인의 데이터와 API 로직만 담당합니다.
 */

import { create } from 'zustand';
import * as orgApi from '../api/org/orgApi';
import { createApiLog } from '../services/apiLogService';
import type { Org, ApiLog } from '../api/types';

// ========== 타입 정의 ==========

export interface OrgStore {
    // 도메인 데이터
    orgs: Org[];

    // UI 상태
    loading: boolean;
    error: string | null;

    // API 로그
    apiLogs: ApiLog[];

    // ========== 조직 CRUD ==========
    fetchOrgs: () => Promise<void>;
    createOrg: (input: Omit<Org, 'id'>) => Promise<void>;
    updateOrg: (id: string, input: Partial<Org>) => Promise<void>;
    deleteOrg: (id: string) => Promise<void>;
}

// ========== Zustand 스토어 생성 ==========

export const useOrgStore = create<OrgStore>((set, get) => ({
    // 초기 상태
    orgs: [],
    loading: false,
    error: null,
    apiLogs: [],

    // ========== 조직 목록 조회 ==========
    fetchOrgs: async () => {
        set({ loading: true, error: null });

        try {
            const response = await orgApi.fetchOrgs();

            if (response.status === 200) {
                set({
                    orgs: response.data,
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('GET', '/api/orgs', null, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '조직 목록 조회에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('GET', '/api/orgs', null, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '조직 목록 조회 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('GET', '/api/orgs', null, false, errorMessage),
                ],
            });
        }
    },

    // ========== 조직 생성 ==========
    createOrg: async (input: Omit<Org, 'id'>) => {
        set({ loading: true, error: null });

        try {
            const response = await orgApi.createOrg(input);

            if (response.status === 200) {
                set({
                    orgs: [...get().orgs, response.data],
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('POST', '/api/orgs', input, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '조직 생성에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('POST', '/api/orgs', input, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '조직 생성 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('POST', '/api/orgs', input, false, errorMessage),
                ],
            });
        }
    },

    // ========== 조직 수정 ==========
    updateOrg: async (id: string, input: Partial<Org>) => {
        set({ loading: true, error: null });

        try {
            const response = await orgApi.updateOrg(id, input);

            if (response.status === 200) {
                set({
                    orgs: get().orgs.map((org) => (org.id === id ? response.data : org)),
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('PUT', `/api/orgs/${id}`, input, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '조직 수정에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('PUT', `/api/orgs/${id}`, input, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '조직 수정 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('PUT', `/api/orgs/${id}`, input, false, errorMessage),
                ],
            });
        }
    },

    // ========== 조직 삭제 ==========
    deleteOrg: async (id: string) => {
        set({ loading: true, error: null });

        try {
            const response = await orgApi.deleteOrg(id);

            if (response.status === 200) {
                set({
                    orgs: get().orgs.filter((org) => org.id !== id),
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('DELETE', `/api/orgs/${id}`, null, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '조직 삭제에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('DELETE', `/api/orgs/${id}`, null, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '조직 삭제 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('DELETE', `/api/orgs/${id}`, null, false, errorMessage),
                ],
            });
        }
    },
}));

