// Recruit feature의 mock data
import type { RecruitData } from '../types';

export const RECRUIT_MOCK_DATA: RecruitData = {
    culture: {
        title: "소프트원 인재상",
        subtitle: "회사의 핵심가치와 역량을 내재화하고 개인과 IT산업발전에 기여하는 가치를 실현하는 강한 인재",
        desc: "소프트원과 함께 하는 순간 미래의 가능성을 갖춘 인재임을 스스로 증명하는 것입니다.\n임직원들의 성장과 자기계발을 통해 새로운 가치와 혁신의 기회를 찾아보시기 바랍니다.",
        values: [
            {
                id: "humanity",
                title: "Humanity",
                desc: "원만한 대인관계와 신뢰에 기반한 관계 구축 및 유지가 가능한 인재",
                color: "cyan"
            },
            {
                id: "passion",
                title: "Passion",
                desc: "적극적이며 능동적으로 일을 즐길 줄 아는 프로정신을 가진 인재",
                color: "blue"
            },
            {
                id: "teamwork",
                title: "Team Work",
                desc: "조직에 활기를 불어넣고 팀의 능력을 극대화 할 수 있는 인재",
                color: "cyan"
            },
            {
                id: "innovation",
                title: "Innovation",
                desc: "변화에 유연하고 혁신을 창조하는 인재",
                color: "blue"
            },
        ]
    },
    process: [
        { step: 1, title: "채용공고 및 입사지원서 작성", desc: ["채용공고 화면에서 입사지원서 다운로드", "ksw@softone.co.kr으로 메일송부", "(상시지원 가능)"] },
        { step: 2, title: "서류전형", desc: ["입사지원서를 토대로 검토 후 면접대상자에게만", "서류합격을 개인 메일로 통보", "(마감 후 최대 1주일 소요)"] },
        { step: 3, title: "1차 실무면접 / 2차 임원면접", desc: ["1. 개인별 면접(1시간 이내)", "2. 면접 장소는 본사 사무실에서 진행", "3. 근무시작 가능시기, 희망연봉 및 커리어패스등 협의"] },
        { step: 4, title: "합격자 통보 및 입문교육 실시", desc: ["1. 면접 전형 결과 통보", "2. 합격여부를 영업일 기준 3일 이내 개인별로 통보", "3. 합격자일 경우 입사 필요서류는 메일로 송부"] },
        { step: 5, title: "수습기간 적용 후 최종입사 확정", desc: ["1. 실제 근무 시작일 전에 근로/연봉계약서 작성", "2. 입사서류 검토", "3. 회사 소개 및 오리엔테이션", "4. 개인별 필요장비(노트북, 사무기기 등) 지급"] },
    ],
    benefits: {
        personnel: {
            title: "인사제도",
            core: "The Best 인재육성",
            items: [
                { id: "performance", title: "성과 능력주의", desc: "성과와 보유능력에 대한\n적절한 보상과 승진 보상", icon: "chart" },
                { id: "fairness", title: "공정/객관적 제도운영", desc: "평가의 공정성과 객관성을\n최대한 확보", icon: "clipboard" },
                { id: "job", title: "직무중심", desc: "직무중심 경력개발 경로를\n설정해주고 가치를 부여", icon: "file" },
                { id: "leader", title: "리더중심", desc: "팀단위 조직을 강화하여\n자율적, 창의적인 조직구성", icon: "users" }
            ]
        },
        welfare: {
            title: "복리후생제도",
            items: [
                { label: "종합건강검진", icon: "heart" },
                { label: "근속휴가", icon: "sun" },
                { label: "인센티브", icon: "trophy" },
                { label: "명절선물", icon: "gift" },
                { label: "경조사비 지원", icon: "coins" },
                { label: "팀별 회식비 지원", icon: "users" },
                { label: "출산기념품", icon: "baby" },
                { label: "실무 및 전문교육 지원", icon: "book" },
                { label: "자격증 취득 지원", icon: "award" }
            ]
        }
    },
    jobs: {
        title: "수시 채용안내",
        sections: [
            {
                title: "모집부문",
                type: "table",
                content: [
                    { category: "Web", desc: "Oracle, JSP, JAVA, WebLogic, Gauce, LAF/J 등", exp: "3년이상" },
                    { category: "Power Builder", desc: "2·3Tier, Oracle 및 미들웨어(Tmax, Tuxedo 등)", exp: "3년이상" },
                    { category: "JSP-Power Bilder", desc: "Oracle, MS SQL", exp: "3년이상" },
                    { category: "ERP/ABAP", desc: "SAP, R/3 ABAP 사용자", exp: "3년이상" },
                    { category: "ASP/.NET", desc: "ASP, .NET(&Report Tool) 사용 경험자", exp: "3년이상" },
                    { category: "DW", desc: "Oracle, Sybase, TeraDB, InfoMax, bTeq, Business Ob", exp: "3년이상" },
                    { category: "Oracle ERP", desc: "Developer 2000, Forms Report, PL/SQL", exp: "3년이상" },
                    { category: "C, C++, C#, Pro-C, Android", desc: "Unix, Interface, Oracle 경험자", exp: "3년이상" },
                ]
            },
            {
                title: "전형방법",
                type: "text",
                content: "채용절차에 준하는 방법"
            },
            {
                title: "접수방법",
                type: "text",
                content: "본사 기술 양식을 다운로드 후 메일로 발송"
            },
            {
                title: "인사담당",
                type: "text",
                content: "ksw@softone.co.kr"
            },
            {
                title: "채용시기",
                type: "text",
                content: "정기/상시 모집"
            }
        ]
    }
};

