/**
 * 사용자 관리 탭 컴포넌트
 * 
 * 사용자 목록과 CRUD 기능을 제공합니다.
 */

import { useMemo, useCallback, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import { useUserStore } from '../../../store/userStore';
import { useOrgStore } from '../../../store/orgStore';
import { useRankStore } from '../../../store/rankStore';
import { useGlobalSelectionStore } from '../../../store/globalSelectionStore';
import type { User } from '../../../api/types';
import { fetchUsersWithAxios } from '../../../api/user/userApi';
import { Plus, Save, Trash2, Info, RefreshCcw } from 'lucide-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function UserTab() {
    const { users, fetchUsers, createUser, updateUser, deleteUser } = useUserStore();
    const { orgs } = useOrgStore();
    const { ranks } = useRankStore();
    const {
        selectedOrgId: globalSelectedOrgId,
        selectedRankId: globalSelectedRankId,
        setSelectedOrgId: setGlobalSelectedOrgId,
        setSelectedRankId: setGlobalSelectedRankId,
        setSelectedUserId: setGlobalSelectedUserId,
        setFilter,
        session, // 세션 상태 추가
    } = useGlobalSelectionStore();

    // 필터 상태 - 전역 선택 상태를 우선 사용, 없으면 로컬 필터 사용
    const [selectedOrgIdForFilter, setSelectedOrgIdForFilter] = useState<string | null>(null);
    const [selectedRankIdForFilter, setSelectedRankIdForFilter] = useState<string | null>(null);

    // 폼 데이터 상태
    const [formData, setFormData] = useState<Partial<User>>({});
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    // axios 샘플 용 상태
    const [axiosSample, setAxiosSample] = useState<User[]>([]);
    const [axiosMessage, setAxiosMessage] = useState<string>('');
    const [axiosLoading, setAxiosLoading] = useState(false);
    const [axiosError, setAxiosError] = useState<string | null>(null);

    const effectiveOrgFilter = globalSelectedOrgId || selectedOrgIdForFilter || null;
    const effectiveRankFilter = globalSelectedRankId || selectedRankIdForFilter || null;

    // 탭이 활성화될 때마다 자동으로 조회 (조직/직급이 선택되어 있으면 해당 조직/직급의 사용자만 조회)
    useEffect(() => {
        // 현재 탭이 활성화되어 있는지 확인
        const isActiveTab = session.lastActiveTab === 'user';
        
        if (isActiveTab) {
            // 전역 선택된 조직/직급이 있으면 필터 설정
            if (globalSelectedOrgId) {
                setFilter('orgId', globalSelectedOrgId);
            }
            if (globalSelectedRankId) {
                setFilter('rankId', globalSelectedRankId);
            }
            
            // 해당 조직/직급의 사용자 자동 조회
            // 조직이 선택되어 있으면 조직 기준으로, 직급도 선택되어 있으면 조직+직급 기준으로 조회
            fetchUsers({
                orgId: globalSelectedOrgId || undefined,
                rankId: globalSelectedRankId || undefined,
            });
        }
    }, [session.lastActiveTab, globalSelectedOrgId, globalSelectedRankId, setFilter, fetchUsers]);

    // 로컬 필터 변경 시에도 사용자 목록 재조회 (전역 선택이 없을 때만)
    useEffect(() => {
        if (!globalSelectedOrgId && !globalSelectedRankId && session.lastActiveTab === 'user') {
            // 전역 선택이 없을 때만 로컬 필터로 조회
            fetchUsers({
                orgId: selectedOrgIdForFilter || undefined,
                rankId: selectedRankIdForFilter || undefined,
            });
        }
    }, [selectedOrgIdForFilter, selectedRankIdForFilter, globalSelectedOrgId, globalSelectedRankId, fetchUsers, session.lastActiveTab]);

    // axios 샘플 호출
    useEffect(() => {
        let ignore = false;
        setAxiosLoading(true);
        setAxiosError(null);

        fetchUsersWithAxios(effectiveOrgFilter || undefined, effectiveRankFilter || undefined)
            .then((res) => {
                if (ignore) return;
                if (res.status === 200) {
                    setAxiosSample(res.data);
                    setAxiosMessage(res.message || '성공적으로 데이터를 불러왔습니다.');
                } else {
                    setAxiosSample([]);
                    setAxiosError(res.message || '사용자 데이터를 불러오지 못했습니다.');
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
    }, [effectiveOrgFilter, effectiveRankFilter]);

    // 행 클릭 핸들러 - 전역 스토어에도 저장
    const handleRowClick = useCallback(
        (params: RowClickedEvent<User>) => {
            if (params.data) {
                setSelectedUserId(params.data.id);
                setFormData({ ...params.data });
                // 전역 스토어에 저장
                setGlobalSelectedUserId(params.data.id);
                setGlobalSelectedOrgId(params.data.orgId);
                setGlobalSelectedRankId(params.data.rankId);
                // 히스토리에 추가 (사용자 이름 포함)
                useGlobalSelectionStore.getState().addToHistory('user', params.data.id, params.data.name);
            }
        },
        [setGlobalSelectedUserId]
    );

    // 신규 버튼 핸들러
    const handleNew = useCallback(() => {
        setSelectedUserId(null);
        setFormData({
            orgId: selectedOrgIdForFilter || '',
            rankId: selectedRankIdForFilter || '',
            name: '',
            email: '',
            isActive: true,
        });
    }, [selectedOrgIdForFilter, selectedRankIdForFilter]);

    // 저장 버튼 핸들러
    const handleSave = useCallback(async () => {
        if (!formData.name || !formData.email || !formData.orgId || !formData.rankId) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        if (selectedUserId) {
            await updateUser(selectedUserId, formData);
        } else {
            await createUser({
                orgId: formData.orgId!,
                rankId: formData.rankId!,
                name: formData.name!,
                email: formData.email!,
                isActive: formData.isActive ?? true,
            });
        }
        setGlobalSelectedOrgId(formData.orgId || null);
        setGlobalSelectedRankId(formData.rankId || null);
        handleNew();
    }, [formData, selectedUserId, createUser, updateUser, handleNew, setGlobalSelectedOrgId, setGlobalSelectedRankId]);

    // 삭제 버튼 핸들러
    const handleDelete = useCallback(async () => {
        if (!selectedUserId) {
            alert('삭제할 사용자를 선택해주세요.');
            return;
        }

        if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
            await deleteUser(selectedUserId);
            handleNew();
        }
    }, [selectedUserId, deleteUser, handleNew]);

    // 컬럼 정의
    const columnDefs = useMemo<ColDef<User>[]>(
        () => [
            { field: 'id', headerName: 'ID', width: 150, sortable: true },
            { field: 'name', headerName: '이름', width: 120, sortable: true, filter: 'agTextColumnFilter' },
            { field: 'email', headerName: '이메일', width: 200, sortable: true, filter: 'agTextColumnFilter' },
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
                field: 'rankId',
                headerName: '직급',
                width: 120,
                cellRenderer: (params: { value: string }) => {
                    const rank = ranks.find((r) => r.id === params.value);
                    return rank?.name || params.value;
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
        [orgs, ranks]
    );

    const featureHighlights = [
        {
            title: '조직/직급 필터 연동',
            description: '상단 필터 또는 다른 탭에서 선택한 값을 기반으로 사용자 목록을 자동 분류합니다.',
        },
        {
            title: '전역 선택 히스토리',
            description: '행을 클릭하면 글로벌 selection과 히스토리에 기록되어 교차 탐색이 쉬워집니다.',
        },
        {
            title: '실시간 CRUD',
            description: '폼 입력 후 저장/삭제 시 zustand 스토어와 ag-Grid 데이터가 즉시 반영됩니다.',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-primary" />
                    <h3 className="text-base font-semibold text-slate-900">사용자 탭 주요 기능 안내</h3>
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
                        {axiosSample.slice(0, 3).map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between text-xs text-slate-700 border border-slate-100 rounded-md px-3 py-2 mb-1"
                            >
                                <span className="font-semibold">{user.name}</span>
                                <span className="text-slate-500">{user.email}</span>
                            </div>
                        ))}
                        {axiosSample.length === 0 && !axiosLoading && (
                            <p className="text-xs text-slate-500">표시할 데이터가 없습니다.</p>
                        )}
                    </div>
                )}
            </div>

            {/* 필터 */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            조직 선택
                            {globalSelectedOrgId && (
                                <span className="ml-2 text-xs text-blue-600 font-normal">
                                    (조직 탭에서 선택됨)
                                </span>
                            )}
                        </label>
                        <select
                            value={globalSelectedOrgId || selectedOrgIdForFilter || ''}
                            onChange={(e) => {
                                const newOrgId = e.target.value || null;
                                setSelectedOrgIdForFilter(newOrgId);
                                setFilter('orgId', newOrgId);
                                setGlobalSelectedOrgId(newOrgId);
                                setGlobalSelectedRankId(null);
                                handleNew();
                            }}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">전체</option>
                            {orgs.map((org) => (
                                <option key={org.id} value={org.id}>
                                    {org.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            직급 선택
                            {globalSelectedRankId && (
                                <span className="ml-2 text-xs text-green-600 font-normal">
                                    (직급 탭에서 선택됨)
                                </span>
                            )}
                        </label>
                        <select
                            value={globalSelectedRankId || selectedRankIdForFilter || ''}
                            onChange={(e) => {
                                const newRankId = e.target.value || null;
                                setSelectedRankIdForFilter(newRankId);
                                setFilter('rankId', newRankId);
                                setGlobalSelectedRankId(newRankId);
                                handleNew();
                            }}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">전체</option>
                            {ranks
                                .filter((rank) => {
                                    const orgFilter = globalSelectedOrgId || selectedOrgIdForFilter;
                                    return !orgFilter || rank.orgId === orgFilter;
                                })
                                .map((rank) => (
                                    <option key={rank.id} value={rank.id}>
                                        {rank.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 좌측: 사용자 목록 그리드 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">사용자 목록</h2>
                    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                        <AgGridReact
                            theme="legacy"
                            rowData={users}
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

                {/* 우측: 사용자 정보 폼 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">사용자 정보</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">이름</label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">이메일</label>
                            <input
                                type="email"
                                value={formData.email || ''}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
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
                            <label className="block text-sm font-medium text-slate-700 mb-1">직급</label>
                            <select
                                value={formData.rankId || ''}
                                onChange={(e) => setFormData((prev) => ({ ...prev, rankId: e.target.value }))}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="">선택하세요</option>
                                {ranks
                                    .filter((rank) => !formData.orgId || rank.orgId === formData.orgId)
                                    .map((rank) => (
                                        <option key={rank.id} value={rank.id}>
                                            {rank.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="user-active"
                                checked={formData.isActive ?? true}
                                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                            />
                            <label htmlFor="user-active" className="ml-2 text-sm text-slate-700">
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

