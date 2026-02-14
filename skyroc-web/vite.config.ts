import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite' // 引入插件
import { dirname, resolve } from 'node:path'; // 导入路径处理工具
import { fileURLToPath } from 'node:url'; // 导入 URL 处理工具


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
});