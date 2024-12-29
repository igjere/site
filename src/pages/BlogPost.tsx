import { useParams } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import { usePostsStore } from '../store/posts'

const BlogPost = () => {
  const { slug } = useParams()
  const post = usePostsStore((state) => 
    state.posts.find(p => p.slug === slug && p.type === 'blog')
  )

  if (!post) return <div>Post not found</div>

  return (
    <PageWrapper>
      <h1>{post.title}</h1>
      <p style={{ fontStyle: 'italic' }}>
        Created: {new Date(post.createdAt).toLocaleString()}
        {post.modifiedAt > post.createdAt && 
          ` (Modified: ${new Date(post.modifiedAt).toLocaleString()})`}
      </p>
      <div style={{ marginTop: '2rem' }}>
        {post.content}
      </div>
    </PageWrapper>
  )
}

export default BlogPost 