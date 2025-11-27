import { Link } from 'react-router-dom';
import { NAVIGATION } from '../../shared/lib/navigation';
import { Footer } from './Footer';

interface SubLayoutProps {
    title: string;
    subtitle?: string;
    activeTab?: string;
    children: React.ReactNode;
    sectionId: string;
}

export function SubLayout({ title, subtitle, activeTab, children, sectionId }: SubLayoutProps) {
    const section = NAVIGATION.find(item => item.id === sectionId);

    return (
        <div className="pt-20 min-h-screen bg-slate-50 flex flex-col">
            {/* Visual Banner */}
            <div className="bg-primary py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                        {title}
                    </h1>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                        {subtitle || "SoftOne은 끊임없는 혁신과 도전으로 고객의 성공적인 비즈니스를 지원합니다."}
                    </p>
                </div>
            </div>

            {/* LNB (Local Navigation Bar) */}
            {section?.children && (
                <div className="bg-white border-b border-slate-200 sticky top-20 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex overflow-x-auto no-scrollbar">
                            {section.children.map((child) => (
                                <Link
                                    key={child.id}
                                    to={child.path}
                                    className={`
                    whitespace-nowrap px-6 py-4 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === child.id
                                            ? 'border-secondary text-secondary'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                        }
                  `}
                                >
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
                {children}
            </main>

            <Footer />
        </div>
    );
}
