import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves a project site from /<repo>/. The deploy workflow sets
// GH_PAGES_BASE from the repository name, so renaming or forking the repo
// needs no edit here. Locally the base is the domain root.
const base = process.env.GH_PAGES_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  server: { port: 3100 },
  build: { outDir: "dist", assetsDir: "assets" },
});
