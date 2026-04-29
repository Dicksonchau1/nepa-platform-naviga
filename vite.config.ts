import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/')) {
            if (
              /(?:^|\/)(?:react$|react-dom|react-router|react-router-dom|react-is|use-sync-external-store|scheduler|loose-envify|js-tokens|@remix-run\/router)(?:\/|$)/.test(id)
            ) {
              return 'react-core-vendor'
            }
            if (
              /(?:^|\/)(?:@supabase\/|@octokit\/|d3|date-fns|marked|three|uuid|zod|@hookform\/resolvers|class-variance-authority|clsx|tailwind-merge|tw-animate-css)(?:\/|$)/.test(id)
            ) {
              return 'data-vendor'
            }
            if (id.includes('/@supabase/')) return 'supabase-vendor'
            if (id.includes('/@phosphor-icons/')) return 'icons-vendor'
            if (id.includes('/recharts/')) return 'charts-vendor'
            if (id.includes('/cmdk/')) return 'command-palette-vendor'
            if (id.includes('/class-variance-authority/') || id.includes('/clsx/') || id.includes('/tailwind-merge/')) return 'style-utils-vendor'
          }

          if (id.includes('/src/routes/dashboard/')) return 'dashboard-routes'
          if (id.includes('/src/routes/products/')) return 'product-routes'
          if (id.includes('/src/routes/resources/')) return 'resource-routes'
          if (id.includes('/src/routes/about/')) return 'about-routes'
          if (id.includes('/src/routes/')) return 'public-routes'

          return undefined
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react-router-dom']
  },
});
