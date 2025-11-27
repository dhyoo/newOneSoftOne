import { motion } from 'framer-motion';

interface CompanyIntroProps {
    imageUrl?: string;
    title?: string;
    description?: string;
}

export function CompanyIntro({ 
    imageUrl, 
    title = "신뢰와 혁신으로 함께 성장하는 IT 파트너",
    description = "소프트원은 20년 이상의 경험과 전문성을 바탕으로 고객의 디지털 전환을 선도합니다."
}: CompanyIntroProps) {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* 배경 이미지 */}
            {imageUrl ? (
                <div 
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-900/80" />
                </div>
            ) : (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-secondary to-primary/80" />
            )}

            {/* 컨텐츠 */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-heading-3xl-white-pre mb-6"
                    >
                        {title}
                    </motion.h2>
                    
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/90 leading-relaxed mb-8"
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-6 text-white/80"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <span className="text-sm md:text-base">20년 이상의 경험</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <span className="text-sm md:text-base">다양한 산업 분야 전문성</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <span className="text-sm md:text-base">고객 중심 서비스</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}



