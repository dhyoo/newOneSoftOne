/**
 * 전역 선택 상태 관리 패널
 * 
 * 다양한 전역 상태 관리 패턴을 시각적으로 보여주는 컴포넌트
 */

import { useGlobalSelectionStore } from '../../../store/globalSelectionStore';
import { useOrgStore } from '../../../store/orgStore';
import { useRankStore } from '../../../store/rankStore';
import { useUserStore } from '../../../store/userStore';
import { Star, History, Filter, Bookmark, Clock, Grid, LayoutGrid } from 'lucide-react';

export default function GlobalSelectionPanel() {
    const {
        // 단건 선택
        selectedOrgId,
        selectedRankId,
        selectedUserId,
        clearAllSelections,
        // 다중 선택
        selectedOrgIds,
        selectedRankIds,
        selectedUserIds,
        clearMultiSelections,
        // 필터
        filters,
        clearFilters,
        // 히스토리
        selectionHistory,
        clearHistory,
        // 북마크
        bookmarks,
        clearBookmarks,
        // 세션
        session,
        setViewMode,
    } = useGlobalSelectionStore();

    const { orgs } = useOrgStore();
    const { ranks } = useRankStore();
    const { users } = useUserStore();

    // 선택된 항목의 이름 가져오기
    const getOrgName = (id: string | null) => orgs.find((o) => o.id === id)?.name || id;
    const getRankName = (id: string | null) => ranks.find((r) => r.id === id)?.name || id;
    const getUserName = (id: string | null) => users.find((u) => u.id === id)?.name || id;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">전역 선택 상태 관리 샘플</h2>

            {/* 1. 단건 선택 */}
            <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <h3 className="font-semibold text-slate-900">1. 단건 선택 (Single Selection)</h3>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-20">조직:</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            {selectedOrgId ? getOrgName(selectedOrgId) : '없음'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-20">직급:</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                            {selectedRankId ? getRankName(selectedRankId) : '없음'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-20">사용자:</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                            {selectedUserId ? getUserName(selectedUserId) : '없음'}
                        </span>
                    </div>
                    <button
                        onClick={clearAllSelections}
                        className="mt-2 px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                    >
                        전체 선택 해제
                    </button>
                </div>
            </div>

            {/* 2. 다중 선택 */}
            <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Grid className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-slate-900">2. 다중 선택 (Multi Selection)</h3>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-20">조직:</span>
                        <div className="flex flex-wrap gap-1">
                            {selectedOrgIds.length > 0 ? (
                                selectedOrgIds.map((id) => (
                                    <span key={id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                        {getOrgName(id)}
                                    </span>
                                ))
                            ) : (
                                <span className="text-slate-400">없음</span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-20">직급:</span>
                        <div className="flex flex-wrap gap-1">
                            {selectedRankIds.length > 0 ? (
                                selectedRankIds.map((id) => (
                                    <span key={id} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                        {getRankName(id)}
                                    </span>
                                ))
                            ) : (
                                <span className="text-slate-400">없음</span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-20">사용자:</span>
                        <div className="flex flex-wrap gap-1">
                            {selectedUserIds.length > 0 ? (
                                selectedUserIds.map((id) => (
                                    <span key={id} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                                        {getUserName(id)}
                                    </span>
                                ))
                            ) : (
                                <span className="text-slate-400">없음</span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={clearMultiSelections}
                        className="mt-2 px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                    >
                        다중 선택 해제
                    </button>
                </div>
            </div>

            {/* 3. 필터 상태 */}
            <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold text-slate-900">3. 필터 상태 (Filter State)</h3>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-24">조직 필터:</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">
                            {filters.orgId ? getOrgName(filters.orgId) : '전체'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-24">직급 필터:</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">
                            {filters.rankId ? getRankName(filters.rankId) : '전체'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-24">검색어:</span>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">
                            {filters.searchKeyword || '없음'}
                        </span>
                    </div>
                    <button
                        onClick={clearFilters}
                        className="mt-2 px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                    >
                        필터 초기화
                    </button>
                </div>
            </div>

            {/* 4. 선택 히스토리 */}
            <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <History className="w-5 h-5 text-indigo-500" />
                        <h3 className="font-semibold text-slate-900">4. 선택 히스토리 (Selection History)</h3>
                    </div>
                    <button
                        onClick={clearHistory}
                        className="text-xs text-slate-500 hover:text-slate-700"
                    >
                        전체 삭제
                    </button>
                </div>
                <div className="space-y-1 text-sm max-h-32 overflow-y-auto">
                    {selectionHistory.length > 0 ? (
                        selectionHistory.map((item) => (
                            <div key={item.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-500">{item.timestamp}</span>
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                    item.type === 'org' ? 'bg-blue-100 text-blue-800' :
                                    item.type === 'rank' ? 'bg-green-100 text-green-800' :
                                    'bg-purple-100 text-purple-800'
                                }`}>
                                    {item.type === 'org' ? '조직' : item.type === 'rank' ? '직급' : '사용자'}
                                </span>
                                <span className="text-slate-700">{item.entityName}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-400 text-xs">히스토리가 없습니다.</p>
                    )}
                </div>
            </div>

            {/* 5. 즐겨찾기 */}
            <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Bookmark className="w-5 h-5 text-red-500" />
                        <h3 className="font-semibold text-slate-900">5. 즐겨찾기 (Bookmarks)</h3>
                    </div>
                    <button
                        onClick={() => clearBookmarks()}
                        className="text-xs text-slate-500 hover:text-slate-700"
                    >
                        전체 삭제
                    </button>
                </div>
                <div className="space-y-2 text-sm">
                    <div>
                        <span className="text-slate-600 text-xs">조직 ({bookmarks.orgs.length}):</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {bookmarks.orgs.map((id) => (
                                <span key={id} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                    {getOrgName(id)}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-slate-600 text-xs">직급 ({bookmarks.ranks.length}):</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {bookmarks.ranks.map((id) => (
                                <span key={id} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                    {getRankName(id)}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-slate-600 text-xs">사용자 ({bookmarks.users.length}):</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {bookmarks.users.map((id) => (
                                <span key={id} className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                    {getUserName(id)}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. 세션 상태 */}
            <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <LayoutGrid className="w-5 h-5 text-teal-500" />
                    <h3 className="font-semibold text-slate-900">6. 세션 상태 (Session State)</h3>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-24">마지막 탭:</span>
                        <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded">
                            {session.lastActiveTab || '없음'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600 w-24">뷰 모드:</span>
                        <div className="flex gap-1">
                            {(['grid', 'list', 'card'] as const).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-2 py-1 rounded text-xs transition-colors ${
                                        session.viewMode === mode
                                            ? 'bg-teal-500 text-white'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                >
                                    {mode === 'grid' ? '그리드' : mode === 'list' ? '리스트' : '카드'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

