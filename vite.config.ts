import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname.replace(/^\//, ""),
    },
  },
}));
