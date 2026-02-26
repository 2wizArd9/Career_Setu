/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#3B82F6',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'border-light': '#E5E7EB',
        'success': '#10B981',
        'warning': '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['2.25rem', { lineHeight: '2.5rem' }],
        'heading-2': ['1.875rem', { lineHeight: '2.25rem' }],
        'heading-3': ['1.5rem', { lineHeight: '2rem' }],
        'body-large': ['1.125rem', { lineHeight: '1.75rem' }],
        'body': ['1rem', { lineHeight: '1.5rem' }],
        'body-small': ['0.875rem', { lineHeight: '1.25rem' }],
      },
      maxWidth: {
        'container': '1200px',
      },
      backgroundImage: {
        'cta-gradient': "radial-gradient(circle at 30% 30%, #ffccf9 0%, transparent 40%), radial-gradient(circle at 75% 10%, #c9f5ff 0%, transparent 35%), radial-gradient(circle at 5% 100%, #f8d4f5 0%, transparent 30%)",
      },
    },
  },
  plugins: [],
}