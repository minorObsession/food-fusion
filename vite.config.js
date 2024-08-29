import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ESLint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ESLint()],

  // ! added this to enable top-level await
  build: {
    target: "esnext", // or a more recent ES version like 'es2022'
  },
});
