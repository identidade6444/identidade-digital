import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-cyan': '#00FCFF',
        'primary-blue': '#0138EB',
        'accent-orange': '#FF6200',
        'accent-yellow': '#FFED00',
        'neutral-white': '#FFFFFF',
        'neutral-dark': '#0F172A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #00FCFF 0%, #0138EB 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config
