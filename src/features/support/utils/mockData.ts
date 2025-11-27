// Support feature의 mock data
import type { SupportData } from '../types';

export const SUPPORT_MOCK_DATA: SupportData = {
    notice: [
        { id: 1, title: "2024년 신입사원 공개채용 안내", date: "2024-11-01" },
        { id: 2, title: "본사 사무실 이전 안내", date: "2024-10-15" },
        { id: 3, title: "개인정보처리방침 변경 안내", date: "2024-09-01" },
    ],
    contact: {
        title: "문의하기",
        desc: "궁금하신 점을 남겨주시면 빠르고 친절하게 답변 드리겠습니다.",
        email: "contact@softone.co.kr",
        phone: "02-1234-5678"
    }
};

