import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import TopNavigation from '../components/TopNavigation'
import { usePostsStore } from '../store/posts'
import { useMemo } from 'react'
import { useScrollReset } from '../hooks/useScrollReset'
import { useResponsive } from '../hooks/useResponsive'

const Blog = () => {
  useScrollReset()
  const navigate = useNavigate()
  const posts = usePostsStore((state) => state.posts)
  const { isMobile } = useResponsive()
  
  const blogPosts = useMemo(() => 
    posts.filter(post => post.type === 'blog')
      .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime())
  , [posts])

  return (
    <PageWrapper>
      <TopNavigation />
      <div style={{ 
        width: '100%',
        maxWidth: isMobile ? 'calc(100% - 2rem)' : '800px',
        margin: '0 auto',
        marginTop: isMobile ? '4rem' : '5rem',
        padding: isMobile ? '1rem' : '2rem',
        color: '#fff',
        overflowX: 'hidden'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          fontSize: isMobile ? '1.5rem' : '2rem' 
        }}>Blog</h1>
        <div style={{ 
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
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