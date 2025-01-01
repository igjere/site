import { Canvas } from '@react-three/fiber'
import Spiral from './Spiral'

interface SpiralCanvasProps {
  width?: number
  height?: number
  scale?: number
}

const SpiralCanvas = ({ width = 56, height = 56, scale = 0.15 }: SpiralCanvasProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 75 }}
      style={{ width, height }}
      gl={{ 
        antialias: true,
        alpha: true,
      }}
    >
      <ambientLight intensity={5.0} />
      <Spiral scale={scale} />
    </Canvas>
  )
}

export default SpiralCanvas 