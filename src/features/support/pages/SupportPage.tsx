import { SubLayout } from '../../../shared/ui/SubLayout';
import { SUPPORT_MOCK_DATA } from '../utils/mockData';
import { Mail, Phone } from 'lucide-react';

interface SupportPageProps {
    tab: string;
}

export default function SupportPage({ tab }: SupportPageProps) {
    const data = SUPPORT_MOCK_DATA;

    const renderContent = () => {
        switch (tab) {
            case 'notice':
                return (
                    <div className="spacing-sm">
                        {data.notice.map((item) => (
                            <div key={item.id} className="list-item">
                                <span className="list-item-title">{item.title}</span>
                                <span className="list-item-meta">{item.date}</span>
                            </div>
                        ))}
                    </div>
                );
            case 'contact':
                return (
                    <div className="max-w-2xl mx-auto text-center spacing-lg py-12">
                        <div>
                            <h3 className="section-title mb-4">{data.contact.title}</h3>
                            <p className="text-body-lg">{data.contact.desc}</p>
                        </div>
                        <div className="grid-responsive-2">
                            <div className="contact-card">
                                <Mail className="contact-card-icon" />
                                <h4 className="contact-card-title">Email</h4>
                                <p className="contact-card-text">{data.contact.email}</p>
                            </div>
                            <div className="contact-card">
                                <Phone className="contact-card-icon" style={{ color: 'var(--color-secondary)' }} />
                                <h4 className="contact-card-title">Phone</h4>
                                <p className="contact-card-text">{data.contact.phone}</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>준비 중입니다.</div>;
        }
    };

    return (
        <SubLayout title="Support" activeTab={tab} sectionId="support">
            <div className="content-box">
                {renderContent()}
            </div>
        </SubLayout>
    );
}
