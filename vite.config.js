import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    host: true, // o '0.0.0.0'
    port: 5173 // Puedes cambiar el puerto si es necesario
  },
  plugins: [react()],
  base: "/",
})


