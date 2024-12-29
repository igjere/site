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
        This is a test introduction text. Here you can write about your site, your work, or anything else you'd like visitors to know.
      </Text>
    </group>
  )
}

export default Introduction 