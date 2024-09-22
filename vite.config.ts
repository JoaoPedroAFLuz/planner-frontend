import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@contexts": "/src/contexts",
      "@configs": "/src/configs",
      "@dtos": "/src/dtos",
      "@entities": "/src/entities",
      "@hooks": "/src/hooks",
      "@libs": "/src/libs",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@services": "/src/services",
    },
  },
});
