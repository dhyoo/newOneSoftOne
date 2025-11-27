// Business feature의 mock data
import type { BusinessData } from '../types';

export const BUSINESS_MOCK_DATA: BusinessData = {
    si: {
        title: "SI/SM 사업",
        description: "고객의 비즈니스 환경에 최적화된 시스템을 구축하고 안정적인 운영을 지원합니다.",
        features: [
            "공공/금융/제조 분야 대형 프로젝트 수행 경험",
            "최신 기술 트렌드를 반영한 아키텍처 설계",
            "체계적인 프로젝트 관리 방법론 적용",
            "고품질 산출물 및 철저한 테스트 수행"
        ]
    },
    solution: {
        title: "솔루션 사업",
        description: "자체 개발 솔루션과 검증된 파트너 솔루션을 통해 고객의 업무 효율성을 극대화합니다.",
        products: [
            { name: "Soft-ERP", desc: "중소/중견기업 맞춤형 ERP 솔루션" },
            { name: "Soft-Groupware", desc: "스마트한 협업을 위한 그룹웨어" },
            { name: "Soft-Security", desc: "통합 보안 관제 솔루션" }
        ]
    },
    ito: {
        title: "ITO/아웃소싱",
        description: "전문 인력과 선진화된 관리 체계를 통해 고객의 IT 자산을 효율적으로 운영/관리합니다.",
        benefits: ["운영 비용 절감", "서비스 품질 향상", "핵심 역량 집중", "리스크 관리 강화"]
    },
    rnd: {
        title: "R&D 센터",
        description: "미래 성장 동력 확보를 위해 AI, 빅데이터, 클라우드 등 신기술을 끊임없이 연구합니다.",
        areas: ["Artificial Intelligence", "Big Data Analytics", "Cloud Native", "Blockchain"]
    }
};

