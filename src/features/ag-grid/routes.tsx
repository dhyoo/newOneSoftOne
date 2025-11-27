import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

/**
 * ag-Grid 샘플 페이지들을 lazy load
 * 성능 최적화를 위해 필요할 때만 로드
 */
const AgGridIndex = lazy(() => import('./pages/AgGridIndex'));
const AgGridBasic = lazy(() => import('./pages/AgGridBasic'));
const AgGridCrud = lazy(() => import('./pages/AgGridCrud'));
const AgGridEvents = lazy(() => import('./pages/AgGridEvents'));
const AgGridRowPos = lazy(() => import('./pages/AgGridRowPos'));
const AgGridMultiGrid = lazy(() => import('./pages/AgGridMultiGrid'));
const AgGridMultiGridTabs = lazy(() => import('./pages/AgGridMultiGridTabs'));
const AgGridOrgUserManagement = lazy(() => import('./pages/AgGridOrgUserManagement'));

/**
 * ag-Grid 관련 라우트 정의
 * /ag-grid 경로 아래에 모든 샘플 페이지를 구성
 */
export const agGridRoutes: RouteObject[] = [
    {
        path: 'ag-grid',
        children: [
            // 인덱스 페이지: 샘플 목록
            {
                index: true,
                element: <AgGridIndex />,
            },
            // 기본 예제
            {
                path: 'basic',
                element: <AgGridBasic />,
            },
            // CRUD 샘플
            {
                path: 'crud',
                element: <AgGridCrud />,
            },
            // 이벤트 샘플
            {
                path: 'events',
                element: <AgGridEvents />,
            },
            // Row Position / Drag & Drop 샘플
            {
                path: 'row-pos',
                element: <AgGridRowPos />,
            },
            // 멀티 그리드 샘플
            {
                path: 'multi-grid',
                element: <AgGridMultiGrid />,
            },
            // 멀티 그리드 + 탭 샘플
            {
                path: 'multi-grid-tabs',
                element: <AgGridMultiGridTabs />,
            },
            // 조직/직급/사용자 관리 샘플
            {
                path: 'org-user-management',
                element: <AgGridOrgUserManagement />,
            },
        ],
    },
];

