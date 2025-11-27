// Recruit feature 타입 정의
export interface RecruitData {
    culture: {
        title: string;
        subtitle: string;
        desc: string;
        values: Array<{
            id: string;
            title: string;
            desc: string;
            color: 'cyan' | 'blue';
        }>;
    };
    process: Array<{
        step: number;
        title: string;
        desc: string[];
    }>;
    benefits: {
        personnel: {
            title: string;
            core: string;
            items: Array<{
                id: string;
                title: string;
                desc: string;
                icon: string;
            }>;
        };
        welfare: {
            title: string;
            items: Array<{
                label: string;
                icon: string;
            }>;
        };
    };
    jobs: {
        title: string;
        sections: Array<{
            title: string;
            type: 'table' | 'text';
            content: any;
        }>;
    };
}

