/**
 * API 호출 로그 뷰어 컴포넌트
 * 
 * 여러 스토어의 API 로그를 통합하여 표시합니다.
 */

import { useMemo } from 'react';
import { useOrgStore } from '../../../store/orgStore';
import { useRankStore } from '../../../store/rankStore';
import { useUserStore } from '../../../store/userStore';

export default function ApiLogViewer() {
    const { apiLogs: orgApiLogs } = useOrgStore();
    const { apiLogs: rankApiLogs } = useRankStore();
    const { apiLogs: userApiLogs } = useUserStore();

    // 세 스토어의 로그를 통합하여 표시
    const allApiLogs = useMemo(() => {
        const combined = [...orgApiLogs, ...rankApiLogs, ...userApiLogs];
        // 타임스탬프 기준으로 정렬 (최신순)
        return combined.sort((a, b) => {
            const timeA = new Date(`2000-01-01 ${a.timestamp}`).getTime();
            const timeB = new Date(`2000-01-01 ${b.timestamp}`).getTime();
            return timeB - timeA;
        });
    }, [orgApiLogs, rankApiLogs, userApiLogs]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">API 호출 로그 (통합)</h2>
            <div className="max-h-64 overflow-y-auto space-y-2">
                {allApiLogs.length === 0 ? (
                    <p className="text-slate-500 text-sm">API 호출 로그가 없습니다.</p>
                ) : (
                    allApiLogs.slice(0, 20).map((log) => (
                        <div
                            key={log.id}
                            className={`p-3 rounded-lg border ${
                                log.success
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-red-50 border-red-200'
                            }`}
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <span className="font-mono text-xs text-slate-500">{log.timestamp}</span>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                        log.method === 'GET'
                                            ? 'bg-blue-100 text-blue-800'
                                            : log.method === 'POST'
                                            ? 'bg-green-100 text-green-800'
                                            : log.method === 'PUT'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {log.method}
                                </span>
                                <span className="font-mono text-xs text-slate-700">{log.url}</span>
                                {log.payload && (
                                    <span className="text-xs text-slate-600">
                                        payload={JSON.stringify(log.payload)}
                                    </span>
                                )}
                                <span className={`ml-auto text-xs ${log.success ? 'text-green-700' : 'text-red-700'}`}>
                                    {log.success ? '✓' : '✗'} {log.message}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

