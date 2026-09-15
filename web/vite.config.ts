import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import { prometheusLuaPlugin } from "./src/vite/prometheusLuaPlugin"

export default defineConfig(({ command }) => {
  const isDevServer = command === "serve"
  const isVercel = process.env.VERCEL === "1"
  const base = isDevServer || isVercel ? "/" : "/IND-PROM.-VERSION/"
  const docsPathRegex = /^\/(?:IND-PROM.-VERSION\/)?docs\/?$/
  const rewriteDocsRequest = (url: string) => {
    const [pathname, search = ""] = url.split("?", 2)
    if (!pathname || !docsPathRegex.test(pathname)) {
      return url
    }
    return `/docs/index.html${search ? `?${search}` : ""}`
  }

  return {
    base,
    plugins: [
      {
        name: "serve-docs-index-directly",
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url) req.url = rewriteDocsRequest(req.url)
            next()
          })
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url) req.url = rewriteDocsRequest(req.url)
            next()
          })
        },
      },
      react(),
      tailwindcss(),
      prometheusLuaPlugin(),
    ],
    worker: {
      format: "es",
      plugins: () => [prometheusLuaPlugin()],
    },
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
    optimizeDeps: {
      exclude: ["wasmoon"],
    },
    test: {
      environment: "node",
      setupFiles: "./src/test/setup.ts",
      exclude: ["src/e2e/**", "node_modules/**", "dist/**"],
    },
  }
})
