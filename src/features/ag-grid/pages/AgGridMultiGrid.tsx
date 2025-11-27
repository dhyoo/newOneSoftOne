import { useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
import { useAgGridStore } from '../../../store/agGridStore';
import { Trash2 } from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * 그리드 ID 상수
 */
const GRID_ID_LEFT = 'multiGridLeft';
const GRID_ID_RIGHT = 'multiGridRight';

/**
 * 사용자 데이터 타입
 */
interface UserData {
    id: number;
    name: string;
    email: string;
    department: string;
    role: string;
}

/**
 * 멀티 그리드 샘플 페이지
 * 한 페이지에 두 개의 그리드를 배치하고, 그리드 간 데이터를 공유하는 예제
 */
// 빈 배열 상수 - selector에서 매번 새로운 배열을 생성하지 않도록
const EMPTY_USER_ARRAY: UserData[] = [];

export default function AgGridMultiGrid() {
    // 좌측 그리드 상태 - selector를 분리하여 무한 루프 방지
    const leftRowData = useAgGridStore((state) => (state.grids[GRID_ID_LEFT]?.rowData ?? EMPTY_USER_ARRAY) as UserData[]);
    const leftSelectedRows = useAgGridStore((state) => (state.grids[GRID_ID_LEFT]?.selectedRows ?? EMPTY_USER_ARRAY) as UserData[]);
    const setRowData = useAgGridStore((state) => state.setRowData);
    const setSelectedRows = useAgGridStore((state) => state.setSelectedRows);
    const initGrid = useAgGridStore((state) => state.initGrid);

    // 우측 그리드 상태 (선택된 사용자만 표시)
    const rightRowData = useAgGridStore((state) => (state.grids[GRID_ID_RIGHT]?.rowData ?? EMPTY_USER_ARRAY) as UserData[]);

    // 초기 목업 데이터 생성
    const generateMockData = (): UserData[] => {
        const departments = ['개발팀', '디자인팀', '기획팀', '마케팅팀', '영업팀', '인사팀'];
        const roles = ['팀장', '선임', '주임', '사원', '인턴'];
        const names = ['김철수', '이영희', '박민수', '정수진', '최동현', '강미영', '윤성호', '임지은', '한소희', '조민준'];
        const data: UserData[] = [];

        for (let i = 1; i <= 20; i++) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            data.push({
                id: i,
                name: `${randomName}${i}`,
                email: `user${i}@example.com`,
                department: departments[Math.floor(Math.random() * departments.length)],
                role: roles[Math.floor(Math.random() * roles.length)],
            });
        }
        return data;
    };

    // 컴포넌트 마운트 시 초기화
    useEffect(() => {
        if (!leftRowData || leftRowData.length === 0) {
            const mockData = generateMockData();
            initGrid(GRID_ID_LEFT, { rowData: mockData, selectedRows: [] });
            initGrid(GRID_ID_RIGHT, { rowData: [] });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 좌측 그리드 선택 변경 이벤트 핸들러
    // 선택된 행들을 우측 그리드에 표시
    const handleLeftSelectionChanged = useCallback(
        (params: SelectionChangedEvent<UserData>) => {
            const selectedRows = params.api.getSelectedRows() as UserData[];
            // 선택된 행이 있는지 확인
            if (selectedRows && selectedRows.length > 0) {
                // 선택된 행들을 Zustand store에 저장
                setSelectedRows(GRID_ID_LEFT, selectedRows);
                // 선택된 행들을 우측 그리드에 표시
                setRowData(GRID_ID_RIGHT, [...selectedRows]); // 새 배열로 복사하여 참조 문제 방지
                console.log('Left grid selection changed:', selectedRows);
            } else {
                // 선택 해제된 경우 우측 그리드 비우기
                setSelectedRows(GRID_ID_LEFT, []);
                setRowData(GRID_ID_RIGHT, []);
                console.log('Left grid selection cleared');
            }
        },
        [setSelectedRows, setRowData]
    );

    // 우측 그리드에서 행 삭제 핸들러
    const handleRightRowDelete = useCallback(
        (rowId: number) => {
            const { removeRow: removeRowFromStore } = useAgGridStore.getState();
            // 우측 그리드에서 삭제
            removeRowFromStore(GRID_ID_RIGHT, rowId);

            // 좌측 그리드에서도 선택 해제
            const updatedRightData = rightRowData.filter((row: UserData) => row.id !== rowId);
            setRowData(GRID_ID_RIGHT, updatedRightData);

            // 좌측 그리드의 선택 상태도 업데이트
            const updatedLeftSelection = leftSelectedRows.filter((row: UserData) => row.id !== rowId);
            setSelectedRows(GRID_ID_LEFT, updatedLeftSelection);

            console.log('Row deleted from right grid:', rowId);
        },
        [rightRowData, leftSelectedRows, setRowData, setSelectedRows]
    );

    // 좌측 그리드 컬럼 정의
    const leftColumnDefs = useMemo<ColDef[]>(
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
            },
            {
                field: 'name',
                headerName: '이름',
                width: 150,
                sortable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'email',
                headerName: '이메일',
                width: 200,
                sortable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'department',
                headerName: '부서',
                width: 120,
                sortable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'role',
                headerName: '직급',
                width: 100,
                sortable: true,
                filter: 'agTextColumnFilter',
            },
        ],
        []
    );

    // 우측 그리드 컬럼 정의 (삭제 버튼 포함)
    const rightColumnDefs = useMemo<ColDef[]>(
        () => [
            {
                field: 'id',
                headerName: 'ID',
                width: 80,
                sortable: true,
            },
            {
                field: 'name',
                headerName: '이름',
                width: 150,
                sortable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'email',
                headerName: '이메일',
                width: 200,
                sortable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'department',
                headerName: '부서',
                width: 120,
                sortable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'role',
                headerName: '직급',
                width: 100,
                sortable: true,
                filter: 'agTextColumnFilter',
            },
            {
                headerName: '액션',
                width: 100,
                cellRenderer: (params: ICellRendererParams<UserData>) => {
                    if (!params.data) return null;
                    const rowId = params.data.id;
                    return (
                        <button
                            onClick={() => handleRightRowDelete(rowId)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="제거"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    );
                },
                sortable: false,
                filter: false,
                pinned: 'right',
            },
        ],
        [handleRightRowDelete]
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
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">멀티 그리드</h1>
                    <p className="text-slate-600">
                        한 페이지에 두 개의 그리드를 배치하고, 좌측 그리드에서 선택한 행을 우측 그리드에 표시하는 예제입니다.
                    </p>
                </div>

                {/* 그리드 컨테이너 (좌우 배치) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 좌측 그리드: 전체 사용자 목록 */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">사용자 목록</h2>
                        <p className="text-sm text-slate-600 mb-4">
                            행을 선택하면 우측 그리드에 표시됩니다. (체크박스로 다중 선택 가능)
                        </p>
                        <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
                            {leftColumnDefs && leftColumnDefs.length > 0 ? (
                                <AgGridReact
                                    theme="legacy"
                                    rowData={leftRowData}
                                    columnDefs={leftColumnDefs}
                                    defaultColDef={defaultColDef}
                                    pagination={true}
                                    paginationPageSize={10}
                                    animateRows={true}
                                    rowSelection="multiple"
                                    suppressRowClickSelection={true}
                                    onSelectionChanged={handleLeftSelectionChanged}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-500">
                                    그리드를 초기화하는 중...
                                </div>
                            )}
                        </div>
                        <div className="mt-4 text-sm text-slate-600">
                            선택된 행: <strong>{leftSelectedRows.length}</strong>개
                        </div>
                    </div>

                    {/* 우측 그리드: 선택된 사용자만 표시 */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">선택된 사용자</h2>
                        <p className="text-sm text-slate-600 mb-4">
                            좌측 그리드에서 선택한 사용자들이 여기에 표시됩니다. 삭제 버튼으로 제거할 수 있습니다.
                        </p>
                        <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
                            {rightColumnDefs && rightColumnDefs.length > 0 ? (
                                <AgGridReact
                                    theme="legacy"
                                    rowData={rightRowData}
                                    columnDefs={rightColumnDefs}
                                    defaultColDef={defaultColDef}
                                    pagination={true}
                                    paginationPageSize={10}
                                    animateRows={true}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-500">
                                    그리드를 초기화하는 중...
                                </div>
                            )}
                        </div>
                        <div className="mt-4 text-sm text-slate-600">
                            표시된 행: <strong>{rightRowData.length}</strong>개
                        </div>
                    </div>
                </div>

                {/* 기능 설명 */}
                <div className="mt-6 bg-pink-50 rounded-lg p-4 border border-pink-200">
                    <h3 className="font-semibold text-pink-900 mb-2">사용된 주요 기능</h3>
                    <ul className="list-disc list-inside text-sm text-pink-800 space-y-1">
                        <li>
                            <strong>멀티 그리드</strong>: 한 페이지에 여러 개의 독립적인 그리드 배치
                        </li>
                        <li>
                            <strong>그리드 간 데이터 공유</strong>: 좌측 그리드의 선택 상태를 우측 그리드에 반영
                        </li>
                        <li>
                            <strong>Zustand store 활용</strong>: 각 그리드의 상태를 독립적으로 관리하면서도 데이터 공유
                        </li>
                        <li>
                            <strong>동적 데이터 업데이트</strong>: 선택 변경 시 우측 그리드가 자동으로 업데이트
                        </li>
                        <li>
                            <strong>우측 그리드에서 제거</strong>: 삭제 버튼으로 선택 목록에서 제거 가능
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

