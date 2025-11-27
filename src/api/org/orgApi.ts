/**
 * 조직 관리 API
 * 
 * 실제 HTTP 호출은 하지 않지만, 실제 백엔드 연동으로 쉽게 교체할 수 있는 구조로 설계
 */

import type { Org } from '../types';
import { delay, generateId, errorResponse, successResponse, type ApiResponse } from '../shared/utils';
import { orgsDb, ranksDb } from '../shared/db';
import { httpRequest } from '../http/request';

type OrgGridPayload = {
    rows: Org[];
};

/**
 * 조직 목록 조회
 */
export async function fetchOrgs(): Promise<ApiResponse<Org[]>> {
    await delay();
    return successResponse([...orgsDb], '조직 목록을 조회했습니다.');
}

/**
 * 조직 생성
 */
export async function createOrg(input: Omit<Org, 'id'>): Promise<ApiResponse<Org>> {
    await delay();

    // 중복 이름 체크
    const exists = orgsDb.some((org) => org.name === input.name);
    if (exists) {
        return errorResponse(409, '이미 존재하는 조직명입니다.');
    }

    const newOrg: Org = {
        id: generateId('org'),
        ...input,
    };

    orgsDb.push(newOrg);
    return successResponse(newOrg, '조직이 생성되었습니다.');
}

/**
 * 조직 수정
 */
export async function updateOrg(id: string, input: Partial<Org>): Promise<ApiResponse<Org>> {
    await delay();

    const index = orgsDb.findIndex((org) => org.id === id);
    if (index === -1) {
        return errorResponse(404, '조직을 찾을 수 없습니다.');
    }

    // 이름 변경 시 중복 체크
    if (input.name && input.name !== orgsDb[index].name) {
        const exists = orgsDb.some((org) => org.name === input.name && org.id !== id);
        if (exists) {
            return errorResponse(409, '이미 존재하는 조직명입니다.');
        }
    }

    const updatedOrg: Org = {
        ...orgsDb[index],
        ...input,
    };

    orgsDb[index] = updatedOrg;
    return successResponse(updatedOrg, '조직이 수정되었습니다.');
}

/**
 * 조직 부분 수정 (PATCH 샘플)
 */
export async function patchOrg(id: string, input: Partial<Org>): Promise<ApiResponse<Org>> {
    await delay();

    const index = orgsDb.findIndex((org) => org.id === id);
    if (index === -1) {
        return errorResponse(404, '조직을 찾을 수 없습니다.');
    }

    orgsDb[index] = {
        ...orgsDb[index],
        ...input,
    };

    return successResponse(orgsDb[index], '조직 일부 정보가 수정되었습니다.');
}

/**
 * 조직 삭제
 */
export async function deleteOrg(id: string): Promise<ApiResponse<null>> {
    await delay();

    const index = orgsDb.findIndex((org) => org.id === id);
    if (index === -1) {
        return errorResponse(404, '조직을 찾을 수 없습니다.');
    }

    // 하위 조직이 있는지 체크
    const hasChildren = orgsDb.some((org) => org.parentId === id);
    if (hasChildren) {
        return errorResponse(400, '하위 조직이 있어 삭제할 수 없습니다.');
    }

    // 해당 조직을 사용하는 직급이 있는지 체크
    const hasRanks = ranksDb.some((rank) => rank.orgId === id);
    if (hasRanks) {
        return errorResponse(400, '직급이 등록된 조직은 삭제할 수 없습니다.');
    }

    orgsDb.splice(index, 1);
    return successResponse(null, '조직이 삭제되었습니다.');
}

/**
 * 그리드 전체를 한번에 저장하는 샘플 (POST)
 */
export async function syncOrgGrid(payload: OrgGridPayload): Promise<ApiResponse<Org[]>> {
    await delay();

    if (!payload.rows || payload.rows.length === 0) {
        return errorResponse(400, '업로드할 조직 데이터가 없습니다.');
    }

    orgsDb.length = 0;
    payload.rows.forEach((row) => {
        orgsDb.push({
            ...row,
            id: row.id || generateId('org'),
        });
    });

    return successResponse([...orgsDb], '조직 그리드를 저장했습니다.');
}

// ========== Axios 연동 샘플 ==========

/**
 * 실제 백엔드가 준비되면 아래 함수들을 사용하세요.
 * (API 명세에 맞게 URL/응답 타입만 교체하면 됩니다.)
 */

export const fetchOrgsWithAxios = () =>
    httpRequest.get<ApiResponse<Org[]>>('/orgs');

export const createOrgWithAxios = (input: Omit<Org, 'id'>) =>
    httpRequest.post<ApiResponse<Org>>('/orgs', input);

export const updateOrgWithAxios = (id: string, input: Partial<Org>) =>
    httpRequest.put<ApiResponse<Org>>(`/orgs/${id}`, input);

export const patchOrgWithAxios = (id: string, input: Partial<Org>) =>
    httpRequest.patch<ApiResponse<Org>>(`/orgs/${id}`, input);

export const deleteOrgWithAxios = (id: string) =>
    httpRequest.delete<ApiResponse<null>>(`/orgs/${id}`);

export const syncOrgGridWithAxios = (payload: OrgGridPayload) =>
    httpRequest.post<ApiResponse<Org[]>>('/orgs/grid-sync', payload);

// Mockup payload samples for quick testing
export const orgApiMockSamples = {
    create: {
        name: '신규조직',
        parentId: 'org-1',
        isActive: true,
    } satisfies Omit<Org, 'id'>,
    patch: {
        isActive: false,
    } satisfies Partial<Org>,
    grid: {
        rows: [
            { id: 'org-1', name: '본사', parentId: null, isActive: true },
            { id: 'org-2', name: 'R&D센터', parentId: 'org-1', isActive: true },
            { id: '', name: '신규 팀', parentId: 'org-2', isActive: true },
        ],
    } satisfies OrgGridPayload,
};

