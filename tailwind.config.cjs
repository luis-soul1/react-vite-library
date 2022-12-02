module.exports = {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extends: {
      colors: {
        'primary-color': 'var(--primary-color)',
        transparent: 'var(--transparent)',
        black: 'var(--black)',
        white: 'var(--white)',

        'gray-25': 'var(--gray-25)',
        'gray-50': 'var(--gray-50)',
        'gray-100': 'var(--gray-100)',
        'gray-200': 'var(--gray-200)',
        'gray-300': 'var(--gray-300)',
        'gray-400': 'var(--gray-400)',
        'gray-500': 'var(--gray-500)',
        'gray-600': 'var(--gray-600)',
        'gray-700': 'var(--gray-700)',
        'gray-800': 'var(--gray-800)',
        'gray-900': 'var(--gray-900)',
        'gray-1000': 'var(--gray-1000)',

        'green-50': 'var(--green-50)',
        'green-100': 'var(--green-100)',
        'green-200': 'var(--green-200)',
        'green-300': 'var(--green-300)',
        'green-400': 'var(--green-400)',
        'green-500': 'var(--green-500)',
        'green-600': 'var(--green-600)',
        'green-700': 'var(--green-700)',
        'green-800': 'var(--green-800)',
        'green-900': 'var(--green-900)',

        'esmerald-50': 'var(--esmerald-50)',
        'esmerald-100': 'var(--esmerald-100)',
        'esmerald-200': 'var(--esmerald-200)',

        'teal-300': 'var(--teal-300)',
        'teal-400': 'var(--teal-400)',
        'teal-500': 'var(--teal-500)',
        'teal-600': 'var(--teal-600)',

        'sky-50': 'var(--sky-50)',
        'sky-100': 'var(--sky-100)',
        'sky-200': 'var(--sky-200)',
        'sky-700': 'var(--sky-700)',
        'sky-800': 'var(--sky-800)',

        'blue-50': 'var(--blue-50)',
        'blue-75': 'var(--blue-75)',
        'blue-100': 'var(--blue-100)',
        'blue-150': 'var(--blue-150)',
        'blue-200': 'var(--blue-200)',
        'blue-300': 'var(--blue-300)',
        'blue-400': 'var(--blue-400)',
        'blue-500': 'var(--blue-500)',
        'blue-600': 'var(--blue-600)',
        'blue-700': 'var(--blue-700)',
        'blue-800': 'var(--blue-800)',
        'blue-900': 'var(--blue-900)',

        'indigo-25': 'var(--indigo-25)',
        'indigo-50': 'var(--indigo-50)',
        'indigo-100': 'var(--indigo-100)',
        'indigo-200': 'var(--indigo-200)',
        'indigo-300': 'var(--indigo-300)',
        'indigo-400': 'var(--indigo-400)',
        'indigo-500': 'var(--indigo-500)',
        'indigo-600': 'var(--indigo-600)',
        'indigo-700': 'var(--indigo-700)',
        'indigo-800': 'var(--indigo-800)',

        'purple-25': 'var(--purple-25)',
        'purple-50': 'var(--purple-50)',
        'purple-100': 'var(--purple-100)',
        'purple-150': 'var(--purple-150)',
        'purple-200': 'var(--purple-200)',
        'purple-250': 'var(--purple-250)',
        'purple-300': 'var(--purple-300)',
        'purple-500': 'var(--purple-500)',
        'purple-600': 'var(--purple-600)',
        'purple-800': 'var(--purple-800)',

        'fuchsia-400': 'var(--fuchsia-400)',

        'red-50': 'var(--red-50)',
        'red-100': 'var(--red-100)',
        'red-200': 'var(--red-200)',
        'red-300': 'var(--red-300)',
        'red-400': 'var(--red-400)',
        'red-500': 'var(--red-500)',
        'red-600': 'var(--red-600)',
        'red-700': 'var(--red-700)',
        'red-900': 'var(--red-900)',

        'rose-100': 'var(--rose-100)',
        'rose-300': 'var(--rose-300)',
        'rose-350': 'var(--rose-350)',
        'rose-400': 'var(--rose-400)',
        'rose-500': 'var(--rose-500)',
        'rose-600': 'var(--rose-600)',
        'rose-700': 'var(--rose-700)',

        'orange-50': 'var(--orange-50)',
        'orange-100': 'var(--orange-100)',
        'orange-200': 'var(--orange-200)',
        'orange-300': 'var(--orange-300)',
        'orange-400': 'var(--orange-400)',
        'orange-500': 'var(--orange-500)',
        'orange-600': 'var(--orange-600)',
        'orange-700': 'var(--orange-700)',

        'yellow-50': 'var(--yellow-50)',
        'yellow-100': 'var(--yellow-100)',
        'yellow-200': 'var(--yellow-200)',
        'yellow-250': 'var(--yellow-250)',
        'yellow-300': 'var(--yellow-300)',
        'yellow-400': 'var(--yellow-400)',
        'yellow-500': 'var(--yellow-500)',
        'yellow-600': 'var(--yellow-600)',
        'yellow-700': 'var(--yellow-700)',
        'yellow-800': 'var(--yellow-800)',
        'yellow-900': 'var(--yellow-900)'
      }
    },
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1540px'
    }
  },
  plugins: [],
  safelist: [
    'text-2xl',
    'text-3xl',
    {
      pattern: /bg-(red|green|blue)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus']
    },
    {
      pattern: /text-(red|green|blue)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus']
    },
    {
      pattern: /border-(red|green|blue)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus']
    }
  ],
  important: true
}
