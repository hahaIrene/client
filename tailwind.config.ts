import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/map/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stores/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  plugins: [require('daisyui')],
  // daisyUI config (optional - here are the default values) #0055bd
  daisyui: {
    themes: [
      {
        forest: {
          ...require('daisyui/src/theming/themes')['forest'],
          neutral: '#52525B',
          'base-100': '#353738',
          'base-200': '#242627',
          'base-300': '#1C1E1F'
        }
      }
      // {
      //   light: {
      //     ...require('daisyui/src/theming/themes')['light']
      //     // primary: '#343232'
      //   },
      //   dark: {
      //     ...require('daisyui/src/theming/themes')['dark']
      //     // primary: '#343f4f'
      //   }
      // }
    ]
  }
}
export default config
