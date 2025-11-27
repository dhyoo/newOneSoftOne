import { useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { useAgGridStore } from '../../../store/agGridStore';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * 그리드 ID 상수
 * Zustand store에서 이 ID로 상태를 관리
 */
const GRID_ID = 'basic';

/**
 * 목업 데이터 타입 정의
 */
interface UserData {
    id: number;
    name: string;
    age: number;
    country: string;
    createdAt: string;
}

/**
 * 기본 예제 페이지
 * ag-Grid의 기본 기능(정렬, 필터, 페이징)을 보여주는 샘플
 */
// 빈 배열 상수 - selector에서 매번 새로운 배열을 생성하지 않도록
const EMPTY_ARRAY: UserData[] = [];

export default function AgGridBasic() {
    // Zustand store에서 상태와 액션 가져오기
    // selector를 분리하여 무한 루프 방지
    // ?? [] 대신 상수를 사용하여 매번 새로운 배열이 생성되지 않도록 함
    const rowData = useAgGridStore((state) => (state.grids[GRID_ID]?.rowData ?? EMPTY_ARRAY) as UserData[]);
    const initGrid = useAgGridStore((state) => state.initGrid);

    // 목업 데이터 생성 함수
    const generateMockData = (): UserData[] => {
        const countries = ['한국', '미국', '일본', '중국', '영국', '독일', '프랑스', '캐나다'];
        const names = ['김철수', '이영희', '박민수', '정수진', '최동현', '강미영', '윤성호', '임지은'];
        const data: UserData[] = [];

        for (let i = 1; i <= 25; i++) {
            const randomCountry = countries[Math.floor(Math.random() * countries.length)];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomAge = Math.floor(Math.random() * 40) + 20; // 20-60세
            const createdAt = new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
                .toLocaleDateString('ko-KR');

            data.push({
                id: i,
                name: `${randomName}${i}`,
                age: randomAge,
                country: randomCountry,
                createdAt,
            });
        }

        return data;
    };

    // 컴포넌트 마운트 시 초기 데이터 설정
    useEffect(() => {
        try {
            // 그리드가 초기화되지 않았다면 초기화
            if (!rowData || rowData.length === 0) {
                const mockData = generateMockData();
                initGrid(GRID_ID, { rowData: mockData });
            }
        } catch (error) {
            console.error('Error initializing grid:', error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 컬럼 정의
    // useMemo로 최적화하여 불필요한 재생성 방지
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
                sortable: true, // 정렬 가능
                filter: 'agNumberColumnFilter', // 숫자 필터
            },
            {
                field: 'name',
                headerName: '이름',
                width: 150,
                sortable: true,
                filter: 'agTextColumnFilter', // 텍스트 필터
            },
            {
                field: 'age',
                headerName: '나이',
                width: 100,
                sortable: true,
                filter: 'agNumberColumnFilter',
                cellRenderer: (params: ICellRendererParams<UserData>) => {
                    return `${params.value}세`;
                },
            },
            {
                field: 'country',
                headerName: '국가',
                width: 120,
                sortable: true,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'createdAt',
                headerName: '생성일',
                width: 150,
                sortable: true,
                filter: 'agDateColumnFilter', // 날짜 필터
            },
        ],
        []
    );

    // 기본 그리드 옵션
    const defaultColDef = useMemo(
        () => ({
            resizable: true, // 컬럼 크기 조절 가능
            sortable: true, // 기본 정렬 활성화
            filter: true, // 기본 필터 활성화
        }),
        []
    );

    // rowData가 없거나 빈 배열인 경우를 처리
    const displayRowData = (rowData as UserData[]) || [];

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 헤더 */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">기본 예제</h1>
                    <p className="text-slate-600">
                        ag-Grid의 기본 기능을 확인할 수 있는 예제입니다. 컬럼 헤더를 클릭하여 정렬하고, 필터 아이콘을 클릭하여 필터링할 수 있습니다.
                    </p>
                </div>

                {/* 그리드 컨테이너 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
                        {columnDefs && columnDefs.length > 0 ? (
                            <AgGridReact
                                theme="legacy"
                                rowData={displayRowData}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                                pagination={true} // 페이징 활성화
                                paginationPageSize={10} // 페이지당 10개 행
                                paginationPageSizeSelector={[10, 20, 50]} // 페이지 크기 선택 옵션
                                animateRows={true} // 행 애니메이션
                                rowSelection="multiple" // 다중 선택 가능
                                suppressRowClickSelection={true} // 행 클릭 시 선택 안 함 (체크박스로만 선택)
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-500">
                                그리드를 초기화하는 중...
                            </div>
                        )}
                    </div>
                </div>

                {/* 기능 설명 */}
                <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">사용된 주요 기능</h3>
                    <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                        <li>정렬 (Sort): 컬럼 헤더 클릭으로 오름차순/내림차순 정렬</li>
                        <li>필터 (Filter): 컬럼 헤더의 필터 아이콘 클릭하여 필터링</li>
                        <li>페이징 (Pagination): 하단에서 페이지 이동 및 페이지 크기 조절</li>
                        <li>컬럼 크기 조절: 컬럼 경계를 드래그하여 크기 조절</li>
                        <li>행 선택: 체크박스를 통해 다중 선택 가능</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

