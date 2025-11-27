import { useEffect, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, RowClickedEvent, CellValueChangedEvent, CellEditingStoppedEvent, CellFocusedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { useAgGridStore, type EventLog } from '../../../store/agGridStore';
import { Trash2 } from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * 그리드 ID 상수
 */
const GRID_ID = 'events';

/**
 * 사용자 데이터 타입
 */
interface UserData {
    id: number;
    name: string;
    age: number;
    email: string;
    status: string;
}

/**
 * 이벤트 샘플 페이지
 * ag-Grid의 다양한 이벤트를 확인하고 로그를 기록하는 예제
 */
// 빈 배열 상수 - selector에서 매번 새로운 배열을 생성하지 않도록
const EMPTY_USER_ARRAY: UserData[] = [];
const EMPTY_EVENT_LOG_ARRAY: EventLog[] = [];

export default function AgGridEvents() {
    const gridRef = useRef<AgGridReact>(null);
    // selector를 분리하여 무한 루프 방지
    const rowData = useAgGridStore((state) => (state.grids[GRID_ID]?.rowData ?? EMPTY_USER_ARRAY) as UserData[]);
    const eventLogs = useAgGridStore((state) => state.grids[GRID_ID]?.eventLogs ?? EMPTY_EVENT_LOG_ARRAY);
    const initGrid = useAgGridStore((state) => state.initGrid);
    const pushEventLog = useAgGridStore((state) => state.pushEventLog);
    const clearEventLogs = useAgGridStore((state) => state.clearEventLogs);
    const setSelectedRows = useAgGridStore((state) => state.setSelectedRows);

    // 초기 목업 데이터 생성
    const generateMockData = (): UserData[] => {
        const statuses = ['활성', '비활성', '대기'];
        const names = ['김철수', '이영희', '박민수', '정수진', '최동현', '강미영', '윤성호', '임지은'];
        const data: UserData[] = [];

        for (let i = 1; i <= 15; i++) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            data.push({
                id: i,
                name: `${randomName}${i}`,
                age: Math.floor(Math.random() * 40) + 20,
                email: `user${i}@example.com`,
                status: statuses[Math.floor(Math.random() * statuses.length)],
            });
        }
        return data;
    };

    // 컴포넌트 마운트 시 초기화
    useEffect(() => {
        if (!rowData || rowData.length === 0) {
            const mockData = generateMockData();
            initGrid(GRID_ID, { rowData: mockData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 행 클릭 이벤트 핸들러
    const handleRowClicked = useCallback(
        (params: RowClickedEvent<UserData>) => {
            if (!params.data) return;
            pushEventLog(GRID_ID, {
                type: 'onRowClicked',
                message: `행이 클릭되었습니다: ${params.data.name} (ID: ${params.data.id})`,
                payload: { rowData: params.data, rowIndex: params.rowIndex },
            });
            console.log('Row clicked:', params.data);
        },
        [pushEventLog]
    );

    // 셀 값 변경 이벤트 핸들러
    const handleCellValueChanged = useCallback(
        (params: CellValueChangedEvent<UserData>) => {
            const { data, oldValue, newValue, colDef } = params;
            if (!data || !colDef.field) return;
            pushEventLog(GRID_ID, {
                type: 'onCellValueChanged',
                message: `셀 값이 변경되었습니다: ${colDef.headerName} (${oldValue} → ${newValue})`,
                payload: { rowId: data.id, field: colDef.field, oldValue, newValue, rowData: data },
            });
            console.log('Cell value changed:', { rowId: data.id, field: colDef.field, oldValue, newValue });
        },
        [pushEventLog]
    );

    // 셀 편집 종료 이벤트 핸들러
    const handleCellEditingStopped = useCallback(
        (params: CellEditingStoppedEvent<UserData>) => {
            const { data, colDef, newValue, oldValue } = params;
            if (!data || !colDef.field) return;
            pushEventLog(GRID_ID, {
                type: 'onCellEditingStopped',
                message: `셀 편집이 종료되었습니다: ${colDef.headerName}`,
                payload: { rowId: data.id, field: colDef.field, oldValue, newValue },
            });
            console.log('Cell editing stopped:', { rowId: data.id, field: colDef.field });
        },
        [pushEventLog]
    );

    // 셀 포커스 이벤트 핸들러
    const handleCellFocused = useCallback(
        (params: CellFocusedEvent<UserData>) => {
            // params.column이 Column 객체인지 확인하고 안전하게 접근
            if (params.column && typeof params.column !== 'string') {
                const column = params.column as { colDef?: { headerName?: string }; colId?: string };
                const headerName = column.colDef?.headerName || column.colId || '알 수 없음';
                const colId = column.colId || '알 수 없음';
                pushEventLog(GRID_ID, {
                    type: 'onCellFocused',
                    message: `셀에 포커스가 설정되었습니다: ${headerName}`,
                    payload: { rowIndex: params.rowIndex, colId },
                });
            }
        },
        [pushEventLog]
    );

    // 행 선택 변경 이벤트 핸들러
    const handleSelectionChanged = useCallback(
        (params: SelectionChangedEvent<UserData>) => {
            const selectedRows = params.api.getSelectedRows();
            setSelectedRows(GRID_ID, selectedRows);
            pushEventLog(GRID_ID, {
                type: 'onSelectionChanged',
                message: `선택이 변경되었습니다: ${selectedRows.length}개 행 선택됨`,
                payload: { selectedCount: selectedRows.length, selectedRows },
            });
            console.log('Selection changed:', selectedRows);
        },
        [setSelectedRows, pushEventLog]
    );

    // 컬럼 정의
    const columnDefs = useMemo<ColDef[]>(
        () => [
            {
                checkboxSelection: true, // 체크박스 컬럼 추가
                headerCheckboxSelection: true, // 헤더에 전체 선택 체크박스
                width: 50,
                pinned: 'left', // 왼쪽에 고정
                sortable: false,
                filter: false,
            },
            {
                field: 'id',
                headerName: 'ID',
                width: 80,
                sortable: true,
                editable: false,
            },
            {
                field: 'name',
                headerName: '이름',
                width: 150,
                sortable: true,
                editable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'age',
                headerName: '나이',
                width: 100,
                sortable: true,
                editable: true,
                filter: 'agNumberColumnFilter',
            },
            {
                field: 'email',
                headerName: '이메일',
                width: 200,
                sortable: true,
                editable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'status',
                headerName: '상태',
                width: 120,
                sortable: true,
                editable: true,
                filter: 'agTextColumnFilter',
            },
        ],
        []
    );

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            sortable: true,
            filter: true,
        }),
        []
    );

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 헤더 */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">이벤트 샘플</h1>
                            <p className="text-slate-600">
                                ag-Grid의 다양한 이벤트를 확인할 수 있는 예제입니다. 그리드와 상호작용하면 이벤트 로그가 기록됩니다.
                            </p>
                        </div>
                        <button
                            onClick={() => clearEventLogs(GRID_ID)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md"
                        >
                            <Trash2 className="w-4 h-4" />
                            로그 초기화
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 그리드 영역 */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
                                {columnDefs && columnDefs.length > 0 ? (
                                    <AgGridReact
                                        theme="legacy"
                                        ref={gridRef}
                                        rowData={rowData}
                                        columnDefs={columnDefs}
                                        defaultColDef={defaultColDef}
                                        pagination={true}
                                        paginationPageSize={10}
                                        animateRows={true}
                                        rowSelection="multiple"
                                        suppressRowClickSelection={true}
                                        // 이벤트 핸들러들
                                        onRowClicked={handleRowClicked}
                                        onCellValueChanged={handleCellValueChanged}
                                        onCellEditingStopped={handleCellEditingStopped}
                                        onCellFocused={handleCellFocused}
                                        onSelectionChanged={handleSelectionChanged}
                                        stopEditingWhenCellsLoseFocus={true}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-slate-500">
                                        그리드를 초기화하는 중...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 이벤트 로그 영역 */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 h-[600px] flex flex-col">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4">이벤트 로그</h2>
                            <div className="flex-1 overflow-y-auto space-y-2">
                                {eventLogs.length === 0 ? (
                                    <p className="text-slate-400 text-sm text-center py-8">이벤트가 발생하지 않았습니다.</p>
                                ) : (
                                    eventLogs.map((log) => (
                                        <div
                                            key={log.id}
                                            className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm"
                                        >
                                            <div className="flex items-start justify-between mb-1">
                                                <span className="font-semibold text-primary">{log.type}</span>
                                                <span className="text-xs text-slate-500">{log.timestamp}</span>
                                            </div>
                                            <p className="text-slate-700">{log.message}</p>
                                            {log.payload && (
                                                <details className="mt-2">
                                                    <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700">
                                                        상세 정보
                                                    </summary>
                                                    <pre className="mt-1 text-xs bg-slate-100 p-2 rounded overflow-x-auto">
                                                        {JSON.stringify(log.payload, null, 2)}
                                                    </pre>
                                                </details>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 기능 설명 */}
                <div className="mt-6 bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2">사용된 주요 이벤트</h3>
                    <ul className="list-disc list-inside text-sm text-purple-800 space-y-1">
                        <li>
                            <strong>onRowClicked</strong>: 행을 클릭할 때 발생 (체크박스 클릭 제외)
                        </li>
                        <li>
                            <strong>onCellValueChanged</strong>: 셀 값을 변경하고 편집을 종료할 때 발생
                        </li>
                        <li>
                            <strong>onCellEditingStopped</strong>: 셀 편집이 종료될 때 발생
                        </li>
                        <li>
                            <strong>onCellFocused</strong>: 셀에 포커스가 설정될 때 발생
                        </li>
                        <li>
                            <strong>onSelectionChanged</strong>: 행 선택이 변경될 때 발생 (체크박스 클릭 시)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

