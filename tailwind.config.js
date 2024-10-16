/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: ['./src/**/*.{js,jsx,ts,tsx,vue}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#DE4F3F',
        'primary-dark': '#D63827',
        'primary-light': '#F24F3F',
        'primary-disabled': '#FFA69C',
        'primary-1': '#FF6130',
        'primary-2': '#FD403A',
        neutral: '#31353B',
        'neutral-desc': '#5C5C5C',
        'neutral-subtle': '#C0C0C9',
        'neutral-disabled': '#C3C4C7',
        'neutral-1': '#4C4E64',
        'neutral-2': '#73767A',
        'border-stroke': '#C3C4C7',
        danger: '#FF3B3B',
        warning: '#FFCC00',
        info: '#0063F7',
        success: '#06C270',
        'success-2': '#03AB6F',
        dark: '#101820'
      },
      fontSize: {
        display: [
          '2.75rem', //44px
          {
            fontWeight: 600
          }
        ],
        'heading-1': [
          '2.25rem', //36px
          {
            fontWeight: 600
          }
        ],
        'heading-2': [
          '2rem', //32px
          {
            fontWeight: 600
          }
        ],
        'heading-3': [
          '1rem', //16px
          {
            fontWeight: 600
          }
        ],
        'body-semibold': [
          '1rem', //16px
          {
            fontWeight: 600
          }
        ],
        'body-medium': [
          '1rem', //16px
          {
            fontWeight: 500
          }
        ],
        'body-regular': [
          '1rem', //16px
          {
            fontWeight: 400
          }
        ],
        'body-light': [
          '1rem', //16px
          {
            fontWeight: 300
          }
        ],
        'desc-medium': [
          '0.875rem', //14px
          {
            fontWeight: 500
          }
        ],
        'desc-regular': [
          '0.875rem', //14px
          {
            fontWeight: 400
          }
        ],
        'desc-light': [
          '0.875rem', //14px
          {
            fontWeight: 300
          }
        ]
      },
      boxShadow: {
        'soft-red': '0px 1.12px 8.94px 1.12px #FF2E001F',
        'medium-orange': '2px 3.01px 7.01px 1px #DE4F3F2E',
        'subtle-gray': '1.35px 2.03px 5.41px 0px #00000014',
        highlight: '0px 8px 20px 0px #FF2E001A',
        1: '0px 2px 10px 0px #4C4E6438'
      },
      backgroundImage: {
        'hero-pattern': "url('@/assets/backgrounds/bg_hero_clip.svg')",
        'wood-pattern': "url('@/assets/backgrounds/bg_wood_pattern.svg')",
        product: "url('@/assets/backgrounds/bg_product.svg')",
        'hero-loan': "url('@/assets/backgrounds/bg_hero_loan.svg')"
      }
    }
  },
  plugins: []
}
