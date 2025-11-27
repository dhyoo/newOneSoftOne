import { SubLayout } from '../../../shared/ui/SubLayout';
import { PORTFOLIO_MOCK_DATA } from '../utils/mockData';

interface PortfolioPageProps {
    tab: string;
}

export default function PortfolioPage({ tab }: PortfolioPageProps) {
    const data = PORTFOLIO_MOCK_DATA;

    const renderContent = () => {
        switch (tab) {
            case 'list':
                return (
                    <div className="grid-responsive-2">
                        {data.projects.map((project) => (
                            <div key={project.id} className="group card-lg overflow-hidden">
                                <div className="h-48 bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                    <span className="text-slate-400 font-medium group-hover:text-primary">Project Image</span>
                                </div>
                                <div className="card-padding-lg">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, index) => (
                                            <span key={index} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                    <div className="flex justify-between text-sm text-slate-500">
                                        <span>{project.client}</span>
                                        <span>{project.period}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'clients':
                return (
                    <div className="grid-responsive-4">
                        {data.clients.map((client, index) => (
                            <div key={index} className="aspect-[3/2] flex items-center justify-center card card-padding hover:border-primary">
                                <span className="font-bold text-slate-700 text-lg">{client}</span>
                            </div>
                        ))}
                    </div>
                );
            default:
                return <div>준비 중입니다.</div>;
        }
    };

    return (
        <SubLayout title="Portfolio" activeTab={tab} sectionId="portfolio">
            <div className="content-box">
                {renderContent()}
            </div>
        </SubLayout>
    );
}
