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
            if (id.includes('/react-dom/') || id.includes('/react/')) return 'react-vendor'
            if (id.includes('/react-router/') || id.includes('/react-router-dom/')) return 'router-vendor'
            if (id.includes('/@supabase/')) return 'supabase-vendor'
            if (id.includes('/@radix-ui/')) return 'radix-vendor'
            if (id.includes('/@phosphor-icons/')) return 'icons-vendor'
            if (id.includes('/recharts/')) return 'charts-vendor'
            if (id.includes('/cmdk/')) return 'command-palette-vendor'
            if (id.includes('/class-variance-authority/') || id.includes('/clsx/') || id.includes('/tailwind-merge/')) return 'style-utils-vendor'
            return 'vendor'
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
