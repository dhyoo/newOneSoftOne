/**
 * 조직 관리 탭 컴포넌트
 * 
 * 조직 목록과 CRUD 기능을 제공합니다.
 */

import { useMemo, useCallback, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useOrgStore } from '../../../store/orgStore';
import { useGlobalSelectionStore } from '../../../store/globalSelectionStore';
import type { Org } from '../../../api/types';
import { Plus, Save, Trash2, Star, Info } from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function OrgTab() {
    const { orgs, createOrg, updateOrg, deleteOrg } = useOrgStore();
    const {
        selectedOrgId: globalSelectedOrgId,
        setSelectedOrgId: setGlobalSelectedOrgId,
        selectedOrgIds,
        isBookmarked,
    } = useGlobalSelectionStore();

    // 폼 데이터 상태
    const [formData, setFormData] = useState<Partial<Org>>({});
    const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

    // 전역 선택 상태와 로컬 상태 동기화
    useEffect(() => {
        if (globalSelectedOrgId) {
            const org = orgs.find((o) => o.id === globalSelectedOrgId);
            if (org) {
                setSelectedOrgId(globalSelectedOrgId);
                setFormData({ ...org });
            }
        }
    }, [globalSelectedOrgId, orgs]);

    // 행 클릭 핸들러 - 전역 스토어에도 저장
    const handleRowClick = useCallback(
        (params: RowClickedEvent<Org>) => {
            if (params.data) {
                setSelectedOrgId(params.data.id);
                setFormData({ ...params.data });
                // 전역 스토어에 저장 (단건 선택)
                setGlobalSelectedOrgId(params.data.id);
                // 히스토리에 추가 (조직 이름 포함)
                useGlobalSelectionStore.getState().addToHistory('org', params.data.id, params.data.name);
            }
        },
        [setGlobalSelectedOrgId]
    );

    // 신규 버튼 핸들러
    const handleNew = useCallback(() => {
        setSelectedOrgId(null);
        setFormData({ name: '', parentId: null, isActive: true });
    }, []);

    // 저장 버튼 핸들러
    const handleSave = useCallback(async () => {
        if (!formData.name) {
            alert('조직명을 입력해주세요.');
            return;
        }

        if (selectedOrgId) {
            await updateOrg(selectedOrgId, formData);
        } else {
            await createOrg({
                name: formData.name!,
                parentId: formData.parentId || null,
                isActive: formData.isActive ?? true,
            });
        }
        handleNew();
    }, [formData, selectedOrgId, createOrg, updateOrg, handleNew]);

    // 삭제 버튼 핸들러
    const handleDelete = useCallback(async () => {
        if (!selectedOrgId) {
            alert('삭제할 조직을 선택해주세요.');
            return;
        }

        if (window.confirm('정말로 이 조직을 삭제하시겠습니까?')) {
            await deleteOrg(selectedOrgId);
            handleNew();
        }
    }, [selectedOrgId, deleteOrg, handleNew]);

    // 컬럼 정의
    const columnDefs = useMemo<ColDef<Org>[]>(
        () => [
            {
                field: 'id',
                headerName: '',
                width: 50,
                cellRenderer: (params: { data: Org }) => {
                    const isSelected = selectedOrgIds.includes(params.data.id);
                    const bookmarked = isBookmarked('org', params.data.id);
                    return (
                        <div className="flex items-center gap-1 h-full">
                            {isSelected && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                            {bookmarked && (
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            )}
                        </div>
                    );
                },
            },
            { field: 'id', headerName: 'ID', width: 150, sortable: true },
            { field: 'name', headerName: '조직명', width: 200, sortable: true, filter: 'agTextColumnFilter' },
            {
                field: 'parentId',
                headerName: '상위조직',
                width: 150,
                sortable: true,
                cellRenderer: (params: { value: string | null | undefined }) => {
                    if (!params.value) return '-';
                    const parent = orgs.find((org) => org.id === params.value);
                    return parent?.name || params.value;
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
        [orgs, selectedOrgIds, isBookmarked]
    );

    const featureHighlights = [
        {
            title: '전역 선택 연동',
            description: '조직을 클릭하면 Rank/User 탭의 필터도 즉시 연동되어 교차 데이터 탐색이 쉬워집니다.',
        },
        {
            title: '계층 구조 관리',
            description: '상위 조직을 지정해 다단계 구조를 만들고, 중복 선택 방지 로직으로 일관성을 유지합니다.',
        },
        {
            title: '신규·저장·삭제',
            description: '우측 폼에서 데이터를 수정하며, 저장/삭제 시 그리드와 스토어가 자동 동기화됩니다.',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-semibold text-slate-900">조직 탭 주요 기능 안내</h3>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 좌측: 조직 목록 그리드 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">조직 목록</h2>
                <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                        <AgGridReact
                            theme="legacy"
                            rowData={orgs}
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

            {/* 우측: 조직 정보 폼 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">조직 정보</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">조직명</label>
                        <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">상위 조직</label>
                        <select
                            value={formData.parentId || ''}
                            onChange={(e) => setFormData((prev) => ({ ...prev, parentId: e.target.value || null }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">없음</option>
                            {orgs
                                .filter((org) => org.id !== selectedOrgId)
                                .map((org) => (
                                    <option key={org.id} value={org.id}>
                                        {org.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="org-active"
                            checked={formData.isActive ?? true}
                            onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                            className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="org-active" className="ml-2 text-sm text-slate-700">
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

