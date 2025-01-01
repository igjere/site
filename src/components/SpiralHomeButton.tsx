import { useNavigate } from 'react-router-dom'
import SpiralCanvas from './SpiralCanvas'
import { useResponsive } from '../hooks/useResponsive'

interface SpiralHomeButtonProps {
  isScrolled: boolean
}

const SpiralHomeButton = ({ isScrolled }: SpiralHomeButtonProps) => {
  const navigate = useNavigate()
  const { isMobile } = useResponsive()

  return (
    <div 
      onClick={() => navigate('/')}
      style={{
        position: 'fixed',
        top: isMobile ? '0.5rem' : '0.75rem',
        left: isMobile ? '0.5rem' : '1rem',
        width: isMobile ? '2.5rem' : '3rem',
        height: isMobile ? '2.5rem' : '3rem',
        background: '#000',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 11,
        cursor: 'pointer'
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1.0
      }}>
        <SpiralCanvas/>
      </div>
    </div>
  )
}

export default SpiralHomeButton 