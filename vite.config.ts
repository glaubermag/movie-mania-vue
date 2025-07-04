import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
}));
