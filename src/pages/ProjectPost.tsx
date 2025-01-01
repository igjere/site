import { useParams } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import TopNavigation from '../components/TopNavigation'
import { usePostsStore } from '../store/posts'
import MarkdownContent from '../components/MarkdownContent'
import { useScrollReset } from '../hooks/useScrollReset'
import { useResponsive } from '../hooks/useResponsive'

const ProjectPost = () => {
  useScrollReset()
  const { slug } = useParams()
  const { isMobile } = useResponsive()
  const post = usePostsStore((state) => 
    state.posts.find(p => p.slug === slug && p.type === 'project')
  )

  if (!post) return null

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
          fontSize: isMobile ? '1.75rem' : '2.5rem',
          lineHeight: '1.2'
        }}>{post.title}</h1>
        
        <div style={{ 
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '1rem',
          marginBottom: '2rem',
          fontSize: isMobile ? '0.9rem' : '1rem',
          fontStyle: 'italic'
        }}>
          Created: {new Date(post.createdAt).toLocaleString()}
          {post.modifiedAt > post.createdAt && 
            ` (Modified: ${new Date(post.modifiedAt).toLocaleString()})`}
        </div>

        <div style={{ 
          fontSize: isMobile ? '0.95rem' : '1.1rem',
          lineHeight: '1.8',
          letterSpacing: '0.02em',
          maxWidth: isMobile ? '100%' : '90%',
          margin: '0 auto'
        }}>
          <MarkdownContent content={post.content} />
        </div>
      </div>
    </PageWrapper>
  )
}

export default ProjectPost 