import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
    id: number;
    image?: string;
    title: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
}

const slides: Slide[] = [
    {
        id: 1,
        image: "/assets/hero/slide1.png",
        title: "IT SOLUTION PROVIDER",
        subtitle: "고객의 가치를 최우선으로",
        description: "생각하는 소프트원",
    },
    {
        id: 2,
        image: "/assets/hero/slide2.png",
        title: "Digital Transformation Partner",
        subtitle: "신뢰와 혁신으로 함께 성장하는",
        description: "IT 파트너, SoftOne",
    },
    {
        id: 3,
        image: "/assets/hero/slide3.png",
        title: "최적의 IT 솔루션 제공",
        subtitle: "20년 이상의 경험과 전문성으로",
        description: "고객의 성공을 지원합니다",
    },
];

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // 자동 슬라이드
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // 5초마다 자동 전환

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // 10초 후 다시 자동 재생
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToPrevious = () => {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        goToSlide((currentSlide + 1) % slides.length);
    };

    const currentSlideData = slides[currentSlide];

    return (
        <div className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
            {/* 슬라이드 컨테이너 */}
            <div className="relative w-full h-full">
                <AnimatePresence>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        {/* 배경 이미지 또는 그라데이션 */}
                        {currentSlideData.image ? (
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${currentSlideData.image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70" />
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-white">
                                {/* 배경 패턴 - 부드러운 구름 효과 */}
                                <div className="absolute inset-0 opacity-40">
                                    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-100 blur-[100px] mix-blend-multiply animate-blob" />
                                    <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-sky-100 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
                                    <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-50 blur-[100px] mix-blend-multiply animate-blob animation-delay-4000" />
                                    <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-sky-50 blur-[80px] mix-blend-multiply animate-blob animation-delay-6000" />
                                </div>
                            </div>
                        )}

                        {/* 컨텐츠 */}
                        <div className="relative z-10 h-full flex items-center">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                <div className="max-w-3xl">
                                    {/* 작은 파란색 라인 */}
                                    <div className="w-12 h-0.5 bg-primary mb-6" />

                                    {/* 타이틀 */}
                                    <motion.h1
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                                    >
                                        {currentSlideData.title}
                                    </motion.h1>

                                    {/* 서브타이틀 */}
                                    {currentSlideData.subtitle && (
                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3, duration: 0.6 }}
                                            className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-100 mb-2 leading-tight"
                                        >
                                            {currentSlideData.subtitle}
                                        </motion.p>
                                    )}

                                    {/* 설명 */}
                                    {currentSlideData.description && (
                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                            className="text-lg md:text-xl text-slate-200 mb-8"
                                        >
                                            {currentSlideData.description}
                                        </motion.p>
                                    )}

                                    {/* 버튼 */}
                                    {currentSlideData.buttonText && currentSlideData.buttonLink && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5, duration: 0.6 }}
                                        >
                                            <Link
                                                to={currentSlideData.buttonLink}
                                                className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary/90 transition-all"
                                            >
                                                {currentSlideData.buttonText}
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 네비게이션 컨트롤 */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
                {/* 이전 버튼 */}
                <button
                    onClick={goToPrevious}
                    className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/50 flex items-center justify-center text-slate-700 hover:bg-white/80 hover:border-slate-300 transition-all shadow-sm"
                    aria-label="이전 슬라이드"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* 슬라이드 번호 */}
                <div className="text-slate-700 text-sm font-medium px-4 bg-white/40 backdrop-blur-sm rounded-full py-1.5 px-3 border border-slate-200/50">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>

                {/* 다음 버튼 */}
                <button
                    onClick={goToNext}
                    className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/50 flex items-center justify-center text-slate-700 hover:bg-white/80 hover:border-slate-300 transition-all shadow-sm"
                    aria-label="다음 슬라이드"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* 인디케이터 */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 rounded-full transition-all ${index === currentSlide
                            ? 'w-8 bg-primary'
                            : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                            }`}
                        aria-label={`슬라이드 ${index + 1}로 이동`}
                    />
                ))}
            </div>
        </div>
    );
}
