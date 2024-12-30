import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SpiralHomeButton from './SpiralHomeButton'

const TopNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const [isScrolled, setIsScrolled] = useState(false)
  const isHome = path === '/'
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine if we're in a post page and what type
  const postType = path.includes('/blog/') ? 'blog' : 
                  path.includes('/projects/') ? 'projects' : null

  const navItems = [
    { text: 'PROJECTS', path: '/projects' },
    { text: 'ABOUT', path: '/about' },
    { text: 'BLOG', path: '/blog' },
    { text: 'RESUME', path: '/resume' }
  ]

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      zIndex: 10,
      background: isScrolled 
        ? isHome 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(20, 20, 20, 0.75)'
        : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      transition: 'all 0.3s ease',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
    }}>
      <SpiralHomeButton isScrolled={isScrolled} />
      
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem'
      }}>
        {navItems.map((item) => {
          const isActive = postType ? 
            (item.text.toLowerCase() === postType) : 
            (path === item.path)
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontFamily: 'Beholden-Regular',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                opacity: isActive ? 1 : 0.7,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '1'
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.opacity = '0.7'
                }
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: '1px solid #fff',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }} />
              {item.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TopNavigation 