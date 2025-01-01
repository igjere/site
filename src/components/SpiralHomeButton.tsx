import { useNavigate } from 'react-router-dom'
import SpiralCanvas from './SpiralCanvas'
import { useResponsive } from '../hooks/useResponsive'
import { useState, useEffect } from 'react'

interface SpiralHomeButtonProps {
  isScrolled: boolean
}

const SpiralHomeButton = ({ isScrolled }: SpiralHomeButtonProps) => {
  const navigate = useNavigate()
  const { isMobile } = useResponsive()
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360)
    }, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      onClick={() => navigate('/')}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{
        position: 'fixed',
        top: isMobile ? '0.5rem' : '0.75rem',
        left: isMobile ? '0.5rem' : '1rem',
        width: isMobile ? '2.5rem' : '4rem',
        height: isMobile ? '2.5rem' : '4rem',
        background: '#000',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 11,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: !isMobile && isHovered 
          ? '0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)'
          : 'none',
        transform: !isMobile && isHovered ? 'scale(1.05)' : 'scale(1)'
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 100,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.05s linear'
      }}>
        <SpiralCanvas/>
      </div>
    </div>
  )
}

export default SpiralHomeButton 