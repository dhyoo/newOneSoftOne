import { Code2, Database, Layout, Server } from 'lucide-react';
import { Hero } from '../components/Hero';
import { CompanyIntro } from '../components/CompanyIntro';
import { ServiceCard } from '../../business/components/ServiceCard';
import { Footer } from '../../../shared/ui/Footer';

export default function HomePage() {
    return (
        <div className="flex flex-col">
            <Hero />

            <main>
                {/* 회사 소개 이미지 섹션 */}
                <CompanyIntro />

                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="section-header-centered">
                            <h2 className="section-title">
                                Our Business Areas
                            </h2>
                            <p className="mt-4 text-body-lg">
                                소프트원은 다양한 산업 분야에서 축적된 경험과 기술력을 바탕으로
                                최상의 IT 서비스를 제공합니다.
                            </p>
                        </div>

                        <div className="grid-responsive">
                            <ServiceCard
                                title="SI/SM 사업"
                                description="공공, 금융, 제조 등 다양한 분야의 시스템 통합 및 운영 유지보수 서비스를 제공합니다."
                                icon={Database}
                                to="/business/si"
                            />
                            <ServiceCard
                                title="솔루션 사업"
                                description="자체 개발 솔루션과 검증된 파트너 솔루션을 통해 고객의 업무 효율성을 높입니다."
                                icon={Code2}
                                to="/business/solution"
                            />
                            <ServiceCard
                                title="ITO/아웃소싱"
                                description="전문 인력과 체계적인 관리 프로세스로 안정적인 IT 인프라 운영을 지원합니다."
                                icon={Server}
                                to="/business/ito"
                            />
                            <ServiceCard
                                title="R&D 센터"
                                description="AI, 빅데이터, 클라우드 등 신기술 연구개발을 통해 미래 성장 동력을 확보합니다."
                                icon={Layout}
                                to="/business/rnd"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
