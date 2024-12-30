import { Text } from '@react-three/drei'

interface IntroductionProps {
  viewportWidth: number
  positionY: number
}

const Introduction = ({ viewportWidth, positionY }: IntroductionProps) => {
  const maxWidth = Math.min(viewportWidth * 0.8, 125)
  const fontSize = Math.min(viewportWidth * 0.02, 1.8)
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
      >
        {`lockedinCEO.
attempting to save the public perception of gen z software engineers one git commit at a time. 
interested in ai, web development, game development, embedded systems, and anything to get cracked. currently studying rust.`}
      </Text>
    </group>
  )
}

export default Introduction 