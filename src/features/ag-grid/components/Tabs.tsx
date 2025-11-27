/**
 * 탭 컴포넌트
 * 
 * 기능적으로 분리된 탭 구조를 제공하며, 탭 전환 시 전역 스토어에 상태를 저장합니다.
 */

import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { useGlobalSelectionStore } from '../../../store/globalSelectionStore';

// ========== 타입 정의 ==========

export type TabItem = {
    id: string;
    label: string;
    content: ReactNode;
    icon?: ReactNode;
    badge?: number | string; // 알림 배지 (선택적)
};

export interface TabsProps {
    items: TabItem[];
    defaultActiveTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
}

// ========== 컴포넌트 ==========

export default function Tabs({ items, defaultActiveTab, onTabChange, className = '' }: TabsProps) {
    const { session, setLastActiveTab } = useGlobalSelectionStore();
    
    // 활성 탭: 세션 상태에서 가져오거나 기본값 사용
    const activeTabId = useMemo(() => {
        if (session.lastActiveTab) {
            const found = items.find(item => item.id === session.lastActiveTab);
            if (found) return found.id;
        }
        return defaultActiveTab || items[0]?.id || '';
    }, [session.lastActiveTab, items, defaultActiveTab]);

    // 탭 변경 핸들러
    const handleTabChange = (tabId: string) => {
        // 전역 스토어에 마지막 활성 탭 저장
        setLastActiveTab(tabId as 'org' | 'rank' | 'user' | null);
        
        // 외부 핸들러 호출
        if (onTabChange) {
            onTabChange(tabId);
        }
    };

    // 활성 탭의 컨텐츠 찾기
    const activeTab = items.find((item) => item.id === activeTabId);
    const activeContent = activeTab?.content || null;

    return (
        <div className={`w-full ${className}`}>
            {/* 탭 헤더 */}
            <div className="bg-white rounded-lg shadow-md border border-slate-200 mb-6">
                <div className="flex border-b border-slate-200">
                    {items.map((item) => {
                        const isActive = item.id === activeTabId;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 flex items-center gap-2 relative ${
                                    isActive
                                        ? 'border-primary text-primary bg-primary/5'
                                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                                {item.label}
                                {item.badge !== undefined && (
                                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                                        isActive 
                                            ? 'bg-primary text-white' 
                                            : 'bg-slate-200 text-slate-700'
                                    }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 탭 컨텐츠 */}
            <div className="tab-content">
                {activeContent}
            </div>
        </div>
    );
}
