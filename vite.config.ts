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
  ]
}) 