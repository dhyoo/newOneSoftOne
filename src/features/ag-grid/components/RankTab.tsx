/**
 * 직급 관리 탭 컴포넌트
 * 
 * 직급 목록과 CRUD 기능을 제공합니다.
 */

import { useMemo, useCallback, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useRankStore } from '../../../store/rankStore';
import { useOrgStore } from '../../../store/orgStore';
import { useGlobalSelectionStore } from '../../../store/globalSelectionStore';
import type { Rank } from '../../../api/types';
import { fetchRanksWithAxios } from '../../../api/rank/rankApi';
import { Plus, Save, Trash2, Info, RefreshCcw } from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function RankTab() {
    const { ranks, fetchRanks, createRank, updateRank, deleteRank } = useRankStore();
    const { orgs } = useOrgStore();
    const {
        selectedOrgId: globalSelectedOrgId,
        setSelectedRankId: setGlobalSelectedRankId,
        setFilter,
    } = useGlobalSelectionStore();

    // 필터 상태 - 전역 선택 상태를 우선 사용
    const [selectedOrgIdForFilter, setSelectedOrgIdForFilter] = useState<string | null>(
        globalSelectedOrgId || null
    );

    // 폼 데이터 상태
    const [formData, setFormData] = useState<Partial<Rank>>({});
    const [selectedRankId, setSelectedRankId] = useState<string | null>(null);

    // axios 샘플 용 상태
    const [axiosSample, setAxiosSample] = useState<Rank[]>([]);
    const [axiosMessage, setAxiosMessage] = useState<string>('');
    const [axiosLoading, setAxiosLoading] = useState(false);
    const [axiosError, setAxiosError] = useState<string | null>(null);

    // 전역 선택 상태가 바뀌면 로컬 필터와 전역 필터를 동기화
    useEffect(() => {
        if (globalSelectedOrgId) {
            setSelectedOrgIdForFilter(globalSelectedOrgId);
            setFilter('orgId', globalSelectedOrgId);
        }
    }, [globalSelectedOrgId, setFilter]);

    // 필터 값이 변경될 때마다 직급 목록 조회
    useEffect(() => {
        fetchRanks(selectedOrgIdForFilter || undefined);
    }, [selectedOrgIdForFilter, fetchRanks]);

    // axios 샘플 호출
    useEffect(() => {
        let ignore = false;
        setAxiosLoading(true);
        setAxiosError(null);

        fetchRanksWithAxios(selectedOrgIdForFilter || undefined)
            .then((res) => {
                if (ignore) return;
                if (res.status === 200) {
                    setAxiosSample(res.data);
                    setAxiosMessage(res.message || '성공적으로 데이터를 불러왔습니다.');
                } else {
                    setAxiosSample([]);
                    setAxiosError(res.message || '직급 데이터를 불러오지 못했습니다.');
                }
            })
            .catch((err) => {
                if (ignore) return;
                setAxiosSample([]);
                setAxiosError(err.message || 'axios 요청 중 오류가 발생했습니다.');
            })
            .finally(() => {
                if (!ignore) setAxiosLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [selectedOrgIdForFilter]);

    // 행 클릭 핸들러 - 전역 스토어에도 저장
    const handleRowClick = useCallback(
        (params: RowClickedEvent<Rank>) => {
            if (params.data) {
                setSelectedRankId(params.data.id);
                setFormData({ ...params.data });
                // 전역 스토어에 저장
                setGlobalSelectedRankId(params.data.id);
                // 히스토리에 추가 (직급 이름 포함)
                useGlobalSelectionStore.getState().addToHistory('rank', params.data.id, params.data.name);
            }
        },
        [setGlobalSelectedRankId]
    );

    // 신규 버튼 핸들러
    const handleNew = useCallback(() => {
        setSelectedRankId(null);
        setFormData({ orgId: selectedOrgIdForFilter || '', name: '', level: 1, isActive: true });
    }, [selectedOrgIdForFilter]);

    // 저장 버튼 핸들러
    const handleSave = useCallback(async () => {
        if (!formData.name || !formData.orgId) {
            alert('직급명과 조직을 입력해주세요.');
            return;
        }

        if (selectedRankId) {
            await updateRank(selectedRankId, formData);
        } else {
            await createRank({
                orgId: formData.orgId!,
                name: formData.name!,
                level: formData.level ?? 1,
                isActive: formData.isActive ?? true,
            });
        }
        handleNew();
    }, [formData, selectedRankId, createRank, updateRank, handleNew]);

    // 삭제 버튼 핸들러
    const handleDelete = useCallback(async () => {
        if (!selectedRankId) {
            alert('삭제할 직급을 선택해주세요.');
            return;
        }

        if (window.confirm('정말로 이 직급을 삭제하시겠습니까?')) {
            await deleteRank(selectedRankId);
            handleNew();
        }
    }, [selectedRankId, deleteRank, handleNew]);

    // 컬럼 정의
    const columnDefs = useMemo<ColDef<Rank>[]>(
        () => [
            { field: 'id', headerName: 'ID', width: 150, sortable: true },
            { field: 'name', headerName: '직급명', width: 150, sortable: true, filter: 'agTextColumnFilter' },
            { field: 'level', headerName: '레벨', width: 100, sortable: true, filter: 'agNumberColumnFilter' },
            {
                field: 'orgId',
                headerName: '조직',
                width: 150,
                cellRenderer: (params: { value: string }) => {
                    const org = orgs.find((o) => o.id === params.value);
                    return org?.name || params.value;
                },
            },
            {
                field: 'isActive',
                headerName: '사용여부',
                width: 100,
                cellRenderer: (params: { value: boolean }) => {
                    return params.value ? '사용' : '미사용';
                },
            },
        ],
        [orgs]
    );

    const featureHighlights = [
        {
            title: '조직 연동 필터',
            description: '조직 탭에서 선택한 항목이 자동으로 적용되어 관련 직급만 빠르게 조회할 수 있습니다.',
        },
        {
            title: '그리드 선택 히스토리',
            description: '직급을 선택하면 전역 히스토리에 남아 사용자 탭 등에서도 맥락을 공유합니다.',
        },
        {
            title: '폼 기반 CRUD',
            description: '우측 폼에서 직급명/레벨/활성 여부를 편집하고 저장 시 스토어와 그리드가 동기화됩니다.',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-semibold text-slate-900">직급 탭 주요 기능 안내</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                    {featureHighlights.map((item) => (
                        <div key={item.title} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <RefreshCcw className="w-4 h-4 text-primary" />
                        <p className="text-sm font-semibold text-slate-900">Axios Mock 응답 (최대 3건)</p>
                    </div>
                    {axiosLoading && <span className="text-xs text-slate-500">불러오는 중...</span>}
                </div>
                {axiosError ? (
                    <p className="text-xs text-red-500">{axiosError}</p>
                ) : (
                    <div>
                        <p className="text-xs text-slate-500 mb-2">{axiosMessage}</p>
                        {axiosSample.slice(0, 3).map((rank) => (
                            <div
                                key={rank.id}
                                className="flex items-center justify-between text-xs text-slate-700 border border-slate-100 rounded-md px-3 py-2 mb-1"
                            >
                                <span className="font-semibold">{rank.name}</span>
                                <span className="text-slate-500">#{rank.id}</span>
                            </div>
                        ))}
                        {axiosSample.length === 0 && !axiosLoading && (
                            <p className="text-xs text-slate-500">표시할 데이터가 없습니다.</p>
                        )}
                    </div>
                )}
            </div>

            {/* 조직 필터 */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    조직 선택
                    {globalSelectedOrgId && (
                        <span className="ml-2 text-xs text-blue-600 font-normal">
                            (조직 탭에서 선택됨: {orgs.find((o) => o.id === globalSelectedOrgId)?.name || globalSelectedOrgId})
                        </span>
                    )}
                </label>
                <select
                    value={globalSelectedOrgId || selectedOrgIdForFilter || ''}
                    onChange={(e) => {
                        const newOrgId = e.target.value || null;
                        setSelectedOrgIdForFilter(newOrgId);
                        setFilter('orgId', newOrgId);
                        handleNew();
                    }}
                    disabled={!!globalSelectedOrgId}
                    className={`w-full max-w-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                        globalSelectedOrgId ? 'bg-slate-100 cursor-not-allowed' : ''
                    }`}
                >
                    <option value="">전체</option>
                    {orgs.map((org) => (
                        <option key={org.id} value={org.id}>
                            {org.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 좌측: 직급 목록 그리드 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">직급 목록</h2>
                    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                        <AgGridReact
                            theme="legacy"
                            rowData={ranks}
                            columnDefs={columnDefs}
                            getRowId={(params) => params.data.id}
                            pagination={true}
                            paginationPageSize={10}
                            animateRows={true}
                            onRowClicked={handleRowClick}
                            rowSelection="single"
                        />
                    </div>
                </div>

                {/* 우측: 직급 정보 폼 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">직급 정보</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">조직</label>
                            <select
                                value={formData.orgId || ''}
                                onChange={(e) => setFormData((prev) => ({ ...prev, orgId: e.target.value }))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="">선택하세요</option>
                                {orgs.map((org) => (
                                    <option key={org.id} value={org.id}>
                                        {org.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">직급명</label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">레벨</label>
                            <input
                                type="number"
                                value={formData.level || 1}
                                onChange={(e) => setFormData((prev) => ({ ...prev, level: parseInt(e.target.value) || 1 }))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rank-active"
                                checked={formData.isActive ?? true}
                                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                            />
                            <label htmlFor="rank-active" className="ml-2 text-sm text-slate-700">
                                사용 여부
                            </label>
                        </div>
                        <div className="flex gap-2 pt-4">
                            <button
                                onClick={handleNew}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                신규
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                저장
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

