import { create } from 'zustand';
import type { ColDef } from 'ag-grid-community';

/**
 * 이벤트 로그 타입 정의
 * ag-Grid에서 발생하는 이벤트를 기록하기 위한 구조
 */
export interface EventLog {
    id: string; // 고유 ID (타임스탬프 + 랜덤)
    timestamp: string; // 이벤트 발생 시간
    type: string; // 이벤트 타입 (예: 'onCellValueChanged', 'onRowClicked')
    message: string; // 이벤트 설명
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any; // 이벤트 관련 추가 데이터
}

/**
 * 각 그리드의 상태 타입 정의
 */
export interface GridState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rowData: any[]; // 그리드에 표시될 행 데이터 (ag-Grid는 다양한 타입을 받을 수 있음)
    columnDefs?: ColDef[]; // 컬럼 정의 (선택적)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedRows?: any[]; // 선택된 행들
    eventLogs?: EventLog[]; // 이벤트 로그 배열
}

/**
 * AgGridStore 전체 타입 정의
 * 모든 그리드의 상태를 관리하는 중앙 저장소
 */
export interface AgGridStore {
    // 상태: gridId를 키로 하는 그리드 상태 맵
    grids: Record<string, GridState>;

    // ========== 공통 액션들 ==========

    /**
     * 특정 그리드의 rowData를 설정
     * @param gridId - 그리드 식별자
     * @param rowData - 설정할 행 데이터 배열
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setRowData: (gridId: string, rowData: any[]) => void;

    /**
     * 특정 그리드에 새 행 추가
     * @param gridId - 그리드 식별자
     * @param row - 추가할 행 데이터
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addRow: (gridId: string, row: any) => void;

    /**
     * 특정 그리드의 행 업데이트
     * @param gridId - 그리드 식별자
     * @param rowId - 업데이트할 행의 ID (또는 인덱스)
     * @param partial - 업데이트할 부분 데이터
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateRow: (gridId: string, rowId: string | number, partial: Partial<any>) => void;

    /**
     * 특정 그리드에서 행 삭제
     * @param gridId - 그리드 식별자
     * @param rowId - 삭제할 행의 ID (또는 인덱스)
     */
    removeRow: (gridId: string, rowId: string | number) => void;

    /**
     * 특정 그리드의 선택된 행들 설정
     * @param gridId - 그리드 식별자
     * @param rows - 선택된 행 데이터 배열
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedRows: (gridId: string, rows: any[]) => void;

    /**
     * 특정 그리드의 컬럼 정의 설정
     * @param gridId - 그리드 식별자
     * @param columnDefs - 컬럼 정의 배열
     */
    setColumnDefs: (gridId: string, columnDefs: ColDef[]) => void;

    /**
     * 특정 그리드에 이벤트 로그 추가
     * @param gridId - 그리드 식별자
     * @param log - 이벤트 로그 객체 (id, timestamp는 자동 생성)
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pushEventLog: (gridId: string, log: { type: string; message: string; payload?: any }) => void;

    /**
     * 특정 그리드의 이벤트 로그 초기화
     * @param gridId - 그리드 식별자
     */
    clearEventLogs: (gridId: string) => void;

    /**
     * 특정 그리드의 상태 초기화
     * @param gridId - 그리드 식별자
     * @param initialState - 초기 상태 (선택적)
     */
    initGrid: (gridId: string, initialState?: Partial<GridState>) => void;
}

/**
 * Zustand store 생성
 * 모든 ag-Grid 샘플 페이지에서 공통으로 사용하는 상태 관리 저장소
 */
export const useAgGridStore = create<AgGridStore>((set) => ({
    // 초기 상태: 빈 그리드 맵
    grids: {},

    // rowData 설정
    setRowData: (gridId, rowData) =>
        set((state) => ({
            grids: {
                ...state.grids,
                [gridId]: {
                    ...state.grids[gridId],
                    rowData,
                },
            },
        })),

    // 새 행 추가 (맨 위에 추가)
    addRow: (gridId, row) =>
        set((state) => {
            const currentGrid = state.grids[gridId];
            const currentRowData = currentGrid?.rowData || [];
            return {
                grids: {
                    ...state.grids,
                    [gridId]: {
                        ...currentGrid,
                        rowData: [row, ...currentRowData], // 배열 앞에 추가
                    },
                },
            };
        }),

    // 행 업데이트
    updateRow: (gridId, rowId, partial) =>
        set((state) => {
            const currentGrid = state.grids[gridId];
            const currentRowData = currentGrid?.rowData || [];
            const updatedRowData = currentRowData.map((row) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const rowRecord = row as any;
                // 항상 id 필드로 비교 (rowId는 데이터의 id 값)
                const isTargetRow = rowRecord.id === rowId || rowRecord.ID === rowId;
                return isTargetRow ? { ...rowRecord, ...partial } : row;
            });
            return {
                grids: {
                    ...state.grids,
                    [gridId]: {
                        ...currentGrid,
                        rowData: updatedRowData,
                    },
                },
            };
        }),

    // 행 삭제
    removeRow: (gridId, rowId) =>
        set((state) => {
            const currentGrid = state.grids[gridId];
            const currentRowData = currentGrid?.rowData || [];
            const filteredRowData = currentRowData.filter((row) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const rowRecord = row as any;
                // 항상 id 필드로 비교 (rowId는 데이터의 id 값)
                const isTargetRow = rowRecord.id === rowId || rowRecord.ID === rowId;
                return !isTargetRow;
            });
            return {
                grids: {
                    ...state.grids,
                    [gridId]: {
                        ...currentGrid,
                        rowData: filteredRowData,
                    },
                },
            };
        }),

    // 선택된 행들 설정
    setSelectedRows: (gridId, rows) =>
        set((state) => ({
            grids: {
                ...state.grids,
                [gridId]: {
                    ...state.grids[gridId],
                    selectedRows: rows,
                },
            },
        })),

    // 컬럼 정의 설정
    setColumnDefs: (gridId, columnDefs) =>
        set((state) => ({
            grids: {
                ...state.grids,
                [gridId]: {
                    ...state.grids[gridId],
                    columnDefs,
                },
            },
        })),

    // 이벤트 로그 추가
    pushEventLog: (gridId, log) =>
        set((state) => {
            const currentGrid = state.grids[gridId];
            const currentLogs = currentGrid?.eventLogs || [];
            const newLog: EventLog = {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toLocaleTimeString('ko-KR'),
                type: log.type,
                message: log.message,
                payload: log.payload,
            };
            return {
                grids: {
                    ...state.grids,
                    [gridId]: {
                        ...currentGrid,
                        eventLogs: [...currentLogs, newLog],
                    },
                },
            };
        }),

    // 이벤트 로그 초기화
    clearEventLogs: (gridId) =>
        set((state) => ({
            grids: {
                ...state.grids,
                [gridId]: {
                    ...state.grids[gridId],
                    eventLogs: [],
                },
            },
        })),

    // 그리드 초기화 (기존 데이터가 있으면 덮어쓰지 않음)
    initGrid: (gridId, initialState) =>
        set((state) => {
            const existingGrid = state.grids[gridId];
            // 기존 그리드가 있고 데이터가 있으면 초기화하지 않음
            if (existingGrid && existingGrid.rowData && existingGrid.rowData.length > 0) {
                return state; // 기존 상태 유지
            }
            // 새로 초기화하거나 기존 데이터가 없을 때만 초기화
            return {
                grids: {
                    ...state.grids,
                    [gridId]: {
                        rowData: [],
                        selectedRows: [],
                        eventLogs: [],
                        ...initialState,
                    },
                },
            };
        }),
}));

