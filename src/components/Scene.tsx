import { Vector3 } from 'three'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import Spiral from './Spiral'
import Navigation from './Navigation'
import Introduction from './Introduction'
import NewestBar from './NewestBar'

const Scene = () => {
  const { viewport, camera } = useThree()
  const isMobile = viewport.width < 768

  useEffect(() => {
    if (isMobile) {
      camera.position.z = 20 // Bring camera closer on mobile
    } else {
      camera.position.z = 30 // Default desktop position
    }
  }, [isMobile, camera])
  
  // Responsive positioning calculations
  const navY = isMobile ? viewport.height * 0.35 : viewport.height * 0.4
  const introY = isMobile ? viewport.height * 0.1 : viewport.height * 0.15
  const barY = isMobile ? viewport.height * -0.15 : viewport.height * -0.1
  
  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      
      <Spiral scale={isMobile ? 0.7 : 1} />
      
      <group position={[0, 10, -15]}>
        <Navigation 
          viewportWidth={viewport.width} 
          viewportHeight={viewport.height} 
          positionY={navY}
          isMobile={isMobile}
        />
        <Introduction 
          viewportWidth={viewport.width} 
          positionY={introY}
          isMobile={isMobile} 
        />
        <NewestBar 
          position={new Vector3(0, barY, 1)} 
          viewportWidth={viewport.width}
          isMobile={isMobile}
        />
      </group>
    </>
  )
}

export default Scene
