import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build:single` emits one self-contained dist/index.html (handy for previews/sharing)
export default defineConfig({
  plugins: [react(), tailwindcss(), process.env.SINGLE ? viteSingleFile() : null].filter(Boolean),
});
