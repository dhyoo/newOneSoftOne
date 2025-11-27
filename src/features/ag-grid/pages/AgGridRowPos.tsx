import { useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, RowDragEndEvent, ICellRendererParams } from 'ag-grid-community';
import { useAgGridStore } from '../../../store/agGridStore';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * 그리드 ID 상수
 */
const GRID_ID = 'rowPos';

/**
 * 작업 항목 데이터 타입
 */
interface TaskData {
    id: number;
    task: string;
    priority: string;
    status: string;
    order: number; // 순서를 나타내는 필드
}

/**
 * Row Position / Drag & Drop 샘플 페이지
 * 행 순서를 드래그 앤 드롭으로 변경하는 예제
 */
// 빈 배열 상수 - selector에서 매번 새로운 배열을 생성하지 않도록
const EMPTY_TASK_ARRAY: TaskData[] = [];

export default function AgGridRowPos() {
    // selector를 분리하여 무한 루프 방지
    const rowData = useAgGridStore((state) => (state.grids[GRID_ID]?.rowData ?? EMPTY_TASK_ARRAY) as TaskData[]);
    const setRowData = useAgGridStore((state) => state.setRowData);
    const initGrid = useAgGridStore((state) => state.initGrid);
    const pushEventLog = useAgGridStore((state) => state.pushEventLog);

    // 초기 목업 데이터 생성
    const generateMockData = (): TaskData[] => {
        const tasks = [
            '프로젝트 기획서 작성',
            '디자인 시안 제작',
            '개발 환경 설정',
            'API 연동 작업',
            'UI 컴포넌트 개발',
            '테스트 케이스 작성',
            '버그 수정',
            '성능 최적화',
            '문서화 작업',
            '배포 준비',
        ];
        const priorities = ['높음', '보통', '낮음'];
        const statuses = ['대기', '진행중', '완료'];

        return tasks.map((task, index) => ({
            id: index + 1,
            task,
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            order: index + 1, // 초기 순서
        }));
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

    // 행 드래그 종료 이벤트 핸들러
    const handleRowDragEnd = useCallback(
        (params: RowDragEndEvent<TaskData>) => {
            const movedNode = params.node;
            const overNode = params.overNode;

            if (!movedNode || !overNode || movedNode === overNode) {
                return;
            }

            // ag-Grid API에서 최신 rowData 가져오기
            const allRowData: TaskData[] = [];
            params.api.forEachNode((node) => {
                if (node.data) {
                    allRowData.push(node.data as TaskData);
                }
            });

            // 드래그된 노드와 대상 노드의 인덱스 찾기
            const fromIndex = allRowData.findIndex((row: TaskData) => row.id === movedNode.data?.id);
            const toIndex = allRowData.findIndex((row: TaskData) => row.id === overNode.data?.id);

            if (fromIndex === -1 || toIndex === -1) {
                return;
            }

            // 배열 복사
            const newRowData = [...allRowData];
            
            // 배열에서 요소 제거 및 삽입
            const [movedItem] = newRowData.splice(fromIndex, 1);
            newRowData.splice(toIndex, 0, movedItem);

            // order 필드 업데이트
            const updatedRowData = newRowData.map((row: TaskData, index: number) => ({
                ...row,
                order: index + 1,
            }));

            // store에 새로운 순서 반영
            setRowData(GRID_ID, updatedRowData);

            // 이벤트 로그 기록
            pushEventLog(GRID_ID, {
                type: 'onRowDragEnd',
                message: `행 순서가 변경되었습니다: "${movedItem.task}"이(가) ${fromIndex + 1}번째에서 ${toIndex + 1}번째로 이동`,
                payload: {
                    movedTask: movedItem.task,
                    fromIndex: fromIndex + 1,
                    toIndex: toIndex + 1,
                    newOrder: updatedRowData.map((r: TaskData) => ({ id: r.id, task: r.task, order: r.order })),
                },
            });

            console.log('Row drag ended:', {
                movedTask: movedItem.task,
                fromIndex: fromIndex + 1,
                toIndex: toIndex + 1,
                newOrder: updatedRowData,
            });
        },
        [setRowData, pushEventLog]
    );

    // 컬럼 정의
    const columnDefs = useMemo<ColDef[]>(
        () => [
            {
                field: 'order',
                headerName: '순서',
                width: 100,
                sortable: false,
                editable: false,
                rowDrag: true, // 이 컬럼에서만 드래그 가능
                cellRenderer: (params: ICellRendererParams<TaskData>) => {
                    // 순서 번호만 표시 (드래그 핸들 아이콘 제거)
                    return (
                        <div className="flex items-center" style={{ cursor: 'move', height: '100%', alignItems: 'center' }}>
                            <span className="font-semibold">{params.value}</span>
                        </div>
                    );
                },
                pinned: 'left',
                suppressMovable: true,
            },
            {
                field: 'task',
                headerName: '작업',
                width: 250,
                sortable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'priority',
                headerName: '우선순위',
                width: 120,
                sortable: true,
                filter: 'agTextColumnFilter',
                cellRenderer: (params: { value: string }) => {
                    const colorMap: Record<string, string> = {
                        대기: 'bg-slate-100 text-slate-700',
                        진행중: 'bg-blue-100 text-blue-700',
                        완료: 'bg-green-100 text-green-700',
                    };
                    return (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[params.value] || ''}`}>
                            {params.value}
                        </span>
                    );
                },
            },
            {
                field: 'status',
                headerName: '상태',
                width: 120,
                sortable: true,
                filter: 'agTextColumnFilter',
                cellRenderer: (params: ICellRendererParams<TaskData>) => {
                    const colorMap: Record<string, string> = {
                        대기: 'bg-slate-100 text-slate-700',
                        진행중: 'bg-blue-100 text-blue-700',
                        완료: 'bg-green-100 text-green-700',
                    };
                    return (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[params.value as string] || ''}`}>
                            {params.value}
                        </span>
                    );
                },
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

    // 현재 순서를 텍스트로 표시
    const currentOrderText = rowData.map((row: TaskData) => row.task).join(' → ');

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 헤더 */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Row Position / Drag & Drop</h1>
                    <p className="text-slate-600">
                        행을 드래그하여 순서를 변경할 수 있는 예제입니다. 순서 변경 시 Zustand store에 자동으로 반영됩니다.
                    </p>
                </div>

                {/* 현재 순서 표시 */}
                <div className="mb-4 bg-white rounded-lg shadow-md p-4 border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">현재 순서</h3>
                    <p className="text-slate-600 text-sm break-words">
                        {currentOrderText || '순서가 없습니다.'}
                    </p>
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
                                rowDragManaged={false} // 컬럼의 rowDrag를 사용하므로 false
                                onRowDragEnd={handleRowDragEnd} // 드래그 종료 이벤트
                                rowDragText={(params) => {
                                    const data = params.rowNode?.data as TaskData | undefined;
                                    return data ? data.task : '';
                                }} // 드래그 중 표시될 텍스트
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-500">
                                그리드를 초기화하는 중...
                            </div>
                        )}
                    </div>
                </div>

                {/* 사용 방법 안내 */}
                <div className="mt-6 bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <h3 className="font-semibold text-orange-900 mb-2">사용 방법</h3>
                    <ol className="list-decimal list-inside text-sm text-orange-800 space-y-1">
                        <li>순서 컬럼(⋮⋮)을 클릭하고 드래그하여 행을 이동시킬 수 있습니다.</li>
                        <li>드래그한 행을 다른 행 위에 드롭하면 순서가 변경됩니다.</li>
                        <li>순서 변경 시 "순서" 컬럼의 숫자가 자동으로 업데이트됩니다.</li>
                        <li>변경된 순서는 Zustand store에 저장되고 콘솔에 로그가 출력됩니다.</li>
                    </ol>
                </div>

                {/* 기능 설명 */}
                <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">사용된 주요 기능</h3>
                    <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                        <li>
                            <strong>rowDragManaged</strong>: 행 드래그 기능 활성화
                        </li>
                        <li>
                            <strong>onRowDragEnd</strong>: 드래그 종료 시 호출되는 이벤트 핸들러
                        </li>
                        <li>
                            <strong>rowDragText</strong>: 드래그 중 표시될 커스텀 텍스트
                        </li>
                        <li>
                            <strong>순서 관리</strong>: 드래그 후 새로운 순서를 계산하여 store에 반영
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

