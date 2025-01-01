import { useResponsive } from '../../hooks/useResponsive'

export const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useResponsive()
  
  return (
    <div style={{
      width: '100%',
      padding: isMobile ? '0.5rem' : '2rem',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
    }}>
      <div style={{
        maxWidth: '100%',
        wordWrap: 'break-word'
      }}>
        {children}
      </div>
    </div>
  )
} 