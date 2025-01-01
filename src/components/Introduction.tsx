import { Text } from '@react-three/drei'

interface IntroductionProps {
  viewportWidth: number
  positionY: number
  isMobile: boolean
}

const Introduction = ({ viewportWidth, positionY, isMobile }: IntroductionProps) => {
  const maxWidth = isMobile 
    ? Math.min(viewportWidth * 0.9, 100)
    : Math.min(viewportWidth * 0.8, 125)
  
  const fontSize = isMobile
    ? Math.min(viewportWidth * 0.04, 2)
    : Math.min(viewportWidth * 0.015, 1.2)
    
  const xPosition = -maxWidth / 2

  return (
    <group position={[xPosition, positionY, 0]}>
      <Text
        fontSize={fontSize}
        color="#ffffff"
        maxWidth={maxWidth}
        textAlign="left"
        font="/fonts/Beholden-Regular.ttf"
        anchorX="left"
        lineHeight={1.5}
        letterSpacing={0.02}
      >
        {`lockedinCEO.
attempting to save the public perception of gen z software engineers one git commit at a time. 
interested in ai, web development, game development, embedded systems, and anything to get cracked. currently studying rust.`}
      </Text>
    </group>
  )
}

export default Introduction 