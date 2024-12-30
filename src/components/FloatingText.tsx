import { Text } from '@react-three/drei'
import { useRef } from 'react'

interface FloatingTextProps {
  text: string
  position: [number, number, number]
  size: number
  curve?: any // Remove if not used
}

const FloatingText = ({ text, position, size }: FloatingTextProps) => {
  const textRef = useRef<any>()

  return (
    <Text
      ref={textRef}
      fontSize={size}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      font="/fonts/Beholden-Regular.ttf"
      letterSpacing={0.1}
      onPointerOver={() => {}}
      onPointerOut={() => {}}
      position={position}
      renderOrder={1}
    >
      {text}
    </Text>
  )
}

export default FloatingText