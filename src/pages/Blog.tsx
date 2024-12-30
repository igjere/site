import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import TopNavigation from '../components/TopNavigation'
import { usePostsStore } from '../store/posts'
import { useMemo } from 'react'

const Blog = () => {
  const navigate = useNavigate()
  const posts = usePostsStore((state) => state.posts)
  
  const blogPosts = useMemo(() => 
    posts.filter(post => post.type === 'blog')
      .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime())
  , [posts])

  return (
    <PageWrapper>
      <TopNavigation />
      <div style={{ 
        width: '100%',
        marginTop: '6rem',
        paddingTop: '2rem',
        padding: '0 2rem',
        color: '#fff'
      }}>
        <h1>Blog</h1>
        <div style={{ marginTop: '2rem' }}>
          {blogPosts.map(post => (
            <div 
              key={post.id}
              onClick={() => navigate(`/blog/${post.slug}`)}
              style={{ 
                cursor: 'pointer',
                marginBottom: '2rem',
                padding: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <h2>{post.title}</h2>
              <p style={{ fontStyle: 'italic' }}>
                Created: {new Date(post.createdAt).toLocaleString()}
                {post.modifiedAt > post.createdAt && 
                  ` (Modified: ${new Date(post.modifiedAt).toLocaleString()})`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}

export default Blog 