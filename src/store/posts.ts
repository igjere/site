import { create } from 'zustand'
import { Post } from '../types/Post'
import matter from 'gray-matter'

interface PostsStore {
  posts: Post[]
  addPost: (post: Post) => void
  getRecentPosts: () => Post[]
}

// Update glob patterns to use absolute paths with raw loader
const blogFiles = import.meta.glob('/src/content/blog/*.md', {
  eager: true,
  as: 'raw'
})
const projectFiles = import.meta.glob('/src/content/projects/*.md', {
  eager: true,
  as: 'raw'
})

// Simple markdown frontmatter parser
const parseFrontMatter = (content: string) => {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const matches = content.match(frontMatterRegex)
  
  if (!matches) return null
  
  const frontMatter = matches[1]
  const markdownContent = matches[2]
  
  const metadata: Record<string, any> = {}
  frontMatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim().replace(/^['"](.*)['"]$/, '$1')
      metadata[key.trim()] = value
    }
  })
  
  return { frontmatter: metadata, content: markdownContent.trim() }
}

// Function to load and parse posts
const loadPosts = async () => {
  const posts: Post[] = []
  
  // Process blog posts
  Object.entries(blogFiles).forEach(([path, content]) => {
    try {
      const parsed = parseFrontMatter(content)
      if (!parsed) {
        console.warn('Invalid frontmatter format:', path)
        return
      }
      const { frontmatter, content: markdownContent } = parsed
      if (!frontmatter.id || !frontmatter.title || !frontmatter.type || !frontmatter.slug) {
        console.warn('Missing required fields in frontmatter:', path)
        return
      }
      posts.push({
        ...frontmatter,
        content: markdownContent,
        createdAt: new Date(frontmatter.createdAt),
        modifiedAt: new Date(frontmatter.modifiedAt)
      } as Post)
    } catch (error) {
      console.error(`Error processing ${path}:`, error)
    }
  })

  // Process project posts
  Object.entries(projectFiles).forEach(([path, content]) => {
    try {
      const parsed = parseFrontMatter(content)
      if (!parsed) {
        console.warn('Invalid frontmatter format:', path)
        return
      }
      const { frontmatter, content: markdownContent } = parsed
      posts.push({
        ...frontmatter,
        content: markdownContent,
        createdAt: new Date(frontmatter.createdAt),
        modifiedAt: new Date(frontmatter.modifiedAt)
      } as Post)
    } catch (error) {
      console.error(`Error processing ${path}:`, error)
    }
  })

  return posts
}

export const usePostsStore = create<PostsStore>((set, get) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  getRecentPosts: () => get().posts.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime())
}))

// Initialize posts
loadPosts().then(posts => usePostsStore.setState({ posts }))
