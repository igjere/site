import { Text } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'

interface NavigationProps {
  viewportWidth: number
  viewportHeight: number
  positionY: number
}

const Navigation = ({ viewportWidth, viewportHeight, positionY }: NavigationProps) => {
  const navigate = useNavigate()
  const navItems = [
    { text: 'PROJECTS', path: '/projects' },
    { text: 'ABOUT', path: '/about' },
    { text: 'BLOG', path: '/blog' },
    { text: 'CONTACT', path: '/contact' }
  ]

  const handlePointerOver = (e: THREE.Event) => {
    e.stopPropagation()
    if (e.nativeEvent instanceof PointerEvent) {
      document.body.style.cursor = 'pointer'
      // Use modern pointer event properties
      const pressure = (e.nativeEvent as PointerEvent).pressure
      const pointerType = (e.nativeEvent as PointerEvent).pointerType
    }
  }

  const handlePointerOut = (e: THREE.Event) => {
    e.stopPropagation()
    if (e.nativeEvent instanceof PointerEvent) {
      document.body.style.cursor = 'auto'
    }
  }

  // Calculate responsive sizes - slightly larger
  const buttonWidth = Math.min(viewportWidth * 0.17, 14)
  const buttonHeight = Math.min(viewportHeight * 0.09, 3.5)
  const spacing = buttonWidth * 1.2
  const fontSize = Math.min(viewportWidth * 0.017, 1.4)

  return (
    <group position={[0, positionY, 0]}>
      {navItems.map((item, index) => {
        const xPos = (index - 1.5) * spacing
        return (
          <group 
            key={index} 
            position={[xPos, 0, 0]}
            onClick={() => navigate(item.path)}
            onPointerOver={handlePointerOver}
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