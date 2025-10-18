import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'signature-ink': '#1C1C1C',
        'whisper-grey': '#C7C7C7',
        'light-grey': '#2A2A2A',
        'archive-sepia': '#8B7355',
        'gallery-white': '#F9F9F9',
      },
      fontFamily: {
        'serif': ['GaramondPremierPro', 'serif'],
        'sans': ['SuisseBPIntl', 'sans-serif'],
      },
      letterSpacing: {
        'tight': '-0.02em',
        'wide': '0.1em',
        'wider': '0.15em',
        'widest': '0.2em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
