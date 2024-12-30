import PageWrapper from '../components/PageWrapper'

const About = () => {
  return (
    <PageWrapper>
      {/* Home Button */}
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
        height: '100%', 
        color: '#fff',
        marginTop: '5rem'
      }}>
        <h1>About</h1>
      </div>
    </PageWrapper>
  )
}

export default About 