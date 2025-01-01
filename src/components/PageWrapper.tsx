import { ReactNode } from 'react'
import { useResponsive } from '../hooks/useResponsive'

interface PageWrapperProps {
  children: ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const { isMobile } = useResponsive()
  
  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      background: '#000',
      overflowX: 'hidden',
      paddingTop: isMobile ? '3.5rem' : '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: isMobile ? 'calc(100% - 2rem)' : '800px',
        margin: '0 auto',
        padding: isMobile ? '0.5rem' : '2rem',
        boxSizing: 'border-box'
      }}>
        {children}
      </div>
    </div>
  )
}

export default PageWrapper 