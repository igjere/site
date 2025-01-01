import PageWrapper from '../components/PageWrapper'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import TopNavigation from '../components/TopNavigation'
import { useScrollReset } from '../hooks/useScrollReset'
import { useResponsive } from '../hooks/useResponsive'

// Resume Data
const resumeData = {
  name: "John Doe",
  role: "Test content for when I feel like updating this page",
  email: "john.doe@email.com",
  education: {
    degree: "B.S. in Computer Science",
    school: "University of Example",
    years: "2021-2024",
    gpa: "3.97/4.00"
  },
  workExperience: {
    title: "Software Engineer",
    company: "Example Corp",
    period: "2022-Present",
    bullets: [
      "",
      ""
    ]
  },
  technicalSkills: {
    languages: "",
    frameworks: ""
  }
}

// Register Times New Roman font
Font.register({
  family: 'Times New Roman',
  src: '/fonts/Times-New-Roman.ttf'  // You'll need to add this font to your public folder
})

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times New Roman',
    fontSize: 12,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 18,
    marginBottom: 10,
    borderBottom: 1,
    paddingBottom: 5,
  },
  role: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  contact: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    marginLeft: 30,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  }
})

// Updated PDF Component
const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>{resumeData.name}</Text>
        <Text style={styles.role}>{resumeData.role}</Text>
        <Text style={styles.contact}>{resumeData.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Education</Text>
        <Text style={styles.text}>{resumeData.education.degree}</Text>
        <Text style={styles.text}>{`${resumeData.education.school}, ${resumeData.education.years}`}</Text>
        <Text style={styles.text}>{`GPA: ${resumeData.education.gpa}`}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Work Experience</Text>
        <Text style={styles.text}>{`${resumeData.workExperience.title} - ${resumeData.workExperience.company} (${resumeData.workExperience.period})`}</Text>
        <View style={styles.list}>
          {resumeData.workExperience.bullets.map((bullet, index) => (
            <Text key={index} style={styles.listItem}>• {bullet}</Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Technical Skills</Text>
        <Text style={styles.text}>{`Languages: ${resumeData.technicalSkills.languages}`}</Text>
        <Text style={styles.text}>{`Frameworks: ${resumeData.technicalSkills.frameworks}`}</Text>
      </View>
    </Page>
  </Document>
)

const Resume = () => {
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
        marginBottom: '2rem',
        padding: isMobile ? '1rem' : '2rem',
        color: '#fff',
        overflowX: 'hidden'
      }}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            textAlign: 'center',
            margin: 0,
            fontSize: isMobile ? '1.5rem' : '2rem'
          }}>Resume</h1>
          
          <PDFDownloadLink
            document={<ResumePDF />}
            fileName="resume.pdf"
            style={{
              padding: '0.5rem 1rem',
              background: '#fff',
              color: '#000',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: isMobile ? '0.8rem' : '1rem'
            }}
          >
            Download PDF
          </PDFDownloadLink>
        </div>

        <div className="resume-content" style={{ 
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          color: '#000',
          padding: isMobile ? '1.25rem' : '2.5rem',
          fontSize: isMobile ? '0.8rem' : '1rem',
          lineHeight: '1.5'
        }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '0.5rem',
            fontSize: isMobile ? '1.3rem' : '1.75rem'
          }}>{resumeData.name}</h1>
          <p style={{ 
            textAlign: 'center', 
            marginBottom: '0.5rem',
            fontSize: isMobile ? '0.8rem' : '1rem'
          }}>{resumeData.role}</p>
          <p style={{ 
            textAlign: 'center', 
            marginBottom: '1.5rem',
            fontSize: isMobile ? '0.8rem' : '1rem'
          }}>{resumeData.email}</p>

          <h2 style={{ 
            borderBottom: '1px solid #000', 
            paddingBottom: '0.5rem', 
            margin: '1.5rem 0 1rem',
            fontSize: isMobile ? '1.1rem' : '1.4rem'
          }}>Work Experience</h2>
          <h3 style={{ 
            fontSize: isMobile ? '0.9rem' : '1.2rem',
            marginBottom: '0.5rem'
          }}>{resumeData.workExperience.title}</h3>
          <Latex>{`$\\text{${resumeData.workExperience.company} } (${resumeData.workExperience.period})$`}</Latex>
          <ul style={{ 
            marginLeft: '1.5rem',
            marginTop: '0.5rem'
          }}>
            {resumeData.workExperience.bullets.map((bullet, index) => (
              <li key={index} style={{ marginBottom: '0.3rem' }}>
                <Latex>{`$\\text{${bullet}}$`}</Latex>
              </li>
            ))}
          </ul>

          <h2 style={{ 
            borderBottom: '1px solid #000', 
            paddingBottom: '0.5rem', 
            margin: '1.5rem 0 1rem',
            fontSize: isMobile ? '1.1rem' : '1.4rem'
          }}>Education</h2>
          <Latex>{`$\\text{${resumeData.education.degree}}$`}</Latex>
          <p style={{ margin: '0.5rem 0' }}>{`${resumeData.education.school}, ${resumeData.education.years}`}</p>
          <Latex>{`$\\text{GPA: } ${resumeData.education.gpa}$`}</Latex>

          <h2 style={{ 
            borderBottom: '1px solid #000', 
            paddingBottom: '0.5rem', 
            margin: '1.5rem 0 1rem',
            fontSize: isMobile ? '1.1rem' : '1.4rem'
          }}>Technical Skills</h2>
          <Latex>{`$\\text{Languages: }$ ${resumeData.technicalSkills.languages}`}</Latex>
          <br />
          <Latex>{`$\\text{Frameworks: }$ ${resumeData.technicalSkills.frameworks}`}</Latex>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Resume 