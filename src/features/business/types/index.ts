// Business feature 타입 정의
export interface BusinessData {
    si: {
        title: string;
        description: string;
        features: string[];
    };
    solution: {
        title: string;
        description: string;
        products: Array<{
            name: string;
            desc: string;
        }>;
    };
    ito: {
        title: string;
        description: string;
        benefits: string[];
    };
    rnd: {
        title: string;
        description: string;
        areas: string[];
    };
}

