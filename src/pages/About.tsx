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
          Welcome to my personal website
        </div>
        <div style={{ 
          width: '100%',
          maxWidth: '100%'
        }}>
          <p style={{ marginBottom: '1rem' }}>
            Hello! I'm a software developer passionate about creating innovative solutions 
            and exploring new technologies. My journey in software development started with 
            a curiosity about how things work and has evolved into a professional career 
            building web applications and interactive experiences.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            I specialize in frontend development with React and TypeScript, but I'm also 
            experienced with backend technologies and 3D graphics programming. This website 
            is a showcase of my work and a platform where I share my thoughts about 
            technology and development.
          </p>

          <p>
            When I'm not coding, you can find me exploring new technologies, contributing 
            to open-source projects, or working on personal projects that push the 
            boundaries of web development.
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}

export default About 