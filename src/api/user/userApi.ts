/**
 * 사용자 관리 API
 * 
 * 실제 HTTP 호출은 하지 않지만, 실제 백엔드 연동으로 쉽게 교체할 수 있는 구조로 설계
 */

import type { User } from '../types';
import { delay, generateId, errorResponse, successResponse, type ApiResponse } from '../shared/utils';
import { orgsDb, ranksDb, usersDb } from '../shared/db';
import { httpRequest } from '../http/request';

type UserGridPayload = {
    rows: User[];
};

/**
 * 사용자 목록 조회
 * @param orgId - 조직 ID (선택적, 필터링용)
 * @param rankId - 직급 ID (선택적, 필터링용)
 */
export async function fetchUsers(orgId?: string, rankId?: string): Promise<ApiResponse<User[]>> {
    await delay();

    let users = [...usersDb];
    if (orgId) {
        users = users.filter((user) => user.orgId === orgId);
    }
    if (rankId) {
        users = users.filter((user) => user.rankId === rankId);
    }

    return successResponse(users, '사용자 목록을 조회했습니다.');
}

/**
 * 사용자 생성
 */
export async function createUser(input: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    await delay();

    // 조직 존재 여부 체크
    const orgExists = orgsDb.some((org) => org.id === input.orgId);
    if (!orgExists) {
        return errorResponse(404, '조직을 찾을 수 없습니다.');
    }

    // 직급 존재 여부 체크
    const rankExists = ranksDb.some((rank) => rank.id === input.rankId);
    if (!rankExists) {
        return errorResponse(404, '직급을 찾을 수 없습니다.');
    }

    // 이메일 중복 체크
    const emailExists = usersDb.some((user) => user.email === input.email);
    if (emailExists) {
        return errorResponse(409, '이미 존재하는 이메일입니다.');
    }

    const newUser: User = {
        id: generateId('user'),
        ...input,
    };

    usersDb.push(newUser);
    return successResponse(newUser, '사용자가 생성되었습니다.');
}

/**
 * 사용자 수정
 */
export async function updateUser(id: string, input: Partial<User>): Promise<ApiResponse<User>> {
    await delay();

    const index = usersDb.findIndex((user) => user.id === id);
    if (index === -1) {
        return errorResponse(404, '사용자를 찾을 수 없습니다.');
    }

    // 조직 변경 시 존재 여부 체크
    if (input.orgId && input.orgId !== usersDb[index].orgId) {
        const orgExists = orgsDb.some((org) => org.id === input.orgId);
        if (!orgExists) {
            return errorResponse(404, '조직을 찾을 수 없습니다.');
        }
    }

    // 직급 변경 시 존재 여부 체크
    if (input.rankId && input.rankId !== usersDb[index].rankId) {
        const rankExists = ranksDb.some((rank) => rank.id === input.rankId);
        if (!rankExists) {
            return errorResponse(404, '직급을 찾을 수 없습니다.');
        }
    }

    // 이메일 변경 시 중복 체크
    if (input.email && input.email !== usersDb[index].email) {
        const emailExists = usersDb.some((user) => user.email === input.email && user.id !== id);
        if (emailExists) {
            return errorResponse(409, '이미 존재하는 이메일입니다.');
        }
    }

    const updatedUser: User = {
        ...usersDb[index],
        ...input,
    };

    usersDb[index] = updatedUser;
    return successResponse(updatedUser, '사용자가 수정되었습니다.');
}

/**
 * 사용자 부분 수정 (PATCH 샘플)
 */
export async function patchUser(id: string, input: Partial<User>): Promise<ApiResponse<User>> {
    await delay();

    const index = usersDb.findIndex((user) => user.id === id);
    if (index === -1) {
        return errorResponse(404, '사용자를 찾을 수 없습니다.');
    }

    usersDb[index] = {
        ...usersDb[index],
        ...input,
    };

    return successResponse(usersDb[index], '사용자 일부 정보가 수정되었습니다.');
}

/**
 * 사용자 삭제
 */
export async function deleteUser(id: string): Promise<ApiResponse<null>> {
    await delay();

    const index = usersDb.findIndex((user) => user.id === id);
    if (index === -1) {
        return errorResponse(404, '사용자를 찾을 수 없습니다.');
    }

    usersDb.splice(index, 1);
    return successResponse(null, '사용자가 삭제되었습니다.');
}

/**
 * 사용자 그리드 전체 저장 (POST 샘플)
 */
export async function syncUserGrid(payload: UserGridPayload): Promise<ApiResponse<User[]>> {
    await delay();

    if (!payload.rows || payload.rows.length === 0) {
        return errorResponse(400, '업로드할 사용자 데이터가 없습니다.');
    }

    usersDb.length = 0;
    payload.rows.forEach((row) => {
        usersDb.push({
            ...row,
            id: row.id || generateId('user'),
        });
    });

    return successResponse([...usersDb], '사용자 그리드를 저장했습니다.');
}

// ========== Axios 연동 샘플 ==========

export const fetchUsersWithAxios = (orgId?: string, rankId?: string) =>
    httpRequest.get<ApiResponse<User[]>>('/users', {
        params: { orgId, rankId },
    });

export const createUserWithAxios = (input: Omit<User, 'id'>) =>
    httpRequest.post<ApiResponse<User>>('/users', input);

export const updateUserWithAxios = (id: string, input: Partial<User>) =>
    httpRequest.put<ApiResponse<User>>(`/users/${id}`, input);

export const patchUserWithAxios = (id: string, input: Partial<User>) =>
    httpRequest.patch<ApiResponse<User>>(`/users/${id}`, input);

export const deleteUserWithAxios = (id: string) =>
    httpRequest.delete<ApiResponse<null>>(`/users/${id}`);

export const syncUserGridWithAxios = (payload: UserGridPayload) =>
    httpRequest.post<ApiResponse<User[]>>('/users/grid-sync', payload);

export const userApiMockSamples = {
    create: {
        name: '홍새봄',
        email: 'hongsb@example.com',
        orgId: 'org-4',
        rankId: 'rank-11',
        isActive: true,
    } satisfies Omit<User, 'id'>,
    patch: {
        isActive: false,
    } satisfies Partial<User>,
    grid: {
        rows: [
            { id: 'user-1', orgId: 'org-2', rankId: 'rank-1', name: '김철수', email: 'kim@dev.com', isActive: true },
            { id: 'user-2', orgId: 'org-4', rankId: 'rank-2', name: '이영희', email: 'lee@dev1.com', isActive: true },
            { id: '', orgId: 'org-5', rankId: 'rank-14', name: '신규사용자', email: 'new@dev.com', isActive: true },
        ],
    } satisfies UserGridPayload,
};

