import { useNavigate } from 'react-router-dom'
import SpiralCanvas from './SpiralCanvas'

interface SpiralHomeButtonProps {
  isScrolled: boolean
}

const SpiralHomeButton = ({ isScrolled }: SpiralHomeButtonProps) => {
  const navigate = useNavigate()

  return (
    <div 
      onClick={() => navigate('/')}
      style={{
        position: 'fixed',
        top: isScrolled ? '0.5rem' : '1rem',
        left: '1rem',
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#000',
        zIndex: 10,
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        transform: isScrolled ? 'rotate(-10deg)' : 'rotate(0deg)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = isScrolled 
          ? 'scale(1.1) rotate(-15deg)' 
          : 'scale(1.1) rotate(-5deg)'
        e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = isScrolled 
          ? 'rotate(-10deg)' 
          : 'rotate(0deg)'
        e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)'
      }}
    >
      <SpiralCanvas />
    </div>
  )
}

export default SpiralHomeButton 