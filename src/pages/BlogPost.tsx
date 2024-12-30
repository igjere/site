import { useParams } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import { usePostsStore } from '../store/posts'
import MarkdownContent from '../components/MarkdownContent'

const BlogPost = () => {
  const { slug } = useParams()
  const post = usePostsStore((state) => 
    state.posts.find(p => p.slug === slug && p.type === 'blog')
  )

  if (!post) return <div>Post not found</div>

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
        <h1>{post.title}</h1>
        <p style={{ fontStyle: 'italic' }}>
          Created: {post.createdAt.toLocaleString()}
          {post.modifiedAt > post.createdAt && 
            ` (Modified: ${post.modifiedAt.toLocaleString()})`}
        </p>
        <div style={{ marginTop: '2rem' }}>
          <MarkdownContent content={post.content} />
        </div>
      </div>
    </PageWrapper>
  )
}

export default BlogPost 