// Portfolio feature의 mock data
import type { PortfolioData } from '../types';

export const PORTFOLIO_MOCK_DATA: PortfolioData = {
    projects: [
        { id: 1, title: "A생명 차세대 시스템 구축", client: "A생명", period: "2023.01 - 2024.06", tags: ["Finance", "SI", "Java"] },
        { id: 2, title: "B공사 통합정보시스템 고도화", client: "B공사", period: "2023.03 - 2023.12", tags: ["Public", "SI", "Cloud"] },
        { id: 3, title: "C그룹 그룹웨어 리뉴얼", client: "C그룹", period: "2022.06 - 2022.12", tags: ["Enterprise", "Solution", "Mobile"] },
        { id: 4, title: "D카드 마이데이터 플랫폼 구축", client: "D카드", period: "2022.01 - 2022.10", tags: ["Finance", "Big Data", "API"] },
    ],
    clients: ["삼성전자", "현대자동차", "SK텔레콤", "LG화학", "국민은행", "신한은행", "한국전력공사", "국민건강보험공단"]
};

