import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { BufferGeometry, Float32BufferAttribute } from 'three'

interface SpiralProps {
  scale?: number
  position?: [number, number, number]
}

const Spiral = ({ scale = 1, position = [0, 0, 0] }: SpiralProps) => {
  const pointsRef = useRef<any>(null)
  
  const { positions, sizes } = useMemo(() => {
    const positions = []
    const sizes = []
    
    // Center circle of pixels
    const centerRadius = 1
    const gridSize = 3 // Even denser grid for smoother circle
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let y = -gridSize; y <= gridSize; y++) {
        // Calculate distance from center
        const normalizedX = x / gridSize
        const normalizedY = y / gridSize
        const distanceFromCenter = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY)
        
        // Only add points within circular shape
        if (distanceFromCenter <= 1) {
          positions.push(
            normalizedX * centerRadius,
            normalizedY * centerRadius,
            -15
          )
          // Make center points slightly larger
          sizes.push(0.5)
        }
      }
    }
    
    // Dense pixel ring
    const ringRadius = 1
    const ringPoints = 20 // More points for denser ring
    for (let i = 0; i < ringPoints; i++) {
      const angle = (i / ringPoints) * Math.PI * 2
      const radius = ringRadius * (0.95 + Math.random() * 0.1) // Slight variation
      positions.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -15
      )
      sizes.push(0.9)
    }
    
    // Multiple spiral arms
    const numArms = 10
    const pointsPerArm = 600
    const maxRadius = 80
    
    for (let arm = 0; arm < numArms; arm++) {
      const armOffset = (arm / numArms) * Math.PI * 2
      
      for (let i = 0; i < pointsPerArm; i++) {
        const progress = i / pointsPerArm
        const angle = armOffset + progress * Math.PI * 0.8
        const radius = ringRadius + (progress * maxRadius)
        
        // More particles near ring, dispersing outward
        const densityFactor = Math.max(0.1, 1 - progress)
        const particlesInSlice = Math.floor(20 * densityFactor)
        
        for (let w = 0; w < particlesInSlice; w++) {
          const widthSpread = 3 + progress * 20 // Increasing spread as arm extends
          const widthOffset = (w / (particlesInSlice ) - 0.5) * widthSpread
          
          // More controlled randomness
          const angleVar = angle + (Math.random() - 0.5) * 0.1 * progress
          const radiusVar = radius + widthOffset + (Math.random()) * progress * 2
          
          positions.push(
            Math.cos(angleVar) * radiusVar,
            Math.sin(angleVar) * radiusVar,
            -15 - (progress * 2)
          )
          
          // Particles get smaller towards edges
          sizes.push(0.8 * (1 - progress * 0.6))
        }
      }
    }
    
    // Background particles
    for (let i = 0; i < 12000; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = ringRadius + Math.random() * maxRadius * 1.2
      positions.push(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -15 - (Math.random() * 5)
      )
      sizes.push(0.2 + Math.random() * 0.2)
    }
    
    return { positions, sizes }
  }, [])

  const geometry = useMemo(() => {
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geo.setAttribute('size', new Float32BufferAttribute(sizes, 5))
    return geo
  }, [positions, sizes])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const time = clock.getElapsedTime()
      // Slower rotation with subtle movement
      pointsRef.current.rotation.z = time * 0.03 + Math.sin(time * 0.2) * 0.02
      
      // Very subtle scale breathing effect
      const scale = 1 + Math.sin(time * 0.5) * 0.01
      pointsRef.current.scale.set(scale, scale, 1)
    }
  })

  return (
    <points ref={pointsRef} position={position} scale={scale}>
      <primitive object={geometry} />
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        transparent
        opacity={0.2}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  )
}

export default Spiral
