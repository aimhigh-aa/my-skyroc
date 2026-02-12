import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ElegantReactRouter from '@soybean-react/vite-plugin-react-router';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ElegantReactRouter()],
});
