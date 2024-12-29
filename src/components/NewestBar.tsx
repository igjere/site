import { Vector3 } from 'three'
import { Text } from '@react-three/drei'
import { usePostsStore } from '../store/posts'
import { useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface NewestBarProps {
  position: Vector3
  viewportWidth: number
}

const NewestBar = ({ position, viewportWidth }: NewestBarProps) => {
  const navigate = useNavigate()
  const posts = usePostsStore((state) => state.posts)
  const recentPosts = useMemo(() => 
    [...posts].sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime())
  , [posts])

  useEffect(() => {
    // Reset cursor when component unmounts
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  const handlePostClick = (type: string, slug: string) => {
    const path = type === 'blog' ? 'blog' : `${type}s`
    document.body.style.cursor = 'auto'
    navigate(`/${path}/${slug}`)
  }

  const handlePointerOver = (e: THREE.Event) => {
    e.stopPropagation()
    if (e.nativeEvent instanceof PointerEvent) {
      document.body.style.cursor = 'pointer'
      const pressure = (e.nativeEvent as PointerEvent).pressure
      const pointerType = (e.nativeEvent as PointerEvent).pointerType
    }
  }

  const handlePointerOut = (e: THREE.Event) => {
    e.stopPropagation()
    if (e.nativeEvent instanceof PointerEvent) {
      document.body.style.cursor = 'auto'
    }
  }

  const barWidth = Math.min(viewportWidth * 0.8, 125)
  const blackPlaneHeight = Math.min(viewportWidth * 0.4, 60)
  const fontSize = Math.min(viewportWidth * 0.02, 1.6)
  const textPosition = -(barWidth * 0.45)
  const datePosition = barWidth * 0.35

  return (
    <group position={position}>
      {/* Center black circle to cover spiral center */}
      <mesh position={[0, -5, -0.5]}>
        <circleGeometry args={[5, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Black background plane */}
      <mesh position={[0, -blackPlaneHeight/2, -1]}>
        <planeGeometry args={[barWidth, blackPlaneHeight]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Bar line */}
      <mesh>
        <planeGeometry args={[barWidth, 0.1]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
      
      {/* Text */}
      <Text
        position={[textPosition, -2, 0]}
        fontSize={fontSize}
        color="#ffffff"
        font="/fonts/Beholden-Regular.ttf"
        anchorX="left"
      >
        NEW POSTS
      </Text>

      {recentPosts.slice(0, 3).map((post, index) => (
        <group key={post.id}>
          <group
            onClick={() => handlePostClick(post.type, post.slug)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <Text
              position={[textPosition, -5 - (index * 3), 0]}
              fontSize={fontSize * 0.8}
              color="#ffffff"
              font="/fonts/Beholden-Regular.ttf"
              anchorX="left"
              renderOrder={1}
            >
              {`${post.title} (${post.type})`}
            </Text>
          </group>
          <Text
            position={[datePosition, -5 - (index * 3), 0]}
            fontSize={fontSize * 0.8}
            color="#999999"
            font="/fonts/Beholden-Italic.ttf"
            anchorX="right"
            pointerEvents="none"
            renderOrder={1}
          >
            {new Date(post.modifiedAt).toLocaleString()}
          </Text>
        </group>
      ))}
    </group>
  )
}

export default NewestBar 