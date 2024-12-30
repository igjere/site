import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import matter from 'gray-matter'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'markdown-loader',
      transform(code, id) {
        if (!id.endsWith('.md')) return null
        const { data, content } = matter(code)
        return {
          code: `export default {
            frontmatter: ${JSON.stringify(data)},
            content: ${JSON.stringify(content)}
          }`
        }
      }
    }
  ],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['three', '@react-three/fiber', '@react-three/drei'],
          pdf: ['@react-pdf/renderer'],
          markdown: ['react-markdown', 'rehype-raw', 'rehype-sanitize']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  publicDir: 'public',
  assetsInclude: ['**/*.ttf'],
  base: '/',
  optimizeDeps: {
    exclude: ['three-stdlib']
  }
})