// Support feature 타입 정의
export interface SupportData {
    notice: Array<{
        id: number;
        title: string;
        date: string;
    }>;
    contact: {
        title: string;
        desc: string;
        email: string;
        phone: string;
    };
}

