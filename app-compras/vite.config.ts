// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    fs: { strict: false },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Esto no va en "server", va como raíz
  // Solo si estás usando un adaptador de backend como Express + Vite, que no es tu caso
});
