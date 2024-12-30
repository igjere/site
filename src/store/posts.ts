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

// Import all markdown files
const blogFiles = import.meta.glob('../content/blog/*.md')
const projectFiles = import.meta.glob('../content/projects/*.md')

// Function to load and parse posts
const loadPosts = async () => {
  const posts: Post[] = []
  
  // Load blog posts
  for (const path in blogFiles) {
    const file = await blogFiles[path]() as PostFile
    const { frontmatter, content } = file.default
    if (!frontmatter.id || !frontmatter.title || !frontmatter.type || !frontmatter.slug) {
      console.warn('Missing required fields in frontmatter:', path)
      continue
    }
    posts.push({
      ...frontmatter,
      content,
      createdAt: new Date(frontmatter.createdAt),
      modifiedAt: new Date(frontmatter.modifiedAt)
    } as Post)
  }

  // Load project posts
  for (const path in projectFiles) {
    const file = await projectFiles[path]() as PostFile
    const { frontmatter, content } = file.default
    posts.push({
      ...frontmatter,
      content,
      createdAt: new Date(frontmatter.createdAt),
      modifiedAt: new Date(frontmatter.modifiedAt)
    } as Post)
  }

  return posts
}

export const usePostsStore = create<PostsStore>((set, get) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  getRecentPosts: () => get().posts.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime())
}))

// Initialize posts
loadPosts().then(posts => usePostsStore.setState({ posts }))
