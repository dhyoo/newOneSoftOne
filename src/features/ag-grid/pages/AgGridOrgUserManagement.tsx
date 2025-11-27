/**
 * 조직/직급/사용자 관리 샘플 페이지
 * 
 * 실제 API 호출은 하지 않지만, API 레이어와 스토어가 분리되어 있어
 * 실제 백엔드 연동으로 쉽게 교체할 수 있는 구조로 구현
 * 
 * 구조:
 * - API: src/api/org/, src/api/rank/, src/api/user/ (도메인별 분리)
 * - 스토어: src/store/orgStore.ts, rankStore.ts, userStore.ts (도메인별 분리)
 * - 컴포넌트: OrgTab, RankTab, UserTab, ApiLogViewer (기능별 분리)
 */

import { useEffect, useMemo } from 'react';
import { useOrgStore } from '../../../store/orgStore';
import { useRankStore } from '../../../store/rankStore';
import { useUserStore } from '../../../store/userStore';
import OrgTab from '../components/OrgTab';
import RankTab from '../components/RankTab';
import UserTab from '../components/UserTab';
import ApiLogViewer from '../components/ApiLogViewer';
import GlobalSelectionPanel from '../components/GlobalSelectionPanel';
import Tabs from '../components/Tabs';
import { useGlobalSelectionStore } from '../../../store/globalSelectionStore';
import { Building2, Users, User } from 'lucide-react';
import { RefreshCw } from 'lucide-react';

// ========== 컴포넌트 ==========

export default function AgGridOrgUserManagement() {
    // 전역 스토어에서 세션 상태 가져오기
    const { session } = useGlobalSelectionStore();

    // 각 스토어에서 초기 데이터 로드 및 상태 가져오기
    const {
        loading: orgLoading,
        error: orgError,
        fetchOrgs,
    } = useOrgStore();

    const {
        loading: rankLoading,
        error: rankError,
        fetchRanks,
    } = useRankStore();

    const {
        loading: userLoading,
        error: userError,
        fetchUsers,
    } = useUserStore();

    // 현재 활성 탭 ID
    const activeTabId = session.lastActiveTab || 'org';
    
    // 현재 활성 탭의 로딩/에러 상태
    const loading = activeTabId === 'org' ? orgLoading : activeTabId === 'rank' ? rankLoading : userLoading;
    const error = activeTabId === 'org' ? orgError : activeTabId === 'rank' ? rankError : userError;

    // 초기 데이터 로드
    useEffect(() => {
        fetchOrgs();
        fetchRanks();
        fetchUsers();
    }, [fetchOrgs, fetchRanks, fetchUsers]);

    // 에러 클리어 핸들러
    const handleClearError = () => {
        if (activeTabId === 'org') {
            useOrgStore.setState({ error: null });
        } else if (activeTabId === 'rank') {
            useRankStore.setState({ error: null });
        } else {
            useUserStore.setState({ error: null });
        }
    };

    // 탭 아이템 정의
    const tabItems = useMemo(() => [
        {
            id: 'org',
            label: '조직',
            icon: <Building2 className="w-4 h-4" />,
            content: <OrgTab />,
        },
        {
            id: 'rank',
            label: '직급',
            icon: <Users className="w-4 h-4" />,
            content: <RankTab />,
        },
        {
            id: 'user',
            label: '사용자',
            icon: <User className="w-4 h-4" />,
            content: <UserTab />,
        },
    ], []);

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 헤더 */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">조직/직급/사용자 관리</h1>
                    <p className="text-slate-600">
                        조직, 직급, 사용자를 관리하는 샘플 페이지입니다. 실제 API 호출은 하지 않지만, API 레이어와 스토어가 분리되어 있어 실제 백엔드 연동으로 쉽게 교체할 수 있습니다.
                    </p>
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                        <span className="text-red-800">{error}</span>
                        <button onClick={handleClearError} className="text-red-600 hover:text-red-800">
                            ✕
                        </button>
                    </div>
                )}

                {/* 로딩 표시 */}
                {loading && (
                    <div className="flex items-center justify-center py-6">
                        <RefreshCw className="w-6 h-6 text-primary animate-spin" />
                        <span className="ml-2 text-slate-600 text-sm">데이터 새로고침 중...</span>
                    </div>
                )}

                {/* 탭 컴포넌트 - 기능적으로 분리된 탭 구조 */}
                <Tabs
                    items={tabItems}
                    defaultActiveTab="org"
                />

                {/* 전역 선택 상태 관리 패널 */}
                <div className="mt-6">
                    <GlobalSelectionPanel />
                </div>

                {/* API 호출 로그 */}
                <div className="mt-6">
                    <ApiLogViewer />
                </div>
            </div>
        </div>
    );
}
