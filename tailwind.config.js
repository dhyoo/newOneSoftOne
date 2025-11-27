/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // 브랜드 색상 - CI 가이드 기준
                brand: {
                    'sky-blue': '#1C94D2',
                    'blue': '#0A67B2',
                    'purple': '#31347F',
                    'gray': '#414042',
                },
                // Primary/Secondary (기존 호환성 유지)
                primary: '#0A67B2', // SoftOne Blue
                secondary: '#1C94D2', // SoftOne Sky Blue
            },
            fontFamily: {
                sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
            },
            spacing: {
                'section': '6rem', // 96px
                'section-sm': '3rem', // 48px
                'section-lg': '8rem', // 128px
            },
            borderRadius: {
                'softone': '1rem', // 16px
                'softone-lg': '1.5rem', // 24px
            },
            boxShadow: {
                'softone': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'softone-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
            transitionDuration: {
                'fast': '150ms',
                'base': '300ms',
                'slow': '500ms',
            },
        },
    },
    plugins: [],
}
