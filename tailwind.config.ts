import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0C10',
          900: '#0A0C10',
          800: '#11151C',
          700: '#1A2029',
          600: '#262E3A',
        },
        stark: {
          DEFAULT: '#F5F7FA',
          dim: '#B8C0CC',
        },
        crimson: {
          DEFAULT: '#E62429',
          dark: '#B01A1E',
          light: '#FF4D52',
        },
        vibranium: {
          DEFAULT: '#00E5FF',
          dark: '#00A9BD',
        },
        gold: {
          DEFAULT: '#FFC629',
          dark: '#D9A200',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        comic: ['Bangers', 'Impact', 'cursive'],
        cond: ['Oswald', '"Arial Narrow"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        'comic-sm': '8px',
        'comic': '14px',
        'comic-lg': '22px',
        'comic-xl': '30px',
      },
      boxShadow: {
        'comic-sm': '3px 3px 0 0 #000',
        comic: '5px 5px 0 0 #000',
        'comic-lg': '8px 8px 0 0 #000',
        'comic-red': '5px 5px 0 0 #E62429',
        'comic-gold': '5px 5px 0 0 #FFC629',
        'comic-cyan': '5px 5px 0 0 #00E5FF',
        'glow-red':
          '0 0 0 2px #000, 0 0 24px 4px rgba(230,36,41,.65)',
        'glow-gold':
          '0 0 0 2px #000, 0 0 24px 4px rgba(255,198,41,.6)',
      },
      borderWidth: {
        '3': '3px',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 0 2px #000, 0 0 24px 4px rgba(230,36,41,.65)',
          },
          '50%': {
            boxShadow: '0 0 0 2px #000, 0 0 24px 4px rgba(255,198,41,.6)',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.9)' },
          '70%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glitch: {
          '0%, 100%': { transform: 'translateX(0)' },
          '33%': { transform: 'translateX(2px)' },
          '66%': { transform: 'translateX(-2px)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 1.8s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'pop-in': 'pop-in 220ms ease-out forwards',
        'slide-down': 'slide-down 160ms ease-out forwards',
        glitch: 'glitch 300ms steps(2) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
