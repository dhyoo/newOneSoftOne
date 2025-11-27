import { SubLayout } from '../../../shared/ui/SubLayout';
import { RECRUIT_MOCK_DATA } from '../utils/mockData';
import {
    Heart, Star, Users, BarChart3, ClipboardCheck, FileText,
    Sun, Trophy, Gift, Coins, Baby, BookOpen, Award
} from 'lucide-react';

interface RecruitPageProps {
    tab: string;
}

export default function RecruitPage({ tab }: RecruitPageProps) {
    const data = RECRUIT_MOCK_DATA;

    const renderContent = () => {
        switch (tab) {
            case 'culture':
                return (
                    <div className="spacing-lg text-center">
                        <div>
                            <h3 className="section-title mb-6">{data.culture.title}</h3>
                            <p className="text-lg text-primary font-medium mb-4">{data.culture.subtitle}</p>
                            <p className="text-body-pre max-w-3xl mx-auto">
                                {data.culture.desc}
                            </p>
                        </div>

                        <div className="grid-responsive-4">
                            {data.culture.values.map((value) => (
                                <div key={value.id} className="value-card group">
                                    <div className={`value-icon-box ${value.color === 'cyan' ? 'bg-cyan-500 text-white' : 'bg-blue-600 text-white'}`}>
                                        {value.id === 'humanity' && <Users className="w-10 h-10" />}
                                        {value.id === 'passion' && <Heart className="w-10 h-10" />}
                                        {value.id === 'teamwork' && <Users className="w-10 h-10" />}
                                        {value.id === 'innovation' && <Star className="w-10 h-10" />}
                                    </div>

                                    <h4 className={`value-title ${value.color === 'cyan' ? 'text-cyan-600' : 'text-blue-600'}`}>
                                        {value.title}
                                    </h4>

                                    <div className={`value-divider ${value.color === 'cyan' ? 'bg-cyan-500' : 'bg-blue-600'}`} />

                                    <p className="value-desc">
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'process':
                return (
                    <div className="max-w-4xl mx-auto">
                        <div className="section-header-lg">
                            <h3 className="section-title-md mb-4">채용절차</h3>
                            <p className="text-body">소프트원은 인터넷 접수를 통한 수시채용을 원칙으로 하고 있습니다.</p>
                        </div>

                        <div className="spacing-lg relative">
                            {/* Connecting Line */}
                            <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-slate-200 hidden md:block" />

                            {data.process.map((step, index) => (
                                <div key={index} className="process-step group">
                                    {/* Step Circle */}
                                    <div className="flex-shrink-0 relative z-10">
                                        <div className="process-step-circle">
                                            <span className="process-step-label">STEP</span>
                                            <span className="process-step-number">{step.step}</span>
                                        </div>
                                    </div>

                                    {/* Content Card */}
                                    <div className="process-step-content">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <h4 className="text-xl font-bold text-slate-900 whitespace-nowrap">
                                                {step.title}
                                            </h4>
                                            <div className="h-px w-full bg-slate-100 md:hidden" />
                                            <div className="flex-grow md:border-l md:border-slate-100 md:pl-8">
                                                <ul className="space-y-2">
                                                    {step.desc.map((line, lineIndex) => (
                                                        <li key={lineIndex} className="text-body text-sm">
                                                            {line}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'benefits':
                return (
                    <div className="spacing-xl">
                        {/* Personnel System Section */}
                        <div className="text-center">
                            <h3 className="section-title mb-16">{data.benefits.personnel.title}</h3>

                            <div className="relative max-w-4xl mx-auto">
                                {/* Central Circle - Desktop Only */}
                                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary rounded-full items-center justify-center z-10 shadow-xl border-8 border-white">
                                    <div className="text-white text-center">
                                        <p className="text-lg font-medium opacity-90 mb-1">The Best</p>
                                        <h4 className="text-2xl font-bold">인재육성</h4>
                                    </div>
                                </div>

                                {/* Grid for Items */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-32">
                                    {data.benefits.personnel.items.map((item, index) => (
                                        <div key={item.id} className={`
                      bg-box-lg flex flex-col items-center text-center transition-all hover:shadow-md
                      ${index === 0 ? 'lg:items-end lg:text-right lg:pr-16' : ''}
                      ${index === 1 ? 'lg:items-start lg:text-left lg:pl-16' : ''}
                      ${index === 2 ? 'lg:items-end lg:text-right lg:pr-16' : ''}
                      ${index === 3 ? 'lg:items-start lg:text-left lg:pl-16' : ''}
                    `}>
                                            <div className="icon-box-lg-white mb-4">
                                                {item.icon === 'chart' && <BarChart3 className="w-8 h-8" />}
                                                {item.icon === 'clipboard' && <ClipboardCheck className="w-8 h-8" />}
                                                {item.icon === 'file' && <FileText className="w-8 h-8" />}
                                                {item.icon === 'users' && <Users className="w-8 h-8" />}
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                            <p className="text-body-pre">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Welfare Benefits Section */}
                        <div className="text-center">
                            <h3 className="section-title mb-16">{data.benefits.welfare.title}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 max-w-4xl mx-auto">
                                {data.benefits.welfare.items.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center group">
                                        <div className="icon-box-hover mb-4">
                                            {item.icon === 'heart' && <Heart className="w-10 h-10" />}
                                            {item.icon === 'sun' && <Sun className="w-10 h-10" />}
                                            {item.icon === 'trophy' && <Trophy className="w-10 h-10" />}
                                            {item.icon === 'gift' && <Gift className="w-10 h-10" />}
                                            {item.icon === 'coins' && <Coins className="w-10 h-10" />}
                                            {item.icon === 'users' && <Users className="w-10 h-10" />}
                                            {item.icon === 'baby' && <Baby className="w-10 h-10" />}
                                            {item.icon === 'book' && <BookOpen className="w-10 h-10" />}
                                            {item.icon === 'award' && <Award className="w-10 h-10" />}
                                        </div>
                                        <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'jobs':
                return (
                    <div className="max-w-5xl mx-auto">
                        <div className="section-header-lg">
                            <div className="w-10 h-1 bg-primary mx-auto mb-6" />
                            <h3 className="section-title">{data.jobs.title}</h3>
                        </div>

                        <div className="table-container">
                            {data.jobs.sections.map((section, index) => (
                                <div key={index} className="table-row">
                                    <div className="table-header">
                                        {section.title}
                                    </div>
                                    <div className="table-content">
                                        {section.type === 'table' ? (
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm text-left">
                                                    <tbody className="divide-y divide-slate-100">
                                                        {(section.content as any[]).map((row, rowIndex) => (
                                                            <tr key={rowIndex} className="hover:bg-slate-50">
                                                                <td className="py-3 pr-4 font-medium text-slate-900 w-1/4">{row.category}</td>
                                                                <td className="py-3 px-4 text-slate-600 w-1/2">{row.desc}</td>
                                                                <td className="py-3 pl-4 text-slate-500 text-right w-1/4">{row.exp}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="text-slate-700 font-medium">
                                                {section.content as string}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <button className="btn-primary">
                                경력기술서 다운로드
                            </button>
                        </div>
                    </div>
                );
            default:
                return <div>준비 중입니다.</div>;
        }
    };

    return (
        <SubLayout title="Recruit" activeTab={tab} sectionId="recruit">
            <div className="content-box">
                {renderContent()}
            </div>
        </SubLayout>
    );
}
