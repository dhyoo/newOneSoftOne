// Portfolio feature 타입 정의
export interface PortfolioData {
    projects: Array<{
        id: number;
        title: string;
        client: string;
        period: string;
        tags: string[];
    }>;
    clients: string[];
}

