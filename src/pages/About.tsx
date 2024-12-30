import PageWrapper from '../components/PageWrapper'
import TopNavigation from '../components/TopNavigation'

const About = () => {
  return (
    <PageWrapper>
      <TopNavigation />
      <div style={{ 
        width: '100%', 
        height: '100%', 
        color: '#fff',
        marginTop: '6rem',
        paddingTop: '2rem',
        padding: '0 2rem'
      }}>
        <h1>About</h1>
      </div>
    </PageWrapper>
  )
}

export default About 