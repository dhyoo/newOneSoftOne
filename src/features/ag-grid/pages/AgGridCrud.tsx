import React, { useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, ICellRendererParams, CellValueChangedEvent } from 'ag-grid-community';
import { useAgGridStore } from '../../../store/agGridStore';
import { Plus, Edit, Trash2 } from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * 그리드 ID 상수
 */
const GRID_ID = 'crud';

/**
 * 사용자 데이터 타입
 */
interface UserData {
    id: number;
    name: string;
    email: string;
    department: string;
    salary: number;
}

/**
 * 액션 버튼 렌더러 컴포넌트
 * 각 행에 편집/삭제 버튼을 표시
 * ag-Grid cellRenderer로 사용되므로 store는 외부에서 주입받음
 */
function ActionCellRenderer(params: ICellRendererParams<UserData> & { 
    updateRow?: (gridId: string, rowId: number, partial: Partial<UserData>) => void;
    removeRow?: (gridId: string, rowId: number) => void;
    pushEventLog?: (gridId: string, log: { type: string; message: string; payload?: unknown }) => void;
}): React.JSX.Element | string {
    // 편집 버튼 클릭 핸들러
    const handleEdit = () => {
        if (!params.data || !params.updateRow || !params.pushEventLog) return;
        const newName = prompt('이름을 수정하세요:', params.data.name);
        if (newName && newName !== params.data.name) {
            params.updateRow(GRID_ID, params.data.id, { name: newName });
            params.pushEventLog(GRID_ID, {
                type: 'onRowUpdated',
                message: `행 ID ${params.data.id}의 이름이 "${params.data.name}"에서 "${newName}"으로 변경되었습니다.`,
                payload: { rowId: params.data.id, field: 'name', oldValue: params.data.name, newValue: newName },
            });
            console.log('Row updated:', { id: params.data.id, name: newName });
        }
    };

    // 삭제 버튼 클릭 핸들러
    const handleDelete = () => {
        if (!params.data || !params.removeRow || !params.pushEventLog) return;
        if (window.confirm(`정말로 "${params.data.name}"을(를) 삭제하시겠습니까?`)) {
            const deletedRow = params.data;
            params.removeRow(GRID_ID, params.data.id);
            params.pushEventLog(GRID_ID, {
                type: 'onRowDeleted',
                message: `행 ID ${deletedRow.id} (${deletedRow.name})이(가) 삭제되었습니다.`,
                payload: { deletedRow },
            });
            console.log('Row deleted:', deletedRow);
        }
    };

    if (!params.data) return <div />;

    return (
        <div className="flex items-center gap-2 h-full">
            <button
                onClick={handleEdit}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="편집"
            >
                <Edit className="w-4 h-4" />
            </button>
            <button
                onClick={handleDelete}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="삭제"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}

/**
 * CRUD 샘플 페이지
 * 행 추가, 수정, 삭제 기능을 구현한 예제
 */
// 빈 배열 상수 - selector에서 매번 새로운 배열을 생성하지 않도록
const EMPTY_USER_ARRAY: UserData[] = [];

export default function AgGridCrud() {
    // selector를 분리하여 무한 루프 방지
    const rowData = useAgGridStore((state) => (state.grids[GRID_ID]?.rowData ?? EMPTY_USER_ARRAY) as UserData[]);
    const addRow = useAgGridStore((state) => state.addRow);
    const initGrid = useAgGridStore((state) => state.initGrid);
    const pushEventLog = useAgGridStore((state) => state.pushEventLog);
    const updateRow = useAgGridStore((state) => state.updateRow);
    const removeRow = useAgGridStore((state) => state.removeRow);

    // 초기 목업 데이터 생성
    const generateMockData = (): UserData[] => {
        const departments = ['개발팀', '디자인팀', '기획팀', '마케팅팀', '영업팀'];
        const names = ['김철수', '이영희', '박민수', '정수진', '최동현'];
        const data: UserData[] = [];

        for (let i = 1; i <= 10; i++) {
            const randomDept = departments[Math.floor(Math.random() * departments.length)];
            const randomName = names[Math.floor(Math.random() * names.length)];
            data.push({
                id: i,
                name: `${randomName}${i}`,
                email: `user${i}@example.com`,
                department: randomDept,
                salary: Math.floor(Math.random() * 5000) + 3000, // 3000-8000
            });
        }
        return data;
    };

    // 컴포넌트 마운트 시 초기화 (한 번만 실행)
    useEffect(() => {
        // store에서 직접 상태 확인하여 중복 초기화 방지
        const currentState = useAgGridStore.getState();
        const currentRowData = currentState.grids[GRID_ID]?.rowData;
        
        // 데이터가 없을 때만 초기화
        if (!currentRowData || currentRowData.length === 0) {
            const mockData = generateMockData();
            initGrid(GRID_ID, { rowData: mockData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 새 행 추가 핸들러
    const handleAddRow = useCallback(() => {
        // Zustand store에서 최신 rowData 가져오기
        const currentState = useAgGridStore.getState();
        const currentRowData = (currentState.grids[GRID_ID]?.rowData ?? []) as UserData[];
        const maxId = currentRowData.length > 0 ? Math.max(...currentRowData.map((r: UserData) => r.id), 0) : 0;
        const newId = maxId + 1;
        const departments = ['개발팀', '디자인팀', '기획팀', '마케팅팀', '영업팀'];
        const newRow: UserData = {
            id: newId,
            name: `새 사용자${newId}`,
            email: `newuser${newId}@example.com`,
            department: departments[Math.floor(Math.random() * departments.length)],
            salary: Math.floor(Math.random() * 5000) + 3000,
        };

        addRow(GRID_ID, newRow);
        pushEventLog(GRID_ID, {
            type: 'onRowAdded',
            message: `새 행이 추가되었습니다: ${newRow.name}`,
            payload: { newRow },
        });
        console.log('Row added:', newRow);
    }, [addRow, pushEventLog]);

    // 셀 값 변경 핸들러
    const handleCellValueChanged = useCallback(
        (params: CellValueChangedEvent<UserData>) => {
            const { data, oldValue, newValue, colDef } = params;
            if (!data || !colDef.field) return;
            updateRow(GRID_ID, data.id, { [colDef.field]: newValue });
            pushEventLog(GRID_ID, {
                type: 'onCellValueChanged',
                message: `셀 값이 변경되었습니다: ${colDef.headerName} (${oldValue} → ${newValue})`,
                payload: { rowId: data.id, field: colDef.field, oldValue, newValue },
            });
            console.log('Cell value changed:', { rowId: data.id, field: colDef.field, oldValue, newValue });
        },
        [updateRow, pushEventLog]
    );

    // 컬럼 정의
    const columnDefs = useMemo<ColDef[]>(
        () => [
            {
                field: 'id',
                headerName: 'ID',
                width: 80,
                sortable: true,
                editable: false, // ID는 편집 불가
            },
            {
                field: 'name',
                headerName: '이름',
                width: 150,
                sortable: true,
                editable: true, // 인라인 편집 가능
                filter: 'agTextColumnFilter',
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
                field: 'department',
                headerName: '부서',
                width: 120,
                sortable: true,
                editable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'salary',
                headerName: '급여',
                width: 120,
                sortable: true,
                editable: true,
                filter: 'agNumberColumnFilter',
                cellRenderer: (params: ICellRendererParams<UserData>) => {
                    return `${params.value?.toLocaleString() ?? 0}원`;
                },
                valueParser: (params: { newValue: string }) => {
                    // 편집 시 숫자만 추출
                    return parseInt(params.newValue.replace(/[^0-9]/g, '')) || 0;
                },
            },
            {
                headerName: '액션',
                width: 120,
                cellRenderer: ActionCellRenderer,
                cellRendererParams: {
                    updateRow,
                    removeRow,
                    pushEventLog,
                },
                sortable: false,
                filter: false,
                pinned: 'right', // 오른쪽에 고정
            },
        ],
        [updateRow, removeRow, pushEventLog]
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
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">CRUD 샘플</h1>
                    <p className="text-slate-600">
                        행 추가, 수정, 삭제 기능을 구현한 예제입니다. 셀을 더블클릭하여 인라인 편집이 가능합니다.
                    </p>
                </div>

                {/* 액션 버튼 */}
                <div className="mb-4 flex justify-end">
                    <button
                        onClick={handleAddRow}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        추가
                    </button>
                </div>

                {/* 그리드 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
                        {columnDefs && columnDefs.length > 0 ? (
                            <AgGridReact
                                theme="legacy"
                                rowData={rowData}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                getRowId={(params) => String(params.data.id)} // 각 행의 고유 ID 지정
                                pagination={true}
                                paginationPageSize={10}
                                animateRows={true}
                                suppressRowClickSelection={true} // 행 클릭 시 선택 방지
                                onCellValueChanged={handleCellValueChanged} // 셀 값 변경 이벤트
                                stopEditingWhenCellsLoseFocus={true} // 포커스를 잃으면 편집 종료
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-500">
                                그리드를 초기화하는 중...
                            </div>
                        )}
                    </div>
                </div>

                {/* 기능 설명 */}
                <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2">사용된 주요 기능</h3>
                    <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
                        <li>행 추가: 상단 "추가" 버튼을 클릭하여 새 행 추가</li>
                        <li>인라인 편집: 셀을 더블클릭하여 직접 수정 (이름, 이메일, 부서, 급여)</li>
                        <li>행 편집: 액션 컬럼의 편집 버튼으로 이름 수정 (프롬프트 방식)</li>
                        <li>행 삭제: 액션 컬럼의 삭제 버튼으로 행 삭제</li>
                        <li>상태 관리: 모든 변경사항이 Zustand store에 저장되고 콘솔에 로그 출력</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

