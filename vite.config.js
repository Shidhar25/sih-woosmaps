import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: process.env.CODESANDBOX_SSE ? 443 : undefined,
  },
  build: {
    outDir: 'dist',
    base: './'
  }
});
