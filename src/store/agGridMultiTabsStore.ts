import { create } from 'zustand';

/**
 * 탭 ID 타입 정의
 * 각 탭은 고유한 ID를 가집니다.
 */
export type TabId = 'users' | 'products' | 'orders';

/**
 * 멀티 그리드 상태 타입 정의
 * 각 탭마다 좌측/우측 그리드의 데이터와 선택 상태를 관리합니다.
 */
export interface MultiGridState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    leftRowData: any[]; // 좌측 그리드의 행 데이터 (ag-Grid는 다양한 타입을 받을 수 있음)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rightRowData: any[]; // 우측 그리드의 행 데이터
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedLeftRows: any[]; // 좌측 그리드에서 선택된 행들
}

/**
 * 멀티 그리드 탭 스토어 타입 정의
 * 여러 탭의 상태를 독립적으로 관리하는 중앙 저장소
 */
export interface MultiGridTabsStore {
    // 현재 활성화된 탭 ID
    activeTabId: TabId;

    // 각 탭별 상태를 저장하는 맵
    // key: TabId, value: MultiGridState
    tabs: Record<TabId, MultiGridState>;

    // ========== 액션들 ==========

    /**
     * 활성 탭 변경
     * @param tabId - 활성화할 탭 ID
     */
    setActiveTab: (tabId: TabId) => void;

    /**
     * 특정 탭의 좌측 그리드 데이터 설정
     * @param tabId - 탭 ID
     * @param rows - 설정할 행 데이터 배열
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setLeftRowData: (tabId: TabId, rows: any[]) => void;

    /**
     * 특정 탭의 우측 그리드 데이터 설정
     * @param tabId - 탭 ID
     * @param rows - 설정할 행 데이터 배열
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setRightRowData: (tabId: TabId, rows: any[]) => void;

    /**
     * 특정 탭의 좌측 그리드 선택된 행들 설정
     * @param tabId - 탭 ID
     * @param rows - 선택된 행 데이터 배열
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedLeftRows: (tabId: TabId, rows: any[]) => void;

    /**
     * 좌측 그리드에서 선택된 행들을 우측 그리드로 동기화
     * 선택된 행들을 우측 그리드의 데이터로 복사합니다.
     * @param tabId - 탭 ID
     */
    syncSelectedToRight: (tabId: TabId) => void;

    /**
     * 특정 탭의 상태 초기화
     * @param tabId - 탭 ID
     * @param initialState - 초기 상태 (선택적)
     */
    initTab: (tabId: TabId, initialState?: Partial<MultiGridState>) => void;
}

/**
 * 초기 상태 생성 함수
 * 각 탭의 기본 상태를 반환합니다.
 */
const createInitialState = (): MultiGridState => ({
    leftRowData: [],
    rightRowData: [],
    selectedLeftRows: [],
});

/**
 * Zustand store 생성
 * 탭별로 독립된 멀티 그리드 상태를 관리하는 저장소
 */
export const useMultiGridTabsStore = create<MultiGridTabsStore>((set, get) => ({
    // 초기 활성 탭: 'users'
    activeTabId: 'users',

    // 각 탭의 초기 상태
    tabs: {
        users: createInitialState(),
        products: createInitialState(),
        orders: createInitialState(),
    },

    // 활성 탭 변경
    setActiveTab: (tabId) =>
        set({
            activeTabId: tabId,
        }),

    // 좌측 그리드 데이터 설정
    setLeftRowData: (tabId, rows) =>
        set((state) => ({
            tabs: {
                ...state.tabs,
                [tabId]: {
                    ...state.tabs[tabId],
                    leftRowData: rows,
                },
            },
        })),

    // 우측 그리드 데이터 설정
    setRightRowData: (tabId, rows) =>
        set((state) => ({
            tabs: {
                ...state.tabs,
                [tabId]: {
                    ...state.tabs[tabId],
                    rightRowData: rows,
                },
            },
        })),

    // 좌측 그리드 선택된 행들 설정
    setSelectedLeftRows: (tabId, rows) =>
        set((state) => ({
            tabs: {
                ...state.tabs,
                [tabId]: {
                    ...state.tabs[tabId],
                    selectedLeftRows: rows,
                },
            },
        })),

    // 좌측 선택을 우측으로 동기화
    syncSelectedToRight: (tabId) => {
        const state = get();
        const selectedRows = state.tabs[tabId]?.selectedLeftRows || [];
        set((currentState) => ({
            tabs: {
                ...currentState.tabs,
                [tabId]: {
                    ...currentState.tabs[tabId],
                    rightRowData: [...selectedRows], // 선택된 행들을 우측으로 복사
                },
            },
        }));
    },

    // 탭 초기화
    initTab: (tabId, initialState) =>
        set((state) => ({
            tabs: {
                ...state.tabs,
                [tabId]: {
                    ...createInitialState(),
                    ...initialState,
                },
            },
        })),
}));

