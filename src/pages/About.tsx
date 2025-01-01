import PageWrapper from '../components/PageWrapper'
import TopNavigation from '../components/TopNavigation'
import { useScrollReset } from '../hooks/useScrollReset'
import { useResponsive } from '../hooks/useResponsive'

const About = () => {
  useScrollReset()
  const { isMobile } = useResponsive()
  
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
        }}>About</h1>
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
          maxWidth: '100%',
          fontSize: isMobile ? '0.9rem' : '1rem',
          lineHeight: '1.6',
          letterSpacing: '0.02em'
        }}>
          <p style={{ 
            marginBottom: '1.5rem', 
            fontStyle: 'italic',
            textAlign: 'center',
            fontSize: isMobile ? '1.1rem' : '1.2rem'
          }}>
            "I'm still working while you dream."
          </p>
          <p style={{ 
            marginBottom: '1.5rem',
            maxWidth: isMobile ? '100%' : '90%',
            margin: '0 auto 1.5rem auto'
          }}>
            Hello, I'm on the eternal quest to get cracked. I will be updating this page with more information in the near future.
          </p>
          <p style={{ 
            marginBottom: '1.5rem',
            maxWidth: isMobile ? '100%' : '90%',
            margin: '0 auto'
          }}>
            All you need to know about me is that I've built my life by myself brick by brick. I am very prideful about the quality of my work, and stubborn to be the best at it. I'm also very passionate about the gym and reading.
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}

export default About 