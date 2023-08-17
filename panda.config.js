import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: false,
  include: ['./src/**/*.{ts,tsx,js,jsx}', './pages/**/*.{ts,tsx,js,jsx}'],
  exclude: [],
  outdir: 'styled-system',
  jsxFramework: 'react',
})
