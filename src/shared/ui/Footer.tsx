import { ArrowUp } from 'lucide-react';
import logoCi from '../../features/company/assets/logo_ci.png';

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#1a1a1a] text-gray-400 py-12 relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                {/* Logo Area */}
                <div className="mb-4 md:mb-0">
                    <img 
                        src={logoCi} 
                        alt="SoftOne" 
                        className="h-8 md:h-10 object-contain brightness-0 invert"
                    />
                </div>

                {/* Address Info */}
                <div className="flex-1 text-xs leading-relaxed space-y-1">
                    <p>
                        <span className="font-bold text-gray-300 mr-2">서울본사 :</span>
                        서울특별시 강서구 양천로 583, B동 901호(염창동, 우림블루나인)
                        <span className="ml-4">TEL: 02-2093-2050</span>
                    </p>
                    <p>
                        <span className="font-bold text-gray-300 mr-2">창원지사 :</span>
                        경상남도 창원시 의창구 평산로 33, 14층 1406, 1407호(팔용동, 신화더플렉스시티)
                        <span className="ml-4">TEL: 055-295-0093</span>
                    </p>
                    <p>
                        <span className="font-bold text-gray-300 mr-2">중부사무소 :</span>
                        경상북도 경북 구미시 3공단1로 302-7, 지원동 605호
                        <span className="ml-4">TEL: 054-473-7035</span>
                    </p>
                    <p className="pt-4 text-gray-500 font-medium">
                        COPYRIGHT(C) 2020 SOFTONE CO., LTD. ALL RIGHTS RESERVED.
                    </p>
                </div>

                {/* Scroll to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="absolute right-6 bottom-12 md:static w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-lg"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            </div>
        </footer>
    );
}
