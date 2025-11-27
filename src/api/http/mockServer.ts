/**
 * Axios Mock Server
 *
 * 실제 백엔드가 없어도 axios 요청이 정상 응답하도록
 * axios-mock-adapter를 이용해 간단한 인메모리 서버를 구성했습니다.
 */

import AxiosMockAdapter from 'axios-mock-adapter';
import { httpClient } from './client';
import { orgsDb, ranksDb, usersDb } from '../shared/db';
import { generateId, successResponse, errorResponse } from '../shared/utils';
import type { Org, Rank, User } from '../types';

const shouldEnableMock = import.meta.env.VITE_ENABLE_AXIOS_MOCK !== 'false';

if (shouldEnableMock) {
    const mock = new AxiosMockAdapter(httpClient, { delayResponse: 400 });

    // ---------- Org ----------
    mock.onGet(/\/orgs$/).reply(() => {
        return [200, successResponse<Org[]>([...orgsDb], '조직 목록(axios mock)')];
    });

    mock.onPost(/\/orgs$/).reply((config) => {
        const payload = JSON.parse(config.data) as Omit<Org, 'id'>;
        const newOrg: Org = { id: generateId('org'), ...payload };
        orgsDb.push(newOrg);
        return [200, successResponse(newOrg, '조직 생성(axios mock)')];
    });

    mock.onPut(/\/orgs\/[^/]+$/).reply((config) => {
        const [, id] = config.url?.split('/orgs/') ?? ['', ''];
        const payload = JSON.parse(config.data) as Partial<Org>;
        const index = orgsDb.findIndex((org) => org.id === id);
        if (index === -1) return [404, errorResponse<Org>(404, '조직을 찾을 수 없습니다.')];
        orgsDb[index] = { ...orgsDb[index], ...payload };
        return [200, successResponse(orgsDb[index], '조직 수정(axios mock)')];
    });

    mock.onPatch(/\/orgs\/[^/]+$/).reply((config) => {
        const [, id] = config.url?.split('/orgs/') ?? ['', ''];
        const payload = JSON.parse(config.data) as Partial<Org>;
        const index = orgsDb.findIndex((org) => org.id === id);
        if (index === -1) return [404, errorResponse<Org>(404, '조직을 찾을 수 없습니다.')];
        orgsDb[index] = { ...orgsDb[index], ...payload };
        return [200, successResponse(orgsDb[index], '조직 일부 수정(axios mock)')];
    });

    mock.onDelete(/\/orgs\/[^/]+$/).reply((config) => {
        const [, id] = config.url?.split('/orgs/') ?? ['', ''];
        const index = orgsDb.findIndex((org) => org.id === id);
        if (index === -1) return [404, errorResponse<null>(404, '조직을 찾을 수 없습니다.')];
        orgsDb.splice(index, 1);
        return [200, successResponse(null, '조직 삭제(axios mock)')];
    });

    mock.onPost(/\/orgs\/grid-sync$/).reply((config) => {
        const { rows } = JSON.parse(config.data) as { rows: Org[] };
        orgsDb.length = 0;
        rows.forEach((row) => orgsDb.push({ ...row, id: row.id || generateId('org') }));
        return [200, successResponse([...orgsDb], '조직 그리드 저장(axios mock)')];
    });

    // ---------- Rank ----------
    mock.onGet(/\/ranks$/).reply((config) => {
        const orgId = config.params?.orgId as string | undefined;
        let data = [...ranksDb];
        if (orgId) data = data.filter((rank) => rank.orgId === orgId);
        return [200, successResponse<Rank[]>(data, '직급 목록(axios mock)')];
    });

    mock.onPost(/\/ranks$/).reply((config) => {
        const payload = JSON.parse(config.data) as Omit<Rank, 'id'>;
        const newRank: Rank = { id: generateId('rank'), ...payload };
        ranksDb.push(newRank);
        return [200, successResponse(newRank, '직급 생성(axios mock)')];
    });

    mock.onPut(/\/ranks\/[^/]+$/).reply((config) => {
        const [, id] = config.url?.split('/ranks/') ?? ['', ''];
        const payload = JSON.parse(config.data) as Partial<Rank>;
        const index = ranksDb.findIndex((rank) => rank.id === id);
        if (index === -1) return [404, errorResponse<Rank>(404, '직급을 찾을 수 없습니다.')];
        ranksDb[index] = { ...ranksDb[index], ...payload };
        return [200, successResponse(ranksDb[index], '직급 수정(axios mock)')];
    });

    mock.onPatch(/\/ranks\/[^/]+$/).reply((config) => {
        const [, id] = config.url?.split('/ranks/') ?? ['', ''];
        const payload = JSON.parse(config.data) as Partial<Rank>;
        const index = ranksDb.findIndex((rank) => rank.id === id);
        if (index === -1) return [404, errorResponse<Rank>(404, '직급을 찾을 수 없습니다.')];
        ranksDb[index] = { ...ranksDb[index], ...payload };
        return [200, successResponse(ranksDb[index], '직급 일부 수정(axios mock)')];
    });

    mock.onDelete(/\/ranks\/[^/]+$/).reply((config) => {
        const [, id] = config.url?.split('/ranks/') ?? ['', ''];
        const index = ranksDb.findIndex((rank) => rank.id === id);
        if (index === -1) return [404, errorResponse<null>(404, '직급을 찾을 수 없습니다.')];
        ranksDb.splice(index, 1);
        return [200, successResponse(null, '직급 삭제(axios mock)')];
    });

    mock.onPost(/\/ranks\/grid-sync$/).reply((config) => {
        const { rows } = JSON.parse(config.data) as { rows: Rank[] };
        ranksDb.length = 0;
        rows.forEach((row) => ranksDb.push({ ...row, id: row.id || generateId('rank') }));
        return [200, successResponse([...ranksDb], '직급 그리드 저장(axios mock)')];
    });

    // ---------- User ----------
    mock.onGet(/\/users$/).reply((config) => {
        const orgId = config.params?.orgId as string | undefined;
        const rankId = config.params?.rankId as string | undefined;
        let data = [...usersDb];
        if (orgId) data = data.filter((user) => user.orgId === orgId);
        if (rankId) data = data.filter((user) => user.rankId === rankId);
        return [200, successResponse<User[]>(data, '사용자 목록(axios mock)')];
    });

    mock.onPost(/\/users$/).reply((config) => {
        const payload = JSON.parse(config.data) as Omit<User, 'id'>;
        const newUser: User = { id: generateId('user'), ...payload };
        usersDb.push(newUser);
        return [200, successResponse(newUser, '사용자 생성(axios mock)')];
    });

    mock.onPut(/\/users\/[^/]+$/).reply((config) => {
        const [, id] = config.url?.split('/users/') ?? ['', ''];
        const payload = JSON.parse(config.data) as Partial<User>;
        const index = usersDb.findIndex((user) => user.id === id);
        if (index === -1) return [404, errorResponse<User>(404, '사용자를 찾을 수 없습니다.')];
        usersDb[index] = { ...usersDb[index], ...payload };
        return [200, successResponse(usersDb[index], '사용자 수정(axios mock)')];
    });

    mock.onPatch(/\/users\/[^/]+$/).reply((config) => {
        const [, id] = config.url?.split('/users/') ?? ['', ''];
        const payload = JSON.parse(config.data) as Partial<User>;
        const index = usersDb.findIndex((user) => user.id === id);
        if (index === -1) return [404, errorResponse<User>(404, '사용자를 찾을 수 없습니다.')];
        usersDb[index] = { ...usersDb[index], ...payload };
        return [200, successResponse(usersDb[index], '사용자 일부 수정(axios mock)')];
    });

    mock.onDelete(/\/users\/[^/]+$/).reply((config) => {
        const [, id] = config.url?.split('/users/') ?? ['', ''];
        const index = usersDb.findIndex((user) => user.id === id);
        if (index === -1) return [404, errorResponse<null>(404, '사용자를 찾을 수 없습니다.')];
        usersDb.splice(index, 1);
        return [200, successResponse(null, '사용자 삭제(axios mock)')];
    });

    mock.onPost(/\/users\/grid-sync$/).reply((config) => {
        const { rows } = JSON.parse(config.data) as { rows: User[] };
        usersDb.length = 0;
        rows.forEach((row) => usersDb.push({ ...row, id: row.id || generateId('user') }));
        return [200, successResponse([...usersDb], '사용자 그리드 저장(axios mock)')];
    });
}


