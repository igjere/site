export interface Post {
  id: string
  title: string
  content: string
  type: 'blog' | 'project'
  createdAt: Date
  modifiedAt: Date
  slug: string
} 