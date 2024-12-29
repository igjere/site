import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: '#000', 
      color: '#fff',
      fontFamily: 'Beholden-Regular, sans-serif',
      padding: '2rem'
    }}>
      {children}
    </div>
  )
}

export default PageWrapper 