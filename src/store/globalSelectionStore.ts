/**
 * 전역 선택 상태 관리 스토어
 * 
 * 최근 프로젝트에서 많이 사용하는 다양한 전역 상태 관리 패턴을 샘플로 구현
 * 
 * 포함된 패턴:
 * 1. 단건 선택 (Single Selection)
 * 2. 다중 선택 (Multi Selection)
 * 3. 필터 상태 (Filter State)
 * 4. 선택 히스토리 (Selection History)
 * 5. 즐겨찾기/북마크 (Bookmarks)
 * 6. 세션 상태 (Session State)
 */

import { create } from 'zustand';

// ========== 타입 정의 ==========

export type SelectionType = 'org' | 'rank' | 'user';

export type SelectionHistory = {
    id: string;
    type: SelectionType;
    entityId: string;
    entityName: string;
    timestamp: string;
};

export interface GlobalSelectionStore {
    // ========== 1. 단건 선택 (Single Selection) ==========
    // 가장 기본적인 패턴: 현재 선택된 단일 항목
    selectedOrgId: string | null;
    selectedRankId: string | null;
    selectedUserId: string | null;

    setSelectedOrgId: (orgId: string | null) => void;
    setSelectedRankId: (rankId: string | null) => void;
    setSelectedUserId: (userId: string | null) => void;
    clearAllSelections: () => void;

    // ========== 2. 다중 선택 (Multi Selection) ==========
    // 여러 항목을 동시에 선택할 수 있는 패턴
    selectedOrgIds: string[];
    selectedRankIds: string[];
    selectedUserIds: string[];

    toggleOrgSelection: (orgId: string) => void;
    toggleRankSelection: (rankId: string) => void;
    toggleUserSelection: (userId: string) => void;
    clearMultiSelections: () => void;

    // ========== 3. 필터 상태 (Filter State) ==========
    // 검색/필터링 조건을 전역으로 관리하는 패턴
    filters: {
        orgId?: string | null;
        rankId?: string | null;
        searchKeyword?: string;
        isActive?: boolean | null;
    };

    setFilter: (key: keyof GlobalSelectionStore['filters'], value: string | null | boolean | undefined) => void;
    clearFilters: () => void;

    // ========== 4. 선택 히스토리 (Selection History) ==========
    // 최근 선택한 항목들을 기록하는 패턴 (최대 10개)
    selectionHistory: SelectionHistory[];
    maxHistorySize: number;

    addToHistory: (type: SelectionType, entityId: string, entityName: string) => void;
    clearHistory: () => void;
    getRecentSelections: (type?: SelectionType) => SelectionHistory[];

    // ========== 5. 즐겨찾기/북마크 (Bookmarks) ==========
    // 자주 사용하는 항목을 북마크하는 패턴
    bookmarks: {
        orgs: string[];
        ranks: string[];
        users: string[];
    };

    toggleBookmark: (type: SelectionType, entityId: string) => void;
    isBookmarked: (type: SelectionType, entityId: string) => boolean;
    clearBookmarks: (type?: SelectionType) => void;

    // ========== 6. 세션 상태 (Session State) ==========
    // 현재 세션의 상태를 저장하는 패턴 (탭 전환 시 유지)
    session: {
        lastActiveTab: 'org' | 'rank' | 'user' | null;
        lastSelectedOrg: string | null;
        lastSelectedRank: string | null;
        lastSelectedUser: string | null;
        viewMode: 'grid' | 'list' | 'card';
    };

    setLastActiveTab: (tab: 'org' | 'rank' | 'user' | null) => void;
    setViewMode: (mode: 'grid' | 'list' | 'card') => void;
    resetSession: () => void;
}

// ========== Zustand 스토어 생성 ==========

