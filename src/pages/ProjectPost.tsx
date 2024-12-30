import { useParams } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import TopNavigation from '../components/TopNavigation'
import { usePostsStore } from '../store/posts'
import MarkdownContent from '../components/MarkdownContent'

const ProjectPost = () => {
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

export default ProjectPost 