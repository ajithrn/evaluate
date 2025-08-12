import { defineConfig } from '@tailwindcss/vite'

export default defineConfig({
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        // EV Primary Colors
        'ev-primary': {
          50: '#E6F6FF',   // Light electric blue
          100: '#CCE9FF',
          200: '#99D5FF',
          300: '#66C1FF',
          400: '#33ADFF',
          500: '#0099FF',  // Electric blue - main brand color
          600: '#007ACC',
          700: '#005C99',
          800: '#003D66',
          900: '#001F33',
        },
        
        // EV Energy Colors
        'ev-energy': {
          50: '#FEFEE6',   // Light energy yellow
          100: '#FFFDCC',
          200: '#FFF999',
          300: '#FFF666',
          400: '#FFF333',
          500: '#FFF000',  // Energy yellow - for highlights
          600: '#CCC000',
          700: '#999000',
          800: '#666000',
          900: '#333000',
        },
        
        // EV Eco Colors
        'ev-eco': {
          50: '#F0FFF4',   // Light eco green
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',  // Eco green - for success/eco features
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        
        // EV Tech Colors
        'ev-tech': {
          50: '#F4F7FF',   // Light tech slate
          100: '#E6EBFF',
          200: '#B3C2FF',
          300: '#8099FF',
          400: '#4D70FF',
          500: '#1A47FF',  // Tech blue - for technical elements
          600: '#0033FF',
          700: '#0026CC',
          800: '#001A99',
          900: '#000D4D',
        },
      },
      
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      
      // Background gradients
      backgroundImage: {
        'ev-gradient': 'linear-gradient(to right bottom, var(--tw-gradient-stops))',
        'ev-card': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'ev-highlight': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      
      // Custom animations
      animation: {
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out'
      },
      
      // Custom keyframes
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  }
})
