import { useState, useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Vector3, CatmullRomCurve3 } from 'three'
import { useNavigate } from 'react-router-dom'

interface FloatingTextProps {
  text: string
  position: Vector3
  size: number
  curve: CatmullRomCurve3
}

const FloatingText = ({ text, position, size, curve }: FloatingTextProps) => {
  const navigate = useNavigate()
  const textRef = useRef<any>(null)
  const [hover, setHover] = useState(false)
  const basePosition = position.clone()
  
  useFrame(({ camera, clock }) => {
    if (textRef.current) {
      const time = clock.getElapsedTime()
      textRef.current.position.x = basePosition.x + Math.sin(time * 0.5) * 0.5
      textRef.current.position.y = basePosition.y + Math.cos(time * 0.3) * 0.5
      textRef.current.position.z = basePosition.z
      
      textRef.current.lookAt(camera.position)
      textRef.current.rotation.z = 0
    }
  })

  return (
    <group renderOrder={0}>
      <Text
        ref={textRef}
        fontSize={size}
        color={hover ? '#ffffff' : '#cccccc'}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Beholden-Regular.ttf"
        letterSpacing={-0.05}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={() => navigate(`/${text.toLowerCase()}`)}
        renderOrder={0}
        depthTest={false}
        depthWrite={false}
      >
        {text}
      </Text>
    </group>
  )
}

export default FloatingText