import { Link } from 'react-router-dom';
import { ArrowRight, Grid, Database, MousePointerClick, Move, LayoutGrid, Layers, Users } from 'lucide-react';

/**
 * ag-Grid 샘플 페이지 인덱스
 * 모든 샘플 페이지로 이동할 수 있는 메뉴 페이지
 */
export default function AgGridIndex() {
    // 샘플 페이지 목록 정의
    const samples = [
        {
            id: 'basic',
            title: '기본 예제',
            description: 'ag-Grid의 기본 기능을 보여주는 예제입니다. 정렬, 필터, 페이징 등 기본 기능을 확인할 수 있습니다.',
            path: '/ag-grid/basic',
            icon: Grid,
            color: 'bg-blue-500',
        },
        {
            id: 'crud',
            title: 'CRUD 샘플',
            description: '행 추가, 수정, 삭제 기능을 구현한 예제입니다. Zustand store와 연동하여 상태를 관리합니다.',
            path: '/ag-grid/crud',
            icon: Database,
            color: 'bg-green-500',
        },
        {
            id: 'events',
            title: '이벤트 샘플',
            description: 'ag-Grid의 다양한 이벤트를 확인할 수 있는 예제입니다. 이벤트 로그를 실시간으로 확인할 수 있습니다.',
            path: '/ag-grid/events',
            icon: MousePointerClick,
            color: 'bg-purple-500',
        },
        {
            id: 'row-pos',
            title: 'Row Position / Drag & Drop',
            description: '행 순서를 드래그 앤 드롭으로 변경하는 예제입니다. 순서 변경 시 Zustand store에 반영됩니다.',
            path: '/ag-grid/row-pos',
            icon: Move,
            color: 'bg-orange-500',
        },
        {
            id: 'multi-grid',
            title: '멀티 그리드',
            description: '한 페이지에 여러 그리드를 배치하고, 그리드 간 데이터를 공유하는 예제입니다.',
            path: '/ag-grid/multi-grid',
            icon: LayoutGrid,
            color: 'bg-pink-500',
        },
        {
            id: 'multi-grid-tabs',
            title: 'Multi Grid (Tabs)',
            description: '탭별로 독립된 멀티 그리드를 관리하는 예제입니다. 각 탭의 상태는 전환해도 유지됩니다.',
            path: '/ag-grid/multi-grid-tabs',
            icon: Layers,
            color: 'bg-indigo-500',
        },
        {
            id: 'org-user-management',
            title: '조직/직급/사용자 관리',
            description: '조직, 직급, 사용자를 관리하는 샘플입니다. API 레이어와 스토어가 분리되어 있어 실제 백엔드 연동으로 쉽게 교체할 수 있습니다.',
            path: '/ag-grid/org-user-management',
            icon: Users,
            color: 'bg-teal-500',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 헤더 섹션 */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">AG Grid 샘플 페이지</h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        ag-Grid와 Zustand를 활용한 다양한 샘플 예제들을 확인해보세요.
                        <br />
                        각 샘플은 실제 프로젝트에서 활용할 수 있는 패턴으로 구성되어 있습니다.
                    </p>
                </div>

                {/* 샘플 카드 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {samples.map((sample) => {
                        const Icon = sample.icon;
                        return (
                            <Link
                                key={sample.id}
                                to={sample.path}
                                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-primary"
                            >
                                <div className="p-6">
                                    {/* 아이콘 */}
                                    <div className={`${sample.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* 제목 */}
                                    <h2 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                        {sample.title}
                                    </h2>

                                    {/* 설명 */}
                                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                                        {sample.description}
                                    </p>

                                    {/* 링크 */}
                                    <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                                        <span>자세히 보기</span>
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* 추가 정보 */}
                <div className="mt-12 bg-white rounded-lg shadow-md p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">사용 기술</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            ag-Grid Community
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            Zustand
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            React 18
                        </span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                            TypeScript
                        </span>
                        <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                            TailwindCSS
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

