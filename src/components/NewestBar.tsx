import { Vector3 } from 'three'
import { Text } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import { usePostsStore } from '../store/posts'
import { useEffect } from 'react'

interface NewestBarProps {
  position: Vector3
  viewportWidth: number
}

const NewestBar = ({ position, viewportWidth }: NewestBarProps) => {
  const navigate = useNavigate()
  const getRecentPosts = usePostsStore((state) => state.getRecentPosts)
  const recentPosts = getRecentPosts().slice(0, 3)

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    document.body.style.cursor = 'auto'
  }

  const handleClick = (type: string, slug: string) => {
    const path = type === 'blog' ? 'blog' : `${type}s`
    document.body.style.cursor = 'auto'
    navigate(`/${path}/${slug}`)
  }

  const fontSize = Math.min(viewportWidth * 0.025, 1.6)
  const barWidth = Math.min(viewportWidth * 0.8, 125)
  const blackPlaneHeight = recentPosts.length * 4 + 10

  return (
    <group position={position}>
      {/* Black background plane */}
      <mesh position={[0, -blackPlaneHeight/2 + 1, -0.1]}>
        <planeGeometry args={[barWidth, blackPlaneHeight]} />
        <meshBasicMaterial color="#000000" transparent opacity={1} />
      </mesh>

      {/* NEW POSTS text */}
      <Text
        position={[-barWidth/2 + 2, 0, 0]}
        fontSize={fontSize * 1.2}
        color="#ffffff"
        font="/fonts/Beholden-Regular.ttf"
        anchorX="left"
        renderOrder={1}
      >
        NEW POSTS
      </Text>

      {recentPosts.map((post, index) => (
        <group key={post.id} position={[0, -4 * (index + 1), 0]}>
          {/* Title (clickable) */}
          <group
            position={[-barWidth/2 + 2, 0, 0]}
            onClick={() => handleClick(post.type, post.slug)}
            onPointerOver={handlePointerEnter}
            onPointerOut={handlePointerOut}
          >
            <Text
              fontSize={fontSize}
              color="#ffffff"
              font="/fonts/Beholden-Regular.ttf"
              anchorX="left"
              renderOrder={1}
            >
              {post.title}
            </Text>
          </group>

          {/* Date (non-clickable) */}
          <group userData={{ disableRaycast: true }}>
            <Text
              position={[barWidth/2 - 2, 0, 0]}
              fontSize={fontSize * 0.7}
              color="#999999"
              font="/fonts/Beholden-Italic.ttf"
              anchorX="right"
              renderOrder={1}
            >
              {new Date(post.modifiedAt).toLocaleString()}
            </Text>
          </group>
        </group>
      ))}
    </group>
  )
}

export default NewestBar 