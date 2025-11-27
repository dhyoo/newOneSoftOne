import { SubLayout } from '../../../shared/ui/SubLayout';
import { BUSINESS_MOCK_DATA } from '../utils/mockData';
import { CheckCircle2 } from 'lucide-react';

interface BusinessPageProps {
    tab: string;
}

export default function BusinessPage({ tab }: BusinessPageProps) {
    const data = BUSINESS_MOCK_DATA;

    const renderContent = () => {
        switch (tab) {
            case 'si':
                return (
                    <div className="spacing-md">
                        <div>
                            <h3 className="text-title-md mb-4">{data.si.title}</h3>
                            <p className="text-body-lg">{data.si.description}</p>
                        </div>
                        <div className="grid-responsive-2">
                            {data.si.features.map((feature, index) => (
                                <div key={index} className="checklist-item">
                                    <CheckCircle2 className="checklist-item-icon" />
                                    <span className="checklist-item-text">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'solution':
                return (
                    <div className="spacing-md">
                        <div>
                            <h3 className="text-title-md mb-4">{data.solution.title}</h3>
                            <p className="text-body-lg">{data.solution.description}</p>
                        </div>
                        <div className="grid-responsive-3">
                            {data.solution.products.map((product, index) => (
                                <div key={index} className="card card-padding">
                                    <h4 className="text-xl font-bold text-primary mb-2">{product.name}</h4>
                                    <p className="text-body">{product.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'ito':
                return (
                    <div className="spacing-md">
                        <div>
                            <h3 className="text-title-md mb-4">{data.ito.title}</h3>
                            <p className="text-body-lg">{data.ito.description}</p>
                        </div>
                        <div className="bg-box-blue">
                            <h4 className="text-lg font-bold text-slate-900 mb-6">기대 효과</h4>
                            <div className="grid-responsive-2">
                                {data.ito.benefits.map((benefit, index) => (
                                    <div key={index} className="bg-box-item">
                                        <div className="w-2 h-2 rounded-full bg-secondary mr-3 flex-shrink-0" />
                                        <span className="text-slate-700 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'rnd':
                return (
                    <div className="spacing-md">
                        <div>
                            <h3 className="text-title-md mb-4">{data.rnd.title}</h3>
                            <p className="text-body-lg">{data.rnd.description}</p>
                        </div>
                        <div className="grid-responsive-4">
                            {data.rnd.areas.map((area, index) => (
                                <div key={index} className="aspect-square flex items-center justify-center bg-slate-900 rounded-2xl p-6 text-center group hover:bg-primary transition-colors">
                                    <span className="text-xl font-bold text-white group-hover:scale-110 transition-transform">{area}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return <div>준비 중입니다.</div>;
        }
    };

    return (
        <SubLayout title="Business" activeTab={tab} sectionId="business">
            <div className="content-box">
                {renderContent()}
            </div>
        </SubLayout>
    );
}
