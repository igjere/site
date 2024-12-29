import { create } from 'zustand'
import { Post } from '../types/Post'

interface PostsStore {
  posts: Post[]
  addPost: (post: Post) => void
  getRecentPosts: () => Post[]
}

export const usePostsStore = create<PostsStore>((set, get) => ({
  posts: [
    {
      id: '1',
      title: 'Hello World',
      content: 'Welcome to my first blog post! Content coming soon...',
      type: 'blog',
      createdAt: new Date('2024-12-28T21:30:00'),
      modifiedAt: new Date('2024-12-28T21:30:00'),
      slug: 'hello-world'
    },
    {
      id: '2',
      title: 'Portfolio Website',
      content: 'A 3D portfolio website built with React, Three.js, and TypeScript. Features include interactive 3D elements, blog system, and project showcase.',
      type: 'project',
      createdAt: new Date('2024-12-28T21:39:00'),
      modifiedAt: new Date('2024-12-28T21:39:00'),
      slug: 'portfolio-website'
    }
  ],
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  getRecentPosts: () => get().posts.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime())
})) 
