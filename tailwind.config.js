import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "src/**/*.{htm,html,ts}",
        "index.html",
    ],
    theme: {
        container: {
            center: true,
            screens: {
                tablet: '768px',
                laptop: '1024px',
                desktop: '1280px',
            },
            padding: {
                DEFAULT: '1rem',
            },
        },
        fontSize: {
            "body-1": ["18px"],
            "body-2": ["16px"],
            "body-3": ["14px"],
        },
        fontFamily: {
            "primary": ['JetBrainsMono'],
        },
        colors: {
            white: "#ffffff",

            primary: "#5599FF",
            success: "#1BCD54",
            fail: "#D21545",

            dark: "#27282b",
            gray: "#5B5B5B",
            light: "#E0E0E0",
        },
        screens: {
            'phone': '320px',
            'phone2': '360px',
            'phone3': '480px',
            'small': '640px',
            'tablet': '768px',
            'tablet2': '800px',
            'laptop': '1024px',
            'desktop': '1280px',
        },
        extend: {
            keyframes: {
                SlideTop: {
                    '0%': { opacity: '0', transform: 'translateY(32px)' },
                },
                FadeIn: {
                    '0%': { opacity: '0' },
                },
                Leviatation: {
                    '0%': { transform: 'translateY(0px) rotate(5deg)' },
                    '50%': { transform: 'translateY(16px) rotate(-5deg)' },
                    '100%': { transform: 'translateY(0px) rotate(5deg)' }
                }
            },
            animation: {
                fadein: 'FadeIn 1.2s 0.1s ease-in-out backwards',
                leviatation: 'Leviatation 5s ease-in-out infinite alternate',
                slidetop: 'SlideTop 0.6s ease backwards'
            },
        },
    },
    plugins: [],
}