export const useGlobalSelectionStore = create<GlobalSelectionStore>((set, get) => ({
            // ========== 1. 단건 선택 초기 상태 ==========
            selectedOrgId: null,
            selectedRankId: null,
            selectedUserId: null,

            setSelectedOrgId: (orgId) => {
                set({ selectedOrgId: orgId });
                // 선택 시 히스토리에도 추가
                // 실제 프로젝트에서는 orgs 배열에서 이름을 가져와야 함
                // 여기서는 전역 스토어가 orgs에 접근할 수 없으므로, 컴포넌트에서 처리
            },

            setSelectedRankId: (rankId) => {
                set({ selectedRankId: rankId });
                // 히스토리 추가는 컴포넌트에서 이름과 함께 처리
            },

            setSelectedUserId: (userId) => {
                set({ selectedUserId: userId });
                // 히스토리 추가는 컴포넌트에서 이름과 함께 처리
            },

            clearAllSelections: () => {
                set({
                    selectedOrgId: null,
                    selectedRankId: null,
                    selectedUserId: null,
                });
            },

            // ========== 2. 다중 선택 초기 상태 ==========
            selectedOrgIds: [],
            selectedRankIds: [],
            selectedUserIds: [],

            toggleOrgSelection: (orgId) => {
                set((state) => {
                    const isSelected = state.selectedOrgIds.includes(orgId);
                    return {
                        selectedOrgIds: isSelected
                            ? state.selectedOrgIds.filter((id) => id !== orgId)
                            : [...state.selectedOrgIds, orgId],
                    };
                });
            },

            toggleRankSelection: (rankId) => {
                set((state) => {
                    const isSelected = state.selectedRankIds.includes(rankId);
                    return {
                        selectedRankIds: isSelected
                            ? state.selectedRankIds.filter((id) => id !== rankId)
                            : [...state.selectedRankIds, rankId],
                    };
                });
            },

            toggleUserSelection: (userId) => {
                set((state) => {
                    const isSelected = state.selectedUserIds.includes(userId);
                    return {
                        selectedUserIds: isSelected
                            ? state.selectedUserIds.filter((id) => id !== userId)
                            : [...state.selectedUserIds, userId],
                    };
                });
            },

            clearMultiSelections: () => {
                set({
                    selectedOrgIds: [],
                    selectedRankIds: [],
                    selectedUserIds: [],
                });
            },

            // ========== 3. 필터 상태 초기 상태 ==========
            filters: {
                orgId: null,
                rankId: null,
                searchKeyword: undefined,
                isActive: null,
            },

            setFilter: (key, value: string | null | boolean | undefined) => {
                set((state) => ({
                    filters: {
                        ...state.filters,
                        [key]: value,
                    },
                }));
            },

            clearFilters: () => {
                set({
                    filters: {
                        orgId: null,
                        rankId: null,
                        searchKeyword: undefined,
                        isActive: null,
                    },
                });
            },

            // ========== 4. 선택 히스토리 초기 상태 ==========
            selectionHistory: [],
            maxHistorySize: 10,

            addToHistory: (type, entityId, entityName) => {
                set((state) => {
                    const newHistory: SelectionHistory = {
                        id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        type,
                        entityId,
                        entityName,
                        timestamp: new Date().toLocaleTimeString('ko-KR'),
                    };

                    // 중복 제거 (같은 항목이면 기존 것 제거하고 최신으로 추가)
                    const filteredHistory = state.selectionHistory.filter(
                        (h) => !(h.type === type && h.entityId === entityId)
                    );

                    // 최대 크기 제한
                    const updatedHistory = [newHistory, ...filteredHistory].slice(0, state.maxHistorySize);

                    return {
                        selectionHistory: updatedHistory,
                    };
                });
            },

            clearHistory: () => {
                set({ selectionHistory: [] });
            },

            getRecentSelections: (type) => {
                const state = get();
                if (type) {
                    return state.selectionHistory.filter((h) => h.type === type);
                }
                return state.selectionHistory;
            },

            // ========== 5. 즐겨찾기 초기 상태 ==========
            bookmarks: {
                orgs: [],
                ranks: [],
                users: [],
            },

            toggleBookmark: (type, entityId) => {
                set((state) => {
                    const bookmarkKey = `${type}s` as 'orgs' | 'ranks' | 'users';
                    const bookmarks = state.bookmarks[bookmarkKey];
                    const isBookmarked = bookmarks.includes(entityId);

                    return {
                        bookmarks: {
                            ...state.bookmarks,
                            [bookmarkKey]: isBookmarked
                                ? bookmarks.filter((id) => id !== entityId)
                                : [...bookmarks, entityId],
                        },
                    };
                });
            },

            isBookmarked: (type, entityId) => {
                const state = get();
                const bookmarkKey = `${type}s` as 'orgs' | 'ranks' | 'users';
                return state.bookmarks[bookmarkKey].includes(entityId);
            },

            clearBookmarks: (type) => {
                if (type) {
                    const bookmarkKey = `${type}s` as 'orgs' | 'ranks' | 'users';
                    set((state) => ({
                        bookmarks: {
                            ...state.bookmarks,
                            [bookmarkKey]: [],
                        },
                    }));
                } else {
                    set({
                        bookmarks: {
                            orgs: [],
                            ranks: [],
                            users: [],
                        },
                    });
                }
            },

            // ========== 6. 세션 상태 초기 상태 ==========
            session: {
                lastActiveTab: null,
                lastSelectedOrg: null,
                lastSelectedRank: null,
                lastSelectedUser: null,
                viewMode: 'grid',
            },

            setLastActiveTab: (tab) => {
                set((state) => ({
                    session: {
                        ...state.session,
                        lastActiveTab: tab,
                    },
                }));
            },

            setViewMode: (mode) => {
                set((state) => ({
                    session: {
                        ...state.session,
                        viewMode: mode,
                    },
                }));
            },

            resetSession: () => {
                set({
                    session: {
                        lastActiveTab: null,
                        lastSelectedOrg: null,
                        lastSelectedRank: null,
                        lastSelectedUser: null,
                        viewMode: 'grid',
                    },
                });
        },
}));

