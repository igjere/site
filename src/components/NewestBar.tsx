import { Vector3 } from 'three'
import { Text } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import { usePostsStore } from '../store/posts'
import { useEffect } from 'react'

interface NewestBarProps {
  position: Vector3
  viewportWidth: number
  isMobile: boolean
}

const NewestBar = ({ position, viewportWidth, isMobile }: NewestBarProps) => {
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

  const fontSize = isMobile 
    ? Math.min(viewportWidth * 0.04, 2.2)
    : Math.min(viewportWidth * 0.015, 1.2)
    
  const barWidth = isMobile
    ? Math.min(viewportWidth * 0.9, 130)
    : Math.min(viewportWidth * 0.85, 140)
    
  const blackPlaneHeight = isMobile 
    ? recentPosts.length * 3 + 6
    : recentPosts.length * 3 + 8

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
        fontSize={fontSize}
        color="#ffffff"
        font="/fonts/Beholden-Regular.ttf"
        anchorX="left"
        renderOrder={1}
      >
        NEW POSTS
      </Text>

      {recentPosts.map((post, index) => (
        <group 
          key={post.id} 
          position={[0, -(isMobile ? 3 : 2.5) * (index + 1), 0]}
          onClick={() => handleClick(post.type, post.slug)}
          onPointerOver={handlePointerEnter}
          onPointerOut={handlePointerOut}
        >
          {/* Post title with larger spacing for mobile */}
          <group position={[-barWidth/2 + 2, 0, 0]}>
            <Text
              fontSize={fontSize * (isMobile ? 0.85 : 0.85)}
              color="#ffffff"
              font="/fonts/Beholden-Regular.ttf"
              anchorX="left"
              renderOrder={1}
            >
              {post.title}
            </Text>
          </group>

          {/* Date with adjusted size for mobile */}
          <group>
            <Text
              position={[barWidth/2 - 2, 0, 0]}
              fontSize={fontSize * (isMobile ? 0.8 : 0.65)}
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