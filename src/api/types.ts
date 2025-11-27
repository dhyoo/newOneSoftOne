/**
 * 조직/직급/사용자 관리 공통 타입 정의
 */

export type Org = {
    id: string;
    name: string;
    parentId?: string | null;
    isActive: boolean;
};

export type Rank = {
    id: string;
    orgId: string;
    name: string;
    level: number;
    isActive: boolean;
};

export type User = {
    id: string;
    orgId: string;
    rankId: string;
    name: string;
    email: string;
    isActive: boolean;
};

export type ApiLog = {
    id: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
    timestamp: string;
    success: boolean;
    message?: string;
};

