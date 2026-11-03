import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
//incluyendo tailwind
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()]
})
