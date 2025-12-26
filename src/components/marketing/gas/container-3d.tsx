'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  useTexture,
  Sparkles,
  MeshDistortMaterial,
} from '@react-three/drei'
import * as THREE from 'three'

// Shipping Container Geometry
function ShippingContainer({
  color = '#FF6B35',
  secondaryColor = '#1a1a2e',
  metalness = 0.9,
  roughness = 0.1,
}: {
  color?: string
  secondaryColor?: string
  metalness?: number
  roughness?: number
}) {
  const containerRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // Container dimensions (standard 20ft container proportions)
  const length = 4
  const width = 1.6
  const height = 1.7

  useFrame((state) => {
    if (containerRef.current) {
      // Smooth rotation
      containerRef.current.rotation.y += 0.003
      // Gentle floating motion
      containerRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (glowRef.current) {
      // Pulsing glow
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
      glowRef.current.scale.set(scale, scale, scale)
    }
  })

  // Create corrugated wall geometry
  const corrugatedGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    const corrugationDepth = 0.03
    const corrugationWidth = 0.15
    const wallHeight = height - 0.1

    // Create corrugated profile
    shape.moveTo(0, 0)
    for (let i = 0; i < length / corrugationWidth; i++) {
      const x = i * corrugationWidth
      shape.lineTo(x, 0)
      shape.lineTo(x + corrugationWidth * 0.25, corrugationDepth)
      shape.lineTo(x + corrugationWidth * 0.75, corrugationDepth)
      shape.lineTo(x + corrugationWidth, 0)
    }
    shape.lineTo(length, 0)
    shape.lineTo(length, wallHeight)
    shape.lineTo(0, wallHeight)
    shape.closePath()

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.02,
      bevelEnabled: false,
    })
  }, [length, height])

  return (
    <group ref={containerRef} position={[0, 0, 0]}>
      {/* Main container body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Corrugated side panels */}
      <mesh position={[-length / 2 + 0.01, -height / 2 + 0.05, width / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length - 0.1, 0.02]} />
        <meshStandardMaterial color={secondaryColor} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Container ridges/ribs */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0, width / 2 + 0.01]} castShadow>
          <boxGeometry args={[0.05, height - 0.1, 0.03]} />
          <meshStandardMaterial color={secondaryColor} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Door end frame */}
      <group position={[length / 2, 0, 0]}>
        {/* Vertical door frames */}
        <mesh position={[0.02, 0, -width / 2 + 0.08]} castShadow>
          <boxGeometry args={[0.08, height, 0.08]} />
          <meshStandardMaterial color={secondaryColor} metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0.02, 0, width / 2 - 0.08]} castShadow>
          <boxGeometry args={[0.08, height, 0.08]} />
          <meshStandardMaterial color={secondaryColor} metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Horizontal door frame */}
        <mesh position={[0.02, height / 2 - 0.04, 0]} castShadow>
          <boxGeometry args={[0.08, 0.08, width]} />
          <meshStandardMaterial color={secondaryColor} metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Door handles */}
        <mesh position={[0.06, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial color="#888" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0.06, 0, 0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial color="#888" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Corner castings */}
      {[
        [-length / 2, -height / 2, -width / 2],
        [-length / 2, -height / 2, width / 2],
        [-length / 2, height / 2, -width / 2],
        [-length / 2, height / 2, width / 2],
        [length / 2, -height / 2, -width / 2],
        [length / 2, -height / 2, width / 2],
        [length / 2, height / 2, -width / 2],
        [length / 2, height / 2, width / 2],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Glow effect underneath */}
      <mesh ref={glowRef} position={[0, -height / 2 - 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length + 1, width + 1]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

// Floating particles around container
function ContainerParticles({ color = '#FF6B35' }: { color?: string }) {
  return (
    <Sparkles
      count={50}
      scale={8}
      size={2}
      speed={0.4}
      color={color}
      opacity={0.6}
    />
  )
}

// Ground reflection plane
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial
        color="#0a0a0a"
        metalness={0.8}
        roughness={0.4}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

interface Container3DProps {
  color?: string
  secondaryColor?: string
  className?: string
  showParticles?: boolean
  showGround?: boolean
  autoRotate?: boolean
  cameraPosition?: [number, number, number]
}

export function Container3D({
  color = '#FF6B35',
  secondaryColor = '#1a1a2e',
  className = '',
  showParticles = true,
  showGround = true,
  cameraPosition = [6, 3, 6],
}: Container3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.3} />
        <spotLight
          position={[10, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight
          position={[-10, 5, -5]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color={color}
        />
        <pointLight position={[0, -2, 0]} intensity={0.5} color={color} />

        {/* Main container with float animation */}
        <Float
          speed={1.5}
          rotationIntensity={0.2}
          floatIntensity={0.3}
        >
          <ShippingContainer
            color={color}
            secondaryColor={secondaryColor}
          />
        </Float>

        {/* Effects */}
        {showParticles && <ContainerParticles color={color} />}
        {showGround && <Ground />}

        {/* Environment for reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
