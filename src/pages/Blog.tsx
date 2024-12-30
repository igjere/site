import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
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
      <div style={{ 
        position: 'fixed',
        top: '2rem',
        left: '2rem',
        zIndex: 10
      }}>
        <a 
          href="/"
          style={{
            padding: '0.5rem 1rem',
            background: '#fff',
            color: '#000',
            borderRadius: '4px',
            textDecoration: 'none',
            fontFamily: 'Beholden-Regular'
          }}
        >
          Home
        </a>
      </div>
      <div style={{ 
        width: '100%',
        marginTop: '5rem',
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
                marginBottom: '2rem'
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