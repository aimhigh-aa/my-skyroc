/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // 引入插件
import { dirname, resolve } from "node:path"; // 导入路径处理工具
import { fileURLToPath } from "node:url"; // 导入 URL 处理工具
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), UnoCSS()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true, // 允许不显式 import describe/it
    environment: "jsdom", // 模拟浏览器环境
    setupFiles: [resolve(__dirname, "./src/test/setup.ts")],
    include: ["src/**/*.{test,spec}.{ts,tsx}"], // 指定测试文件范围
  },
} as any);
