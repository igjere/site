import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'
import TopNavigation from '../components/TopNavigation'
import { useScrollReset } from '../hooks/useScrollReset'

const About = () => {
  useScrollReset()
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
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>About</h1>
        <div style={{ 
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '1rem',
          marginBottom: '2rem'
        }}>
          Welcome
        </div>
        <div style={{ 
          width: '100%',
          maxWidth: '100%'
        }}>
          <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
            "I'm still working while you dream."
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Hello, I'm on the eternal quest to get cracked. I will be updating this page with more information in the near future.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            All you need to know about me is that I've built my life by myself brick by brick. I am very prideful about the quality of my work, and stubborn to be the best at it. I'm also very passionate about the gym and reading.
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}

export default About 