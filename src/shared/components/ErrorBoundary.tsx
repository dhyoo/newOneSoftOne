import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

/**
 * 에러 바운더리 컴포넌트
 * 자식 컴포넌트에서 발생한 에러를 캐치하여 표시
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
                        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
                            <h1 className="text-2xl font-bold text-red-600 mb-4">오류가 발생했습니다</h1>
                            <p className="text-slate-700 mb-4">
                                페이지를 로드하는 중 오류가 발생했습니다. 브라우저 콘솔을 확인해주세요.
                            </p>
                            {this.state.error && (
                                <details className="mb-4">
                                    <summary className="cursor-pointer text-sm text-slate-600 mb-2">에러 상세 정보</summary>
                                    <pre className="bg-slate-100 p-4 rounded text-xs overflow-auto">
                                        {this.state.error.toString()}
                                        {this.state.error.stack}
                                    </pre>
                                </details>
                            )}
                            <button
                                onClick={() => {
                                    this.setState({ hasError: false, error: undefined });
                                    window.location.href = '/ag-grid';
                                }}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                목록으로 돌아가기
                            </button>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

