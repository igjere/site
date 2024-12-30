import { useParams } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import TopNavigation from '../components/TopNavigation'
import { usePostsStore } from '../store/posts'
import MarkdownContent from '../components/MarkdownContent'
import { useScrollReset } from '../hooks/useScrollReset'

const ProjectPost = () => {
  useScrollReset()
  const { slug } = useParams()
  const post = usePostsStore((state) => 
    state.posts.find(p => p.slug === slug && p.type === 'project')
  )

  if (!post) return <div>Project not found</div>

  return (
    <PageWrapper>
      <TopNavigation />
      <div style={{ 
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        marginTop: '6rem',
        paddingTop: '2rem',
        padding: '0 2rem',
        color: '#fff'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>{post.title}</h1>
        <p style={{ 
          textAlign: 'center',
          fontStyle: 'italic',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '1rem',
          marginBottom: '2rem'
        }}>
          Created: {post.createdAt.toLocaleString()}
          {post.modifiedAt > post.createdAt && 
            ` (Modified: ${post.modifiedAt.toLocaleString()})`}
        </p>
        <div style={{ 
          width: '100%',
          maxWidth: '100%'
        }}>
          <MarkdownContent content={post.content} />
        </div>
      </div>
    </PageWrapper>
  )
}

export default ProjectPost 