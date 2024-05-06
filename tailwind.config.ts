import {nextui} from '@nextui-org/theme';

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        'blue-10': '#94B4E6',
        'green-10': '#B9E185',
        'orange-10': '#FE6F5E',
        'black-10': '#353534',
        'yellow-10': '#FFDE59',
      },
    
      
    },
  },
  darkMode: "class",
  plugins: [
    nextui()
    
  ],
};
export default config;
