import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import { usePostsStore } from '../store/posts'
import { useMemo } from 'react'

const Projects = () => {
  const navigate = useNavigate()
  const posts = usePostsStore((state) => state.posts)
  
  const projectPosts = useMemo(() => 
    posts.filter(post => post.type === 'project')
      .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime())
  , [posts])

  return (
    <PageWrapper>
      <h1>Projects</h1>
      <div style={{ marginTop: '2rem' }}>
        {projectPosts.map(post => (
          <div 
            key={post.id}
            onClick={() => navigate(`/projects/${post.slug}`)}
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
    </PageWrapper>
  )
}

export default Projects 