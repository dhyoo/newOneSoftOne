/**
 * 직급 관리 Zustand 스토어
 * 
 * 직급 도메인의 데이터와 API 로직만 담당합니다.
 */

import { create } from 'zustand';
import * as rankApi from '../api/rank/rankApi';
import { createApiLog } from '../services/apiLogService';
import type { Rank, ApiLog } from '../api/types';

// ========== 타입 정의 ==========

export interface RankStore {
    // 도메인 데이터
    ranks: Rank[];

    // UI 상태
    loading: boolean;
    error: string | null;

    // API 로그
    apiLogs: ApiLog[];

    // ========== 직급 CRUD ==========
    fetchRanks: (orgId?: string) => Promise<void>; // orgId로 필터 가능
    createRank: (input: Omit<Rank, 'id'>) => Promise<void>;
    updateRank: (id: string, input: Partial<Rank>) => Promise<void>;
    deleteRank: (id: string) => Promise<void>;
}

// ========== Zustand 스토어 생성 ==========

export const useRankStore = create<RankStore>((set, get) => ({
    // 초기 상태
    ranks: [],
    loading: false,
    error: null,
    apiLogs: [],

    // ========== 직급 목록 조회 ==========
    fetchRanks: async (orgId?: string) => {
        set({ loading: true, error: null });

        try {
            const response = await rankApi.fetchRanks(orgId);

            if (response.status === 200) {
                set({
                    ranks: response.data,
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('GET', `/api/ranks${orgId ? `?orgId=${orgId}` : ''}`, { orgId }, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '직급 목록 조회에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('GET', `/api/ranks${orgId ? `?orgId=${orgId}` : ''}`, { orgId }, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '직급 목록 조회 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('GET', `/api/ranks${orgId ? `?orgId=${orgId}` : ''}`, { orgId }, false, errorMessage),
                ],
            });
        }
    },

    // ========== 직급 생성 ==========
    createRank: async (input: Omit<Rank, 'id'>) => {
        set({ loading: true, error: null });

        try {
            const response = await rankApi.createRank(input);

            if (response.status === 200) {
                set({
                    ranks: [...get().ranks, response.data],
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('POST', '/api/ranks', input, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '직급 생성에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('POST', '/api/ranks', input, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '직급 생성 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('POST', '/api/ranks', input, false, errorMessage),
                ],
            });
        }
    },

    // ========== 직급 수정 ==========
    updateRank: async (id: string, input: Partial<Rank>) => {
        set({ loading: true, error: null });

        try {
            const response = await rankApi.updateRank(id, input);

            if (response.status === 200) {
                set({
                    ranks: get().ranks.map((rank) => (rank.id === id ? response.data : rank)),
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('PUT', `/api/ranks/${id}`, input, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '직급 수정에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('PUT', `/api/ranks/${id}`, input, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '직급 수정 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('PUT', `/api/ranks/${id}`, input, false, errorMessage),
                ],
            });
        }
    },

    // ========== 직급 삭제 ==========
    deleteRank: async (id: string) => {
        set({ loading: true, error: null });

        try {
            const response = await rankApi.deleteRank(id);

            if (response.status === 200) {
                set({
                    ranks: get().ranks.filter((rank) => rank.id !== id),
                    loading: false,
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('DELETE', `/api/ranks/${id}`, null, true, response.message),
                    ],
                });
            } else {
                set({
                    loading: false,
                    error: response.message || '직급 삭제에 실패했습니다.',
                    apiLogs: [
                        ...get().apiLogs,
                        createApiLog('DELETE', `/api/ranks/${id}`, null, false, response.message),
                    ],
                });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '직급 삭제 중 오류가 발생했습니다.';
            set({
                loading: false,
                error: errorMessage,
                apiLogs: [
                    ...get().apiLogs,
                    createApiLog('DELETE', `/api/ranks/${id}`, null, false, errorMessage),
                ],
            });
        }
    },
}));

