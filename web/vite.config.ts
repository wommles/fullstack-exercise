import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  server: {
    port: 3001,
    strictPort: true,
    host: true,
  },
});
