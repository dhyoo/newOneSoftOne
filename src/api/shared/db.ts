/**
 * In-Memory 데이터베이스
 * 
 * 실제 프로젝트에서는 이 부분을 제거하고 실제 백엔드 API를 호출합니다.
 */

import type { Org, Rank, User } from '../types';

const rootOrgId = 'org-root';
const orgTeamCount = 5;
const targetUserCount = 1000;

const departmentNames = [
    '디지털혁신본부',
    '클라우드전략본부',
    '플랫폼사업본부',
    '고객성공본부',
    'AI서비스본부',
    '스마트팩토리본부',
    '글로벌사업본부',
    '경영지원본부',
    '솔루션사업본부',
    '신사업센터',
];

const teamKeywords = ['플랫폼', '데이터', 'AI', '모바일', 'Infra', '컨설팅', 'DevOps', '운영', '스마트', '클라우드'];
const teamSuffixes = ['1팀', '2팀', '3팀', '랩', 'Agile팀', '센터', 'Cell'];

const rootRankTemplates = [
    { name: 'CEO', level: 1 },
    { name: 'COO', level: 2 },
    { name: 'CFO', level: 3 },
];

const deptRankTemplates = [
    { name: '본부장', level: 1 },
    { name: '실장', level: 2 },
    { name: '수석', level: 3 },
    { name: '책임', level: 4 },
    { name: '선임', level: 5 },
    { name: '주임', level: 6 },
];

const teamRankTemplates = [
    { name: '팀장', level: 2 },
    { name: '수석', level: 3 },
    { name: '선임', level: 4 },
    { name: '주임', level: 5 },
    { name: '사원', level: 6 },
    { name: '인턴', level: 7 },
];

const familyNames = ['Kim', 'Lee', 'Park', 'Choi', 'Jung', 'Han', 'Kang', 'Yoon', 'Cho', 'Lim', 'Song', 'Shin', 'Seo', 'Jang', 'Ryu', 'Kwon', 'Moon', 'An', 'Oh', 'Nam', 'Baek', 'Hwang', 'Jeon', 'Bae'];
const givenNames = [
    'Minjun',
    'Seoyun',
    'Jiwon',
    'Yejin',
    'Haneul',
    'Donghyun',
    'Jisoo',
    'Gyuri',
    'Harin',
    'Yubin',
    'Sumin',
    'Jimin',
    'Sunwoo',
    'Heejin',
    'Minsung',
    'Sera',
    'Yuna',
    'Jaeho',
    'Hyemin',
    'Suhyeon',
    'Youngju',
    'Hajin',
    'Doyoon',
    'Eunseo',
    'Minkyu',
    'Rowoon',
    'Youngeun',
    'Harin',
    'Sehun',
    'Hyojin',
    'Yeonsu',
];

const slug = (value: string) => value.toLowerCase().replace(/[^a-z]/g, '');

const buildOrgs = (): Org[] => {
    const orgs: Org[] = [{ id: rootOrgId, name: 'SOFTONE HQ', parentId: null, isActive: true }];

    departmentNames.forEach((deptName, deptIdx) => {
        const deptId = `org-dept-${deptIdx + 1}`;
        orgs.push({ id: deptId, name: deptName, parentId: rootOrgId, isActive: true });

        for (let i = 0; i < orgTeamCount; i++) {
            const keyword = teamKeywords[(deptIdx + i) % teamKeywords.length];
            const suffix = teamSuffixes[i % teamSuffixes.length];
            orgs.push({
                id: `${deptId}-team-${i + 1}`,
                name: `${keyword} ${suffix}`,
                parentId: deptId,
                isActive: true,
            });
        }
    });

    return orgs;
};

const buildRanks = (orgs: Org[]): Rank[] => {
    const ranks: Rank[] = [];
    let rankCounter = 1;

    orgs.forEach((org) => {
        let templates = teamRankTemplates;
        if (!org.parentId) {
            templates = rootRankTemplates;
        } else if (org.parentId === rootOrgId) {
            templates = deptRankTemplates;
        }

        templates.forEach((template) => {
            ranks.push({
                id: `rank-${rankCounter++}`,
                orgId: org.id,
                name: template.name,
                level: template.level,
                isActive: true,
            });
        });
    });

    return ranks;
};

const buildUsers = (orgs: Org[], ranks: Rank[]): User[] => {
    const users: User[] = [];
    const workerOrgs = orgs.filter((org) => org.parentId && org.parentId !== rootOrgId);
    let userCounter = 1;

    while (users.length < targetUserCount) {
        const org = workerOrgs[userCounter % workerOrgs.length];
        const orgRanks = ranks.filter((rank) => rank.orgId === org.id);
        const rank = orgRanks.length ? orgRanks[userCounter % orgRanks.length] : ranks[userCounter % ranks.length];

        const family = familyNames[userCounter % familyNames.length];
        const given = givenNames[(userCounter + Math.floor(userCounter / familyNames.length)) % givenNames.length];
        const name = `${family} ${given}`;
        const email = `${slug(family)}.${slug(given)}${userCounter}@softone.example.com`;

        users.push({
            id: `user-${userCounter}`,
            orgId: org.id,
            rankId: rank.id,
            name,
            email,
            isActive: userCounter % 13 !== 0,
        });

        userCounter += 1;
    }

    return users;
};

export const orgsDb = buildOrgs();
export const ranksDb = buildRanks(orgsDb);
export const usersDb = buildUsers(orgsDb, ranksDb);

