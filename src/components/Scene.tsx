import { Vector3, CatmullRomCurve3 } from 'three'
import { useThree } from '@react-three/fiber'
import Spiral from './Spiral'
import Navigation from './Navigation'
import Introduction from './Introduction'
import NewestBar from './NewestBar'

const Scene = () => {
  const { viewport } = useThree()
  
  // Calculate responsive positions based on viewport
  const navY = viewport.height * 0.4
  const introY = viewport.height * 0.15
  const barY = viewport.height * -0.1
  
  return (
    <>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      
      <Spiral />
      
      <group position={[0, 10, -15]}>
        <Navigation viewportWidth={viewport.width} viewportHeight={viewport.height} positionY={navY} />
        <Introduction viewportWidth={viewport.width} positionY={introY} />
        <NewestBar position={new Vector3(0, barY, 1)} viewportWidth={viewport.width} />
      </group>
    </>
  )
}

export default Scene
