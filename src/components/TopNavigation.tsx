import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SpiralHomeButton from './SpiralHomeButton'
import { useResponsive } from '../hooks/useResponsive'

const TopNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const [isScrolled, setIsScrolled] = useState(false)
  const { isMobile } = useResponsive()
  // const isHome = path === '/'
  
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
      padding: isMobile ? '0.25rem' : '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      background: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      transition: 'all 0.3s ease',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      height: isMobile ? '3.5rem' : '4rem'
    }}>
      <SpiralHomeButton isScrolled={isScrolled} />
      
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? '0.5rem' : '2rem',
        maxWidth: isMobile ? 'calc(100% - 4rem)' : '800px',
        margin: '0 auto',
        overflow: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch'
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
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                color: '#fff',
                fontFamily: 'Beholden-Regular',
                fontSize: isMobile ? '0.8rem' : '1.2rem',
                padding: isMobile ? '0.15rem 0.35rem' : '0.5rem 1rem',
                opacity: isActive ? 1 : 0.7,
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
                cursor: 'pointer',
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
              {item.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TopNavigation 