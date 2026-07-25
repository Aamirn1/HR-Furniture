'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, ContactShadows, Float, MeshReflectorMaterial, PerspectiveCamera } from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'

// A stylized luxury sofa composed from rounded primitives
function Sofa({ fabricColor = '#e8dcc4', woodColor = '#5a3a28' }: { fabricColor?: string; woodColor?: string }) {
  const group = useRef<THREE.Group | null>(null)

  useFrame((state) => {
    if (!group.current) return
    // Gentle floating rotation tied to mouse
    const t = state.clock.getElapsedTime()
    const mx = state.pointer.x
    const my = state.pointer.y
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mx * 0.45, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -my * 0.15, 0.05)
    group.current.position.y = Math.sin(t * 0.6) * 0.04 - 0.1
  })

  // Rounded box geometry helper
  const seatGeo = useMemo(() => new THREE.BoxGeometry(3.2, 0.42, 1.15, 8, 4, 4), [])
  const backGeo = useMemo(() => new THREE.BoxGeometry(3.2, 1.05, 0.28, 8, 6, 4), [])
  const armGeo = useMemo(() => new THREE.BoxGeometry(0.35, 0.7, 1.2, 4, 4, 4), [])
  const cushionGeo = useMemo(() => new THREE.BoxGeometry(0.95, 0.2, 0.95, 4, 3, 4), [])
  const legGeo = useMemo(() => new THREE.CylinderGeometry(0.06, 0.04, 0.5, 16), [])

  return (
    <group ref={group} position={[0, -0.1, 0]} rotation={[0, -0.2, 0]}>
      {/* Base / seat platform */}
      <mesh geometry={seatGeo} position={[0, 0.5, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={fabricColor} roughness={0.75} metalness={0.04} />
      </mesh>

      {/* Backrest */}
      <mesh geometry={backGeo} position={[0, 1.18, -0.42]} castShadow receiveShadow>
        <meshStandardMaterial color={fabricColor} roughness={0.75} metalness={0.04} />
      </mesh>

      {/* Backrest pillows */}
      {[-0.95, 0, 0.95].map((x) => (
        <mesh key={`bp-${x}`} geometry={cushionGeo} position={[x, 1.0, -0.18]} scale={[1, 0.85, 0.4]} castShadow>
          <meshStandardMaterial color={fabricColor} roughness={0.85} metalness={0.02} />
        </mesh>
      ))}

      {/* Arms */}
      {[-1.55, 1.55].map((x) => (
        <mesh key={`arm-${x}`} geometry={armGeo} position={[x, 0.85, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={fabricColor} roughness={0.75} metalness={0.04} />
        </mesh>
      ))}

      {/* Seat cushions */}
      {[-0.95, 0, 0.95].map((x) => (
        <mesh key={`sc-${x}`} geometry={cushionGeo} position={[x, 0.78, 0.05]} castShadow receiveShadow>
          <meshStandardMaterial color={fabricColor} roughness={0.82} metalness={0.03} />
        </mesh>
      ))}

      {/* Legs (4) */}
      {[[-1.45, -0.45], [1.45, -0.45], [-1.45, 0.45], [1.45, 0.45]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} geometry={legGeo} position={[x, 0.05, z]} castShadow>
          <meshStandardMaterial color={woodColor} roughness={0.35} metalness={0.45} />
        </mesh>
      ))}
    </group>
  )
}

function FloatingParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points | null>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = Math.random() * 6 - 1
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.04
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#d8b36a"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function LightRig() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <spotLight position={[-4, 4, 2]} intensity={0.6} angle={0.5} penumbra={1} color="#f5e7c8" />
      <pointLight position={[0, 2, 4]} intensity={0.4} color="#d8b36a" />
    </>
  )
}

function CameraRig() {
  const { camera } = useThree()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const mx = state.pointer.x
    // Subtle camera drift
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx * 0.6, 0.04)
    camera.position.y = 2.2 + Math.sin(t * 0.2) * 0.05
    camera.lookAt(0, 0.6, 0)
  })
  return null
}

export function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera makeDefault position={[0, 2.2, 6]} fov={38} />
      <CameraRig />
      <LightRig />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.2}>
          <Sofa />
        </Float>
        <ContactShadows
          position={[0, -0.25, 0]}
          opacity={0.55}
          scale={12}
          blur={2.6}
          far={4}
          color="#3e2a20"
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.27, 0]}>
          <planeGeometry args={[24, 24]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={25}
            roughness={0.85}
            depthScale={1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.2}
            color="#f5f3ef"
            metalness={0.35}
            mirror={0.4}
          />
        </mesh>
        <FloatingParticles />
        <Environment preset="apartment" environmentIntensity={0.5} />
      </Suspense>
    </Canvas>
  )
}
