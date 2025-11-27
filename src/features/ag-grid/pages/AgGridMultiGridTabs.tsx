import { useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
import { useMultiGridTabsStore, type TabId } from '../../../store/agGridMultiTabsStore';
import { ArrowRight, Trash2 } from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * 사용자 데이터 타입
 */
interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
}

/**
 * 상품 데이터 타입
 */
interface ProductData {
    id: number;
    name: string;
    price: number;
    category: string;
}

/**
 * 주문 데이터 타입
 */
interface OrderData {
    id: number;
    userName: string;
    productName: string;
    status: string;
}

/**
 * 탭 설정 타입
 */
interface TabConfig {
    id: TabId;
    label: string;
    leftTitle: string;
    rightTitle: string;
}

/**
 * 멀티 그리드 + 탭 UI 샘플 페이지
 * 탭별로 독립된 멀티 그리드를 관리하는 예제
 */
export default function AgGridMultiGridTabs() {
    // Zustand store에서 상태와 액션 가져오기 - selector를 분리하여 무한 루프 방지
    const activeTabId = useMultiGridTabsStore((state) => state.activeTabId);
    const tabs = useMultiGridTabsStore((state) => state.tabs);
    const setActiveTab = useMultiGridTabsStore((state) => state.setActiveTab);
    const setSelectedLeftRows = useMultiGridTabsStore((state) => state.setSelectedLeftRows);
    const syncSelectedToRight = useMultiGridTabsStore((state) => state.syncSelectedToRight);
    const initTab = useMultiGridTabsStore((state) => state.initTab);

    // 현재 활성 탭의 상태
    const currentTabState = tabs[activeTabId];
    
    // 타입 캐스팅된 rowData들
    const leftRowData = (currentTabState?.leftRowData ?? []) as UserData[] | ProductData[] | OrderData[];
    const rightRowData = (currentTabState?.rightRowData ?? []) as UserData[] | ProductData[] | OrderData[];
    const selectedLeftRows = (currentTabState?.selectedLeftRows ?? []) as UserData[] | ProductData[] | OrderData[];

    // 탭 설정 배열
    const tabConfigs: TabConfig[] = [
        { id: 'users', label: '사용자', leftTitle: '전체 사용자 리스트', rightTitle: '선택된 사용자' },
        { id: 'products', label: '상품', leftTitle: '상품 리스트', rightTitle: '장바구니/선택 상품' },
        { id: 'orders', label: '주문', leftTitle: '주문 리스트', rightTitle: '선택 주문 상세' },
    ];

    // 사용자 목업 데이터 생성
    const generateUsersData = (): UserData[] => {
        const roles = ['관리자', '개발자', '디자이너', '기획자', '마케터'];
        const names = ['김철수', '이영희', '박민수', '정수진', '최동현', '강미영', '윤성호', '임지은', '한소희', '조민준'];
        return names.map((name, index) => ({
            id: index + 1,
            name: `${name}${index + 1}`,
            email: `user${index + 1}@example.com`,
            role: roles[Math.floor(Math.random() * roles.length)],
        }));
    };

    // 상품 목업 데이터 생성
    const generateProductsData = (): ProductData[] => {
        const categories = ['전자제품', '의류', '식품', '도서', '스포츠'];
        const products = [
            '노트북',
            '스마트폰',
            '태블릿',
            '이어폰',
            '키보드',
            '마우스',
            '모니터',
            '스피커',
            '웹캠',
            '마이크',
        ];
        return products.map((product, index) => ({
            id: index + 1,
            name: product,
            price: Math.floor(Math.random() * 500000) + 10000,
            category: categories[Math.floor(Math.random() * categories.length)],
        }));
    };

    // 주문 목업 데이터 생성
    const generateOrdersData = (): OrderData[] => {
        const statuses = ['대기', '처리중', '완료', '취소'];
        const userNames = ['김철수', '이영희', '박민수', '정수진', '최동현'];
        const productNames = ['노트북', '스마트폰', '태블릿', '이어폰', '키보드'];
        return Array.from({ length: 15 }, (_, index) => ({
            id: index + 1,
            userName: userNames[Math.floor(Math.random() * userNames.length)],
            productName: productNames[Math.floor(Math.random() * productNames.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
        }));
    };

    // 컴포넌트 마운트 시 각 탭의 초기 데이터 설정
    useEffect(() => {
        // 각 탭이 초기화되지 않았다면 초기화
        if (!tabs.users.leftRowData.length) {
            initTab('users', { leftRowData: generateUsersData() });
        }
        if (!tabs.products.leftRowData.length) {
            initTab('products', { leftRowData: generateProductsData() });
        }
        if (!tabs.orders.leftRowData.length) {
            initTab('orders', { leftRowData: generateOrdersData() });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 좌측 그리드 선택 변경 핸들러
    // 선택된 행을 자동으로 우측 그리드로 동기화
    const handleLeftSelectionChanged = useCallback(
        (params: SelectionChangedEvent) => {
            const selectedRows = params.api.getSelectedRows();
            // 선택된 행을 store에 저장
            setSelectedLeftRows(activeTabId, selectedRows);
            // 자동으로 우측 그리드에 동기화
            syncSelectedToRight(activeTabId);
            console.log(`[${activeTabId}] Selection changed and synced to right:`, selectedRows);
        },
        [activeTabId, setSelectedLeftRows, syncSelectedToRight]
    );

    // 우측 그리드에서 행 삭제 핸들러
    const handleRightRowDelete = useCallback(
        (rowId: number) => {
            const { setRightRowData, tabs: currentTabs } = useMultiGridTabsStore.getState();
            const currentRightData = (currentTabs[activeTabId]?.rightRowData ?? []) as UserData[] | ProductData[] | OrderData[];
            const updatedRightData = currentRightData.filter((row: UserData | ProductData | OrderData) => row.id !== rowId);
            setRightRowData(activeTabId, updatedRightData);
            console.log(`[${activeTabId}] Row deleted from right grid:`, rowId);
        },
        [activeTabId]
    );

    // 선택 항목을 우측으로 보내기 핸들러
    const handleSyncToRight = useCallback(() => {
        syncSelectedToRight(activeTabId);
        console.log(`[${activeTabId}] Selected rows synced to right grid`);
    }, [activeTabId, syncSelectedToRight]);

    // 사용자 탭 컬럼 정의
    const usersColumnDefs = useMemo<ColDef[]>(
        () => [
            {
                checkboxSelection: true, // 체크박스 컬럼 추가
                headerCheckboxSelection: true, // 헤더에 전체 선택 체크박스
                width: 50,
                pinned: 'left', // 왼쪽에 고정
                sortable: false,
                filter: false,
            },
            { field: 'id', headerName: 'ID', width: 80, sortable: true },
            { field: 'name', headerName: '이름', width: 150, sortable: true, filter: 'agTextColumnFilter' },
            { field: 'email', headerName: '이메일', width: 200, sortable: true, filter: 'agTextColumnFilter' },
            { field: 'role', headerName: '역할', width: 120, sortable: true, filter: 'agTextColumnFilter' },
        ],
        []
    );

    // 상품 탭 컬럼 정의
    const productsColumnDefs = useMemo<ColDef[]>(
        () => [
            {
                checkboxSelection: true, // 체크박스 컬럼 추가
                headerCheckboxSelection: true, // 헤더에 전체 선택 체크박스
                width: 50,
                pinned: 'left', // 왼쪽에 고정
                sortable: false,
                filter: false,
            },
            { field: 'id', headerName: 'ID', width: 80, sortable: true },
            { field: 'name', headerName: '상품명', width: 150, sortable: true, filter: 'agTextColumnFilter' },
            {
                field: 'price',
                headerName: '가격',
                width: 150,
                sortable: true,
                filter: 'agNumberColumnFilter',
                cellRenderer: (params: ICellRendererParams<ProductData>) => {
                    return `${params.value?.toLocaleString() ?? 0}원`;
                },
            },
            { field: 'category', headerName: '카테고리', width: 120, sortable: true, filter: 'agTextColumnFilter' },
        ],
        []
    );

    // 주문 탭 컬럼 정의
    const ordersColumnDefs = useMemo<ColDef[]>(
        () => [
            {
                checkboxSelection: true, // 체크박스 컬럼 추가
                headerCheckboxSelection: true, // 헤더에 전체 선택 체크박스
                width: 50,
                pinned: 'left', // 왼쪽에 고정
                sortable: false,
                filter: false,
            },
            { field: 'id', headerName: 'ID', width: 80, sortable: true },
            { field: 'userName', headerName: '사용자', width: 120, sortable: true, filter: 'agTextColumnFilter' },
            { field: 'productName', headerName: '상품명', width: 150, sortable: true, filter: 'agTextColumnFilter' },
            {
                field: 'status',
                headerName: '상태',
                width: 120,
                sortable: true,
                filter: 'agTextColumnFilter',
                cellRenderer: (params: ICellRendererParams<OrderData>) => {
                    const colorMap: Record<string, string> = {
                        대기: 'bg-slate-100 text-slate-700',
                        처리중: 'bg-blue-100 text-blue-700',
                        완료: 'bg-green-100 text-green-700',
                        취소: 'bg-red-100 text-red-700',
                    };
                    return (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[params.value ?? ''] || ''}`}>
                            {params.value}
                        </span>
                    );
                },
            },
        ],
        []
    );

    // 우측 그리드 컬럼 정의 (삭제 버튼 포함)
    const rightColumnDefs = useMemo<ColDef[]>(() => {
        // 활성 탭에 따라 기본 컬럼 가져오기
        let baseColumns: ColDef[] = [];
        if (activeTabId === 'users') {
            baseColumns = usersColumnDefs;
        } else if (activeTabId === 'products') {
            baseColumns = productsColumnDefs;
        } else {
            baseColumns = ordersColumnDefs;
        }

        // 삭제 버튼 컬럼 추가
        return [
            ...baseColumns,
            {
                headerName: '액션',
                width: 100,
                cellRenderer: (params: ICellRendererParams) => {
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
        ];
    }, [activeTabId, usersColumnDefs, productsColumnDefs, ordersColumnDefs, handleRightRowDelete]);

    // 활성 탭에 따른 좌측 컬럼 정의
    const leftColumnDefs = useMemo<ColDef[]>(() => {
        if (activeTabId === 'users') return usersColumnDefs;
        if (activeTabId === 'products') return productsColumnDefs;
        return ordersColumnDefs;
    }, [activeTabId, usersColumnDefs, productsColumnDefs, ordersColumnDefs]);

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
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Multi Grid (Tabs)</h1>
                    <p className="text-slate-600">
                        탭별로 독립된 멀티 그리드를 관리하는 예제입니다. 각 탭의 상태는 전환해도 유지됩니다.
                    </p>
                </div>

                {/* 탭 메뉴 */}
                <div className="mb-6 bg-white rounded-lg shadow-md border border-slate-200">
                    <div className="flex border-b border-slate-200">
                        {tabConfigs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                                    activeTabId === tab.id
                                        ? 'border-primary text-primary bg-primary/5'
                                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 동기화 버튼 */}
                <div className="mb-4 flex justify-end">
                    <button
                        onClick={handleSyncToRight}
                        disabled={selectedLeftRows.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        <ArrowRight className="w-4 h-4" />
                        선택 항목 우측으로 보내기 ({selectedLeftRows.length}개)
                    </button>
                </div>

                {/* 멀티 그리드 영역 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 좌측 그리드 */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">
                            {tabConfigs.find((t) => t.id === activeTabId)?.leftTitle}
                        </h2>
                        <p className="text-sm text-slate-600 mb-4">
                            행을 선택하면 우측 그리드로 보낼 수 있습니다. (체크박스로 다중 선택 가능)
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
                            선택된 행: <strong>{selectedLeftRows.length}</strong>개
                        </div>
                    </div>

                    {/* 우측 그리드 */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">
                            {tabConfigs.find((t) => t.id === activeTabId)?.rightTitle}
                        </h2>
                        <p className="text-sm text-slate-600 mb-4">
                            좌측에서 선택한 항목들이 여기에 표시됩니다. 삭제 버튼으로 제거할 수 있습니다.
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
                <div className="mt-6 bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                    <h3 className="font-semibold text-indigo-900 mb-2">사용된 주요 기능</h3>
                    <ul className="list-disc list-inside text-sm text-indigo-800 space-y-1">
                        <li>
                            <strong>탭 기반 UI</strong>: 여러 탭을 전환하며 각 탭의 독립된 상태를 유지
                        </li>
                        <li>
                            <strong>탭별 독립 상태 관리</strong>: 각 탭의 leftRowData, rightRowData, selectedLeftRows가 독립적으로 관리됨
                        </li>
                        <li>
                            <strong>상태 유지</strong>: 탭을 전환해도 각 탭의 데이터와 선택 상태가 그대로 유지됨
                        </li>
                        <li>
                            <strong>동기화 기능</strong>: 좌측에서 선택한 항목을 우측 그리드로 복사하는 기능
                        </li>
                        <li>
                            <strong>Zustand 슬라이스 패턴</strong>: 탭별로 독립된 슬라이스를 가진 store 구조로 확장성 확보
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

