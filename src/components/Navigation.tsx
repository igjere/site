import { Text } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import { ThreeEvent } from '@react-three/fiber'

interface NavigationProps {
  viewportWidth: number
  viewportHeight: number
  positionY: number
  isMobile: boolean
}

const Navigation = ({ viewportWidth, viewportHeight, positionY, isMobile }: NavigationProps) => {
  const navigate = useNavigate()
  const navItems = [
    { text: 'PROJECTS', path: '/projects' },
    { text: 'ABOUT', path: '/about' },
    { text: 'BLOG', path: '/blog' },
    { text: 'RESUME', path: '/resume' }
  ]

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    document.body.style.cursor = 'auto'
  }

  // Calculate responsive sizes
  const buttonWidth = isMobile 
    ? Math.min(viewportWidth * 0.22, 16)
    : Math.min(viewportWidth * 0.16, 13)
    
  const buttonHeight = isMobile
    ? Math.min(viewportHeight * 0.05, 3)
    : Math.min(viewportHeight * 0.07, 3)
    
  const spacing = isMobile 
    ? buttonWidth * 1.15
    : buttonWidth * 1.3
  
  const fontSize = isMobile
    ? Math.min(viewportWidth * 0.035, 1.8)
    : Math.min(viewportWidth * 0.017, 1.3)

  // Adjust vertical position based on viewport height
  const adjustedPositionY = positionY - (isMobile ? 2 : 1.5)

  return (
    <group position={[0, adjustedPositionY, 0]}>
      {navItems.map((item, index) => {
        const xPos = (index - 1.5) * spacing
        return (
          <group 
            key={index} 
            position={[xPos, 0, 0]}
            onClick={() => navigate(item.path)}
            onPointerOver={handlePointerEnter}
            onPointerOut={handlePointerOut}
          >
            <mesh>
              <planeGeometry args={[buttonWidth, buttonHeight]} />
              <meshBasicMaterial color="#000000" transparent opacity={1.0} />
            </mesh>
            <mesh>
              <planeGeometry args={[buttonWidth + 0.1, buttonHeight + 0.1]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <Text
              position={[0, 0, 0.1]}
              fontSize={fontSize}
              color="#ffffff"
              font="/fonts/Beholden-Regular.ttf"
              anchorX="center"
              anchorY="middle"
            >
              {item.text}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

export default Navigation 