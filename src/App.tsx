import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Suspense, lazy, useEffect } from 'react'
import Scene from './components/Scene'
import Loading from './components/Loading'

// Lazy load other pages to improve performance
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Resume = lazy(() => import('./pages/Resume'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const ProjectPost = lazy(() => import('./pages/ProjectPost'))

function App() {
  useEffect(() => {
    // Suppress deprecated mouse event warnings
    const suppressDeprecation = (e: Event) => {
      if (e instanceof MouseEvent && e.type === 'mousemove') {
        e.stopPropagation()
      }
    }
    
    window.addEventListener('mousemove', suppressDeprecation, true)
    return () => window.removeEventListener('mousemove', suppressDeprecation, true)
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
            <Canvas
              camera={{ 
                position: [0, 0, 30],
                fov: 75,
                near: 0.1,
                far: 1000
              }}
              style={{ width: '100%', height: '100%' }}
              gl={{ 
                preserveDrawingBuffer: true,
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
              }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault()
                  console.clear() // Clear previous warnings
                }, false)
              }}
            >
              <Scene />
            </Canvas>
          </div>
        } />
        <Route path="/*" element={
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="resume" element={<Resume />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="projects/:slug" element={<ProjectPost />} />
            </Routes>
          </Suspense>
        } />
      </Routes>
    </Router>
  )
}

export default App
