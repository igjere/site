import { create } from 'zustand'
import { Post } from '../types/Post'

interface PostsStore {
  posts: Post[]
  addPost: (post: Post) => void
  getRecentPosts: () => Post[]
}

interface PostFile {
  default: {
    frontmatter: Record<string, any>
    content: string
  }
}

// Update glob patterns to use absolute paths
const blogFiles = import.meta.glob('/src/content/blog/*.md', { eager: true })
const projectFiles = import.meta.glob('/src/content/projects/*.md', { eager: true })

// Function to load and parse posts
const loadPosts = async () => {
  const posts: Post[] = []
  
  // Process blog posts
  Object.values(blogFiles).forEach((file: any) => {
    const { frontmatter, content } = file.default
    if (!frontmatter.id || !frontmatter.title || !frontmatter.type || !frontmatter.slug) {
      console.warn('Missing required fields in frontmatter:', file)
      return
    }
    posts.push({
      ...frontmatter,
      content,
      createdAt: new Date(frontmatter.createdAt),
      modifiedAt: new Date(frontmatter.modifiedAt)
    } as Post)
  })

  // Process project posts
  Object.values(projectFiles).forEach((file: any) => {
    const { frontmatter, content } = file.default
    posts.push({
      ...frontmatter,
      content,
      createdAt: new Date(frontmatter.createdAt),
      modifiedAt: new Date(frontmatter.modifiedAt)
    } as Post)
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
