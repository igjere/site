import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import PageWrapper from '../components/PageWrapper'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import TopNavigation from '../components/TopNavigation'

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

// PDF Document Component
const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.section}>
        <Text style={styles.heading}>John Doe</Text>
        <Text style={styles.role}>Software Engineer</Text>
        <Text style={styles.contact}>john.doe@email.com</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Education</Text>
        <Text style={styles.text}>B.S. in Computer Science</Text>
        <Text style={styles.text}>University of Example, 2018-2022</Text>
        <Text style={styles.text}>GPA: 3.95/4.00</Text>
      </View>

      {/* Technical Skills */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Technical Skills</Text>
        <Text style={styles.text}>Languages: Python, JavaScript/TypeScript, C++</Text>
        <Text style={styles.text}>Frameworks: React, Three.js, Node.js</Text>
      </View>

      {/* Work Experience */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Work Experience</Text>
        <Text style={styles.text}>Software Engineer - Example Corp (2022-Present)</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Developed n microservices using Node.js and TypeScript</Text>
          <Text style={styles.listItem}>• Improved system performance by O(n log n)</Text>
        </View>
      </View>

      {/* Publications */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Publications</Text>
        <Text style={styles.text}>"Advanced Algorithms in Practice"</Text>
        <Text style={styles.text}>IEEE Conference (2023)</Text>
      </View>
    </Page>
  </Document>
)

const Resume = () => {
  return (
    <PageWrapper>
      <TopNavigation />
      <div className="resume-content" style={{ 
        maxWidth: '850px',
        margin: '7rem auto 2rem',
        padding: '3rem',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: '#000'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>John Doe</h1>
        <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Software Engineer</p>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>john.doe@email.com</p>

        <h2 style={{ borderBottom: '1px solid #000', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Education</h2>
        <Latex>{'$\\text{B.S. in Computer Science}$'}</Latex>
        <p>University of Example, 2018-2022</p>
        <Latex>{'$\\text{GPA: } 3.95/4.00$'}</Latex>

        <h2 style={{ borderBottom: '1px solid #000', paddingBottom: '0.5rem', margin: '2rem 0 1rem' }}>Technical Skills</h2>
        <Latex>{'$\\text{Languages: }$ Python, JavaScript/TypeScript, C++'}</Latex>
        <br />
        <Latex>{'$\\text{Frameworks: }$ React, Three.js, Node.js'}</Latex>

        <h2 style={{ borderBottom: '1px solid #000', paddingBottom: '0.5rem', margin: '2rem 0 1rem' }}>Work Experience</h2>
        <h3>Software Engineer</h3>
        <Latex>{'$\\text{Example Corp } (2022-Present)$'}</Latex>
        <ul style={{ marginLeft: '2rem' }}>
          <li>
            <Latex>{'Developed $n$ microservices using Node.js and TypeScript'}</Latex>
          </li>
          <li>
            <Latex>{'Improved system performance by $O(n\\log n)$'}</Latex>
          </li>
        </ul>

        <h2 style={{ borderBottom: '1px solid #000', paddingBottom: '0.5rem', margin: '2rem 0 1rem' }}>Publications</h2>
        <Latex>{'$\\text{``Advanced Algorithms in Practice"} \\\\ \\text{IEEE Conference (2023)}$'}</Latex>
      </div>
    </PageWrapper>
  )
}

export default Resume 