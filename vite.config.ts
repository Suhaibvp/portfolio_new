import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project sites live under /repo-name/. Vercel/Netlify stay at /.
  base: process.env.VITE_BASE || '/',
})
