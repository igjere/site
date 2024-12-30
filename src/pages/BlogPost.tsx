import { useParams } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import TopNavigation from '../components/TopNavigation'
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
      <TopNavigation />
      <div style={{ 
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        marginTop: '6rem',
        paddingTop: '2rem',
        padding: '2rem',
        color: '#fff'
      }}>
        <h1>{post.title}</h1>
        <p style={{ 
          fontStyle: 'italic',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '1rem'
        }}>
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