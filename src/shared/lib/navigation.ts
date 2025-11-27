export const NAVIGATION = [
    {
        id: 'company',
        label: 'Company',
        path: '/company',
        children: [
            { id: 'about', label: 'SOFTONE 소개', path: '/company/about' },
            { id: 'ceo', label: 'CEO 인사말', path: '/company/ceo' },
            { id: 'organization', label: '조직도', path: '/company/organization' },
            { id: 'history', label: '연혁', path: '/company/history' },
            { id: 'ci', label: 'CI소개', path: '/company/ci' },
            { id: 'partner', label: '파트너', path: '/company/partner' },
            { id: 'location', label: '찾아오는 길', path: '/company/location' },
        ],
    },
    {
        id: 'business',
        label: 'Business',
        path: '/business',
        children: [
            { id: 'si', label: 'SI/SM 사업', path: '/business/si' },
            { id: 'solution', label: '솔루션 사업', path: '/business/solution' },
            { id: 'ito', label: 'ITO/아웃소싱', path: '/business/ito' },
            { id: 'rnd', label: 'R&D 센터', path: '/business/rnd' },
        ],
    },
    {
        id: 'portfolio',
        label: 'Portfolio',
        path: '/portfolio',
        children: [
            { id: 'list', label: '구축사례', path: '/portfolio/list' },
            { id: 'clients', label: '주요 고객사', path: '/portfolio/clients' },
        ],
    },
    {
        id: 'recruit',
        label: 'Recruit',
        path: '/recruit',
        children: [
            { id: 'culture', label: '인재상', path: '/recruit/culture' },
            { id: 'process', label: '채용절차', path: '/recruit/process' },
            { id: 'benefits', label: '인사제도/복리후생', path: '/recruit/benefits' },
            { id: 'jobs', label: '채용공고', path: '/recruit/jobs' },
        ],
    },
    {
        id: 'support',
        label: 'Support',
        path: '/support',
        children: [
            { id: 'notice', label: '공지사항', path: '/support/notice' },
            { id: 'contact', label: '문의하기', path: '/support/contact' },
        ],
    },
] as const;
