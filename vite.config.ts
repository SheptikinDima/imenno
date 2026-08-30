import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    react(),

    legacy({
      targets: [
        "Safari >= 12",
        "iOS >= 12"
      ],

      modernTargets: [
        "Safari >= 12",
        "iOS >= 12",
        "Chrome >= 80",
        "Edge >= 80",
        "Firefox >= 78"
      ],

      modernPolyfills: true
    })
  ],

  base: "/",

  server: {
    port: 5173,
    host: "127.0.0.1"
  }
});