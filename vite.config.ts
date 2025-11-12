import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // PWA optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
    // Enable source maps for better debugging
    sourcemap: true,
  },
  // Ensure PWA assets are properly served
  publicDir: 'public',
}));

// Add PWA-specific headers for development
if (process.env.NODE_ENV === 'development') {
  // This will be handled by the service worker in production
}
