import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import PageWrapper from '../components/PageWrapper'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import TopNavigation from '../components/TopNavigation'
import { useScrollReset } from '../hooks/useScrollReset'

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
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Resume</h1>
        
        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
          <PDFDownloadLink
            document={<ResumePDF />}
            fileName="resume.pdf"
            style={{
              padding: '0.5rem 1rem',
              background: '#fff',
              color: '#000',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {({ loading }) => loading ? 'Loading...' : 'Download PDF'}
          </PDFDownloadLink>
        </div>

        <div className="resume-content" style={{ 
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          color: '#000',
          padding: '3rem'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{resumeData.name}</h1>
          <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{resumeData.role}</p>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>{resumeData.email}</p>

          <h2 style={{ borderBottom: '1px solid #000', paddingBottom: '0.5rem', margin: '2rem 0 1rem' }}>Work Experience</h2>
          <h3>{resumeData.workExperience.title}</h3>
          <Latex>{`$\\text{${resumeData.workExperience.company} } (${resumeData.workExperience.period})$`}</Latex>
          <ul style={{ marginLeft: '2rem' }}>
            {resumeData.workExperience.bullets.map((bullet, index) => (
              <li key={index}>
                <Latex>{`$\\text{${bullet}}$`}</Latex>
              </li>
            ))}
          </ul>

          <h2 style={{ borderBottom: '1px solid #000', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Education</h2>
          <Latex>{`$\\text{${resumeData.education.degree}}$`}</Latex>
          <p>{`${resumeData.education.school}, ${resumeData.education.years}`}</p>
          <Latex>{`$\\text{GPA: } ${resumeData.education.gpa}$`}</Latex>

          <h2 style={{ borderBottom: '1px solid #000', paddingBottom: '0.5rem', margin: '2rem 0 1rem' }}>Technical Skills</h2>
          <Latex>{`$\\text{Languages: }$ ${resumeData.technicalSkills.languages}`}</Latex>
          <br />
          <Latex>{`$\\text{Frameworks: }$ ${resumeData.technicalSkills.frameworks}`}</Latex>
        </div>
      </div>
    </PageWrapper>
  )
}

export default Resume 