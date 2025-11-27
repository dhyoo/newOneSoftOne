/**
 * 직급 관리 API
 * 
 * 실제 HTTP 호출은 하지 않지만, 실제 백엔드 연동으로 쉽게 교체할 수 있는 구조로 설계
 */

import type { Rank } from '../types';
import { delay, generateId, errorResponse, successResponse, type ApiResponse } from '../shared/utils';
import { orgsDb, ranksDb, usersDb } from '../shared/db';
import { httpRequest } from '../http/request';

type RankGridPayload = {
    rows: Rank[];
};

/**
 * 직급 목록 조회
 * @param orgId - 조직 ID (선택적, 필터링용)
 */
export async function fetchRanks(orgId?: string): Promise<ApiResponse<Rank[]>> {
    await delay();

    let ranks = [...ranksDb];
    if (orgId) {
        ranks = ranks.filter((rank) => rank.orgId === orgId);
    }

    return successResponse(ranks, '직급 목록을 조회했습니다.');
}

/**
 * 직급 생성
 */
export async function createRank(input: Omit<Rank, 'id'>): Promise<ApiResponse<Rank>> {
    await delay();

    // 조직 존재 여부 체크
    const orgExists = orgsDb.some((org) => org.id === input.orgId);
    if (!orgExists) {
        return errorResponse(404, '조직을 찾을 수 없습니다.');
    }

    // 같은 조직 내 중복 이름 체크
    const exists = ranksDb.some((rank) => rank.orgId === input.orgId && rank.name === input.name);
    if (exists) {
        return errorResponse(409, '이미 존재하는 직급명입니다.');
    }

    const newRank: Rank = {
        id: generateId('rank'),
        ...input,
    };

    ranksDb.push(newRank);
    return successResponse(newRank, '직급이 생성되었습니다.');
}

/**
 * 직급 수정
 */
export async function updateRank(id: string, input: Partial<Rank>): Promise<ApiResponse<Rank>> {
    await delay();

    const index = ranksDb.findIndex((rank) => rank.id === id);
    if (index === -1) {
        return errorResponse(404, '직급을 찾을 수 없습니다.');
    }

    // 조직 변경 시 존재 여부 체크
    if (input.orgId && input.orgId !== ranksDb[index].orgId) {
        const orgExists = orgsDb.some((org) => org.id === input.orgId);
        if (!orgExists) {
            return errorResponse(404, '조직을 찾을 수 없습니다.');
        }
    }

    // 이름 변경 시 중복 체크
    if (input.name && input.name !== ranksDb[index].name) {
        const targetOrgId = input.orgId || ranksDb[index].orgId;
        const exists = ranksDb.some((rank) => rank.orgId === targetOrgId && rank.name === input.name && rank.id !== id);
        if (exists) {
            return errorResponse(409, '이미 존재하는 직급명입니다.');
        }
    }

    const updatedRank: Rank = {
        ...ranksDb[index],
        ...input,
    };

    ranksDb[index] = updatedRank;
    return successResponse(updatedRank, '직급이 수정되었습니다.');
}

/**
 * 직급 부분 수정 (PATCH 샘플)
 */
export async function patchRank(id: string, input: Partial<Rank>): Promise<ApiResponse<Rank>> {
    await delay();

    const index = ranksDb.findIndex((rank) => rank.id === id);
    if (index === -1) {
        return errorResponse(404, '직급을 찾을 수 없습니다.');
    }

    ranksDb[index] = {
        ...ranksDb[index],
        ...input,
    };

    return successResponse(ranksDb[index], '직급 일부 정보가 수정되었습니다.');
}

/**
 * 직급 삭제
 */
export async function deleteRank(id: string): Promise<ApiResponse<null>> {
    await delay();

    const index = ranksDb.findIndex((rank) => rank.id === id);
    if (index === -1) {
        return errorResponse(404, '직급을 찾을 수 없습니다.');
    }

    // 해당 직급을 사용하는 사용자가 있는지 체크
    const hasUsers = usersDb.some((user) => user.rankId === id);
    if (hasUsers) {
        return errorResponse(400, '사용자가 등록된 직급은 삭제할 수 없습니다.');
    }

    ranksDb.splice(index, 1);
    return successResponse(null, '직급이 삭제되었습니다.');
}

/**
 * 직급 그리드 전체 저장 (POST 샘플)
 */
export async function syncRankGrid(payload: RankGridPayload): Promise<ApiResponse<Rank[]>> {
    await delay();

    if (!payload.rows || payload.rows.length === 0) {
        return errorResponse(400, '업로드할 직급 데이터가 없습니다.');
    }

    ranksDb.length = 0;
    payload.rows.forEach((row) => {
        ranksDb.push({
            ...row,
            id: row.id || generateId('rank'),
        });
    });

    return successResponse([...ranksDb], '직급 그리드를 저장했습니다.');
}

// ========== Axios 연동 샘플 ==========

export const fetchRanksWithAxios = (orgId?: string) =>
    httpRequest.get<ApiResponse<Rank[]>>('/ranks', {
        params: { orgId },
    });

export const createRankWithAxios = (input: Omit<Rank, 'id'>) =>
    httpRequest.post<ApiResponse<Rank>>('/ranks', input);

export const updateRankWithAxios = (id: string, input: Partial<Rank>) =>
    httpRequest.put<ApiResponse<Rank>>(`/ranks/${id}`, input);

export const patchRankWithAxios = (id: string, input: Partial<Rank>) =>
    httpRequest.patch<ApiResponse<Rank>>(`/ranks/${id}`, input);

export const deleteRankWithAxios = (id: string) =>
    httpRequest.delete<ApiResponse<null>>(`/ranks/${id}`);

export const syncRankGridWithAxios = (payload: RankGridPayload) =>
    httpRequest.post<ApiResponse<Rank[]>>('/ranks/grid-sync', payload);

export const rankApiMockSamples = {
    create: {
        orgId: 'org-2',
        name: '수습',
        level: 6,
        isActive: true,
    } satisfies Omit<Rank, 'id'>,
    patch: {
        level: 3,
        isActive: false,
    } satisfies Partial<Rank>,
    grid: {
        rows: [
            { id: 'rank-1', orgId: 'org-1', name: '임원', level: 1, isActive: true },
            { id: 'rank-2', orgId: 'org-1', name: '팀장', level: 2, isActive: true },
            { id: '', orgId: 'org-2', name: '인턴', level: 6, isActive: true },
        ],
    } satisfies RankGridPayload,
};

